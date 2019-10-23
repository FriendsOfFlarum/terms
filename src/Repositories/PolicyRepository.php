<?php

namespace FoF\Terms\Repositories;

use Carbon\Carbon;
use DateTime;
use Flarum\User\User;
use FoF\Terms\Policy;
use FoF\Terms\Validators\PolicyValidator;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class PolicyRepository
{
    protected $policy;
    protected $validator;
    protected $cache;

    protected $rememberState;

    const CACHE_KEY = 'fof-terms-policies';

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
     * @return Policy|Model
     */
    public function findOrFail($id)
    {
        return $this->policy->newQuery()->findOrFail($id);
    }

    public function state(User $user)
    {
        if (!$this->rememberState) {
            /**
             * @var Collection $userPolicies
             */
            $userPolicies = $user->fofTermsPolicies->keyBy('id');

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

    /**
     * @param array $attributes
     * @return Policy
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(array $attributes)
    {
        $this->validator->assertValid($attributes);

        $policy = new Policy($attributes);
        $policy->save();

        $this->clearCache();

        return $policy;
    }

    /**
     * @param Policy $policy
     * @param array $attributes
     * @return Policy
     * @throws \Illuminate\Validation\ValidationException
     */
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
        $exists = $user->fofTermsPolicies()->where('id', $policy->id)->exists();

        $pivot = [
            'accepted_at' => Carbon::now(),
        ];

        if ($exists) {
            $user->fofTermsPolicies()->updateExistingPivot($policy->id, $pivot);
        } else {
            $user->fofTermsPolicies()->attach($policy->id, $pivot);
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

        $user->fofTermsPolicies()->attach($relationship);
    }

    public function sorting(array $sorting)
    {
        foreach ($sorting as $i => $fieldId) {
            $this->policy->newQuery()
                ->where('id', $fieldId)
                ->update(['sort' => $i]);
        }

        $this->clearCache();
    }
}
