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
    protected static bool $apply = true;

    public static function stopRestrictingPermissions(): void
    {
        self::$apply = false;
    }

    public static function continueRestrictingPermissions(): void
    {
        self::$apply = true;
    }

    public static function shouldApplyPermissionRestrictions(): bool
    {
        return self::$apply;
    }
}
