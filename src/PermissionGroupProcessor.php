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

use Flarum\Group\Group;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;

class PermissionGroupProcessor
{
    public static function process(User $actor, array $groupIds): array
    {
        // Prevent infinite loop when fetching permissions inside this event
        if (!PermissionLock::shouldApplyPermissionRestrictions()) {
            return $groupIds;
        }

        // Don't look further if the user is already a guest
        if ($actor->isGuest()) {
            return $groupIds;
        }

        /**
         * @var PolicyRepository $policies
         */
        $policies = resolve(PolicyRepository::class);

        // The Repository will check permissions against the Gate, which will fetch the user permissions,
        // which will fetch the groups again, which will trigger this same event
        // With this lock class we tell ourselves to not act when the event will be called inside the event itself
        // That way in the Gate check, the user will have its original groups and the permission will be applied
        // according to the permission settings of the admin panel
        PermissionLock::stopRestrictingPermissions();

        // Revoke access the same way as the suspend extension does
        if ($policies->mustAcceptNewPolicies($actor)) {
            $groupIds = [Group::GUEST_ID];
        }

        // Restore our ability to restrict permissions for the next permission check for the same or another user
        PermissionLock::continueRestrictingPermissions();

        return $groupIds;
    }
}
