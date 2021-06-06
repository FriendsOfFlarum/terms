<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function seeFoFTermsPoliciesState(User $actor, User $user)
    {
        if ($user->id === $actor->id) {
            return $this->allow();
        }

        if ($actor->can('fof-terms.see-user-policies-state')) {
            return $this->allow();
        }
    }
}
