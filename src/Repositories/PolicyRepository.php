<?php

namespace Flagrow\Terms\Repositories;

use Carbon\Carbon;
use DateTime;
use Flagrow\Terms\Policy;
use Flagrow\Terms\Validators\PolicyValidator;
use Flarum\Core\User;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Database\Eloquent\Collection;

class PolicyRepository
{
    protected $policy;
    protected $validator;
    protected $cache;

    protected $rememberState;

    const CACHE_KEY = 'flagrow-terms-policies';

    public function __construct(Policy $policy, PolicyValidator $validator, Repository $cache)
    {
        $this->policy = $policy;
        $this->validator = $validator;
        $this->cache = $cache;
    }

    /**
     * @return Policy[]|Collection
     */
    public function all()
    {
        return $this->cache->rememberForever(self::CACHE_KEY, function () {
            return $this->policy->newQuery()->orderBy('sort')->get();
        });
    }

    public function clearCache()
    {
        $this->cache->forget(self::CACHE_KEY);
    }

    /**
     * @param string $id
     * @return Policy
     */
    public function findOrFail($id)
    {
        return $this->policy->newQuery()->findOrFail($id);
    }

    public function state(User $user)
    {
        if (!$this->rememberState) {
            $userPolicies = $user->flagrowTermsPolicies->keyBy('id');

            $this->rememberState = [];

            foreach ($this->all() as $policy) {
                $accepted_at = $userPolicies->has($policy->id) ? Carbon::parse($userPolicies->get($policy->id)->pivot->accepted_at) : null;
                $has_update = !$accepted_at || ($policy->terms_updated_at && $policy->terms_updated_at->gt($accepted_at));

                $this->rememberState[$policy->id] = [
                    // Same format as Flarum is using for the serializer responses
                    'accepted_at' => $accepted_at ? $accepted_at->format(DateTime::RFC3339) : null,
                    'has_update' => $has_update,
                    'must_accept' => $has_update && !$user->can('postponeAccept', $policy),
                ];
            }
        }

        return $this->rememberState;
    }

    public function hasPoliciesUpdate(User $user)
    {
        $state = $this->state($user);

        $hasUpdates = false;

        foreach ($state as $s) {
            if (array_get($s, 'has_update')) {
                $hasUpdates = true;

                break;
            }
        }

        return $hasUpdates;
    }

    public function mustAcceptNewPolicies(User $user)
    {
        $state = $this->state($user);

        $mustAccept = false;

        foreach ($state as $s) {
            if (array_get($s, 'must_accept')) {
                $mustAccept = true;

                break;
            }
        }

        return $mustAccept;
    }

    public function store(array $attributes)
    {
        $this->validator->assertValid($attributes);

        $policy = new Policy($attributes);
        $policy->save();

        $this->clearCache();

        return $policy;
    }

    public function update(Policy $policy, array $attributes)
    {
        $this->validator->assertValid($attributes);

        $policy->fill($attributes);
        $policy->save();

        $this->clearCache();

        return $policy;
    }

    public function delete(Policy $policy)
    {
        $res = $policy->delete();

        $this->clearCache();

        return $res;
    }

    public function accept(User $user, Policy $policy)
    {
        $exists = $user->flagrowTermsPolicies()->where('id', $policy->id)->exists();

        $pivot = [
            'accepted_at' => Carbon::now(),
        ];

        if ($exists) {
            $user->flagrowTermsPolicies()->updateExistingPivot($policy->id, $pivot);
        } else {
            $user->flagrowTermsPolicies()->attach($policy->id, $pivot);
        }
    }

    public function acceptAll(User $user)
    {
        $relationship = [];

        foreach ($this->all() as $policy) {
            $relationship[$policy->id] = [
                'accepted_at' => Carbon::now(),
            ];
        }

        $user->flagrowTermsPolicies()->attach($relationship);
    }

    public function sorting(array $sorting)
    {
        foreach ($sorting as $i => $fieldId) {
            $this->policy->where('id', $fieldId)->update(['sort' => $i]);
        }

        $this->clearCache();
    }
}
