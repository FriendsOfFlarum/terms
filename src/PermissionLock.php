<?php

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

    public static function shouldApplyPermissionRestrictions() {
        return self::$apply;
    }
}
