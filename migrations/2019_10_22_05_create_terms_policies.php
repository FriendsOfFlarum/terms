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
        if ($schema->hasTable('fof_terms_policies')) {
            return;
        }

        $schema->create('fof_terms_policies', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('sort')->nullable()->index();
            $table->string('name');
            $table->string('url')->nullable();
            $table->text('update_message')->nullable();
            $table->timestamp('terms_updated_at')->nullable();
            $table->timestamps();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('fof_terms_policies');
    },
];
