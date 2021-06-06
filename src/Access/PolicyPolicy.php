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
use FoF\Terms\Policy;

class PolicyPolicy extends AbstractPolicy
{
    public function postponeAccept(User $actor, Policy $policy)
    {
        return $actor->can('fof-terms.postpone-policies-accept');
    }

    public function export(User $actor, Policy $policy)
    {
        return $actor->can('fof-terms.export-policies');
    }
}
