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
        if ($schema->hasTable('fof_terms_policy_user')) {
            return;
        }

        $schema->create('fof_terms_policy_user', function (Blueprint $table) {
            $table->unsignedInteger('policy_id');
            $table->unsignedInteger('user_id');
            $table->timestamp('accepted_at')->index();

            $table->primary(['policy_id', 'user_id']);

            $table->foreign('policy_id')->references('id')->on('fof_terms_policies')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('fof_terms_policy_user');
    },
];
