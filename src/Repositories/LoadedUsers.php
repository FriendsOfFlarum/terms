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

use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;
use WeakMap;

/**
 * The users loaded so far, so that when one user's accepted policies are
 * needed, those of all of them are loaded with one query. Checking any user's
 * permissions needs their accepted policies, and extensions do that for every
 * user they serialize, however each user was reached.
 */
class LoadedUsers
{
    /**
     * Weak, so that tracking a user never keeps it in memory: a queue worker
     * loads users for as long as it runs.
     *
     * @var WeakMap<User, true>|null
     */
    protected static ?WeakMap $users = null;

    public static function track(User $user): void
    {
        self::$users ??= new WeakMap();
        self::$users[$user] = true;
    }

    /**
     * Loads the accepted policies of the given user, and of every loaded user
     * that doesn't have them yet.
     */
    public static function loadPoliciesWith(User $user): void
    {
        // An unsaved user (a guest) has none; reading the relation won't query.
        if (!$user->exists) {
            return;
        }

        $pending = [$user];

        foreach (self::$users ?? [] as $loaded => $_) {
            if ($loaded !== $user && !$loaded->relationLoaded('fofTermsPolicies')) {
                $pending[] = $loaded;
            }
        }

        self::$users = null;

        // Chunked to stay within the database's limit on bound parameters.
        foreach (array_chunk($pending, 1000) as $users) {
            (new Collection($users))->load('fofTermsPolicies');
        }
    }
}
