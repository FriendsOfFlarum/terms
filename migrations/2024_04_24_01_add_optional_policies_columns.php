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

return Migration::addColumns('fof_terms_policies', [
    'optional' => ['boolean', 'default' => false],
    // This could be a JSON column type, but Flarum requires MySQL 5.6+ / MariaDB 10.0.5+.
    // JSON columns are supported in MySQL 5.7+ / MariaDB 10.2+.
    'additional_info' => ['longText', 'nullable' => true],
]);
