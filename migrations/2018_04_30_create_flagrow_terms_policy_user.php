<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flagrow_terms_policy_user', function (Blueprint $table) {
            $table->unsignedInteger('policy_id');
            $table->unsignedInteger('user_id');
            $table->timestamp('accepted_at')->index();

            $table->primary(['policy_id', 'user_id']);

            $table->foreign('policy_id')->references('id')->on('flagrow_terms_policies')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('flagrow_terms_policy_user');
    },
];
