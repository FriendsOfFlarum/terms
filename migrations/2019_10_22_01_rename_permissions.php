<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Group\Permission;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        Permission::query()
            ->where('permission', 'flagrow-terms.see-user-policies-state')
            ->update(['permission' => 'fof-terms.see-user-policies-state']);
        Permission::query()
            ->where('permission', 'flagrow-terms.postpone-policies-accept')
            ->update(['permission' => 'fof-terms.postpone-policies-accept']);
        Permission::query()
            ->where('permission', 'flagrow-terms.export-policies')
            ->update(['permission' => 'fof-terms.export-policies']);
    },
    'down' => function (Builder $schema) {
        // Not doing anything but `down` has to be defined
    },
];
