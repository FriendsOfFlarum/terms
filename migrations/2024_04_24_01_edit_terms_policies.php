<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('fof_terms_policies', function (Blueprint $table) {
            // This could be a JSON column type, but Flarum requires MySQL 5.6+ / MariaDB 10.0.5+.
            // JSON columns are supported in MySQL 5.7+ / MariaDB 10.2+.
            $table->longText('additional_info');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('fof_terms_policies', function (Blueprint $table) {
            $table->dropColumn('additional_info');
        });
    },
];
