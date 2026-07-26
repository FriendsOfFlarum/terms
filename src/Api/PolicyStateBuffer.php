<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Api;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;

/**
 * Collects users while the API document is being built, so that their
 * accepted policies can be loaded with a single query for all of them when
 * the first deferred field value is resolved — instead of one lazy
 * relationship load per serialized user.
 *
 * Mirrors the batching approach of Flarum's EloquentBuffer for relationships.
 */
class PolicyStateBuffer
{
    /**
     * @var array<int, User>
     */
    protected static array $buffer = [];

    public static function add(User $user): void
    {
        self::$buffer[spl_object_id($user)] = $user;
    }

    public static function loadPending(): void
    {
        $pending = array_filter(
            self::$buffer,
            fn (User $user) => !$user->relationLoaded('fofTermsPolicies')
        );

        self::$buffer = [];

        if ($pending) {
            (new Collection(array_values($pending)))->load('fofTermsPolicies');
        }
    }
}
