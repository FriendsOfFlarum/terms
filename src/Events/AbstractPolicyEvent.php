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
    /**
     * @var Policy
     */
    public $policy;

    /**
     * @var User
     */
    public $actor;

    /**
     * @var array
     */
    public $data;

    /**
     * @param Policy $policy
     * @param User   $actor
     * @param array  $data
     */
    public function __construct(Policy $policy, User $actor, array $data)
    {
        $this->policy = $policy;
        $this->actor = $actor;
        $this->data = $data;
    }
}
