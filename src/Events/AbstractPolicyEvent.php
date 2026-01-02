<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Events;

use Flarum\User\User;
use FoF\Terms\Policy;

abstract class AbstractPolicyEvent
{
    public function __construct(public Policy $policy, public User $actor, public array $data)
    {
    }
}
