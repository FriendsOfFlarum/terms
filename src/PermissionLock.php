<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms;

class PermissionLock
{
    protected static $apply = true;

    public static function stopRestrictingPermissions()
    {
        self::$apply = false;
    }

    public static function continueRestrictingPermissions()
    {
        self::$apply = true;
    }

    public static function shouldApplyPermissionRestrictions()
    {
        return self::$apply;
    }
}
