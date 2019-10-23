<?php

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
