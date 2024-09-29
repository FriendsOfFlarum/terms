<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;

return Migration::addColumns('fof_terms_policy_user', [
    'is_accepted' => [
        'boolean',
        // Prior to this migration, all policies were required, so we mark them as accepted.
        'default' => true,
    ],
]);
