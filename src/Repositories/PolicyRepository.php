<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Repositories;

use Carbon\Carbon;
use Flarum\User\User;
use FoF\Terms\Events\Created;
use FoF\Terms\Events\Deleted;
use FoF\Terms\Policy;
use FoF\Terms\Validators\PolicyValidator;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;

class PolicyRepository
{
    protected Policy $policy;
    protected PolicyValidator $validator;
    protected Repository $cache;

    protected Dispatcher $events;

    protected $rememberState;

    const CACHE_KEY = 'fof-terms-policies';

    public function __construct(Policy $policy, PolicyValidator $validator, Repository $cache, Dispatcher $events)
    {
        $this->policy = $policy;
        $this->validator = $validator;
        $this->cache = $cache;
        $this->events = $events;
    }

    /**
     * @return Collection<Policy>
     */
    public function all(): Collection
    {
        return $this->cache->rememberForever(self::CACHE_KEY, function () {
            return $this->policy->newQuery()->orderBy('sort')->get();
        });
    }

    public function clearCache()
    {
        $this->cache->forget(self::CACHE_KEY);
    }

    public function findOrFail(string $id): Policy
    {
        /** @phpstan-ignore-next-line Method FoF\Terms\Repositories\PolicyRepository::findOrFail() should return FoF\Terms\Policy but returns Illuminate\Database\Eloquent\Model. */
        return $this->policy->newQuery()->findOrFail($id);
    }

    public function state(User $user)
    {
        if (!$this->rememberState) {
            /**
             * @var Collection<Policy> $userPolicies
             *
             * @phpstan-ignore-next-line
             */
            $userPolicies = $user->fofTermsPolicies->keyBy('id');

            $this->rememberState = [];

            foreach ($this->all() as $policy) {
                /** @phpstan-ignore-next-line Access to an undefined property FoF\Terms\Policy::$pivot */
                $accepted_at = $userPolicies->has($policy->id) ? Carbon::parse($userPolicies->get($policy->id)->pivot->accepted_at) : null;
                $has_update = !$accepted_at || (($policy->terms_updated_at !== null) && $policy->terms_updated_at->gt($accepted_at));
                $optional = $policy->optional;
                /**
                 * @var bool $is_accepted
                 *
                 * @phpstan-ignore-next-line Access to an undefined property FoF\Terms\Policy::$pivot
                 */
                $is_accepted = $userPolicies->has($policy->id) ? $userPolicies->get($policy->id)->pivot->is_accepted : false;

                $this->rememberState[$policy->id] = [
                    'accepted_at' => $accepted_at ? $accepted_at->toRfc3339String() : null,
                    'has_update'  => $has_update,
                    'must_accept' => $has_update && !$user->can('postponeAccept', $policy) && !$optional,
                    'is_accepted' => $is_accepted,
                ];
            }
        }

        return $this->rememberState;
    }

    public function hasPoliciesUpdate(User $user): bool
    {
        $state = $this->state($user);

        $hasUpdates = false;

        foreach ($state as $s) {
            if (Arr::get($s, 'has_update')) {
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
            if (Arr::get($s, 'must_accept')) {
                $mustAccept = true;

                break;
            }
        }

        return $mustAccept;
    }

    /**
     * @param User  $actor
     * @param array $attributes
     *
     * @throws ValidationException
     *
     * @return Policy
     */
    public function store(User $actor, array $attributes)
    {
        $this->validator->assertValid($attributes);

        $policy = new Policy($attributes);
        $policy->save();

        $this->events->dispatch(new Created($policy, $actor, $attributes));

        $this->clearCache();

        return $policy;
    }

    /**
     * @param Policy $policy
     * @param array  $attributes
     *
     * @throws ValidationException
     *
     * @return Policy
     */
    public function update(Policy $policy, array $attributes)
    {
        $this->validator->assertValid($attributes);

        $policy->fill($attributes);
        $policy->save();

        $this->clearCache();

        return $policy;
    }

    public function delete(User $actor, Policy $policy)
    {
        $res = $policy->delete();

        $this->events->dispatch(new Deleted($policy, $actor, []));

        $this->clearCache();

        return $res;
    }

    public function accept(User $user, Policy $policy)
    {
        $exists = $this->getUserPolicyRelationship($user)->where('id', $policy->id)->exists();

        $pivot = [
            'accepted_at' => Carbon::now(),
            'is_accepted' => true,
        ];

        if ($exists) {
            $this->getUserPolicyRelationship($user)->updateExistingPivot($policy->id, $pivot);
        } else {
            $this->getUserPolicyRelationship($user)->attach($policy->id, $pivot);
        }
    }

    public function acceptAll(User $user)
    {
        $relationship = [];
        foreach ($this->all() as $policy) {
            $relationship[$policy->id] = [
                'accepted_at' => Carbon::now(),
                'is_accepted' => true,
            ];
        }

        $this->getUserPolicyRelationship($user)->attach($relationship);
    }

    public function declineOptional(User $user, Policy $policy)
    {
        $exists = $this->getUserPolicyRelationship($user)->where('id', $policy->id)->exists();

        $pivot = [
            'accepted_at' => null,
            'is_accepted' => false,
        ];

        if ($exists) {
            $this->getUserPolicyRelationship($user)->updateExistingPivot($policy->id, $pivot);
        } else {
            $this->getUserPolicyRelationship($user)->attach($policy->id, $pivot);
        }
    }

    public function declineAll(User $user)
    {
        $this->getUserPolicyRelationship($user)->detach();
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

    protected function getUserPolicyRelationship(User $user): BelongsToMany
    {
        /** @phpstan-ignore-next-line */
        return $user->fofTermsPolicies();
    }
}
