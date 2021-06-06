<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // Re-use the tables from the Flagrow version if they exist
        if ($schema->hasTable('flagrow_terms_policies') && !$schema->hasTable('fof_terms_policies')) {
            $schema->rename('flagrow_terms_policies', 'fof_terms_policies');
        }

        if ($schema->hasTable('flagrow_terms_policy_user') && !$schema->hasTable('fof_terms_policy_user')) {
            $schema->rename('flagrow_terms_policy_user', 'fof_terms_policy_user');
        }
    },
    'down' => function (Builder $schema) {
        // Not doing anything but `down` has to be defined
    },
];
