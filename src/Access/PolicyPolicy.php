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
    public function postponeAccept(User $actor, Policy $policy): ?string
    {
        if ($actor->hasPermission('fof-terms.postpone-policies-accept')) {
            return $this->allow();
        }

        return null;
    }

    public function export(User $actor, Policy $policy): ?string
    {
        if ($actor->hasPermission('fof-terms.export-policies')) {
            return $this->allow();
        }

        return null;
    }
}
