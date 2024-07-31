<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('fof_terms_policy_user', function (Blueprint $table) {
            $table->boolean('is_accepted')->default(false)->change();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('fof_terms_policy_user', function (Blueprint $table) {
            $table->boolean('is_accepted')->default(true)->change();
        });
    },
];
