<?php

namespace FoF\Terms\Extenders;

use Flarum\Event\PrepareUserGroups;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Group\Group;
use FoF\Terms\PermissionLock;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Contracts\Container\Container;

class RevokeAccessWhenNotAccepted implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(PrepareUserGroups::class, [$this, 'prepareUserGroups']);
    }

    public function prepareUserGroups(PrepareUserGroups $event)
    {
        // Prevent infinite loop when fetching permissions inside this event
        if (!PermissionLock::shouldApplyPermissionRestrictions()) {
            return;
        }

        // Don't look further if the user is already a guest
        if ($event->user->isGuest()) {
            return;
        }

        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        // The Repository will check permissions against the Gate, which will fetch the user permissions,
        // which will fetch the groups again, which will trigger this same event
        // With this lock class we tell ourselves to not act when the event will be called inside the event itself
        // That way in the Gate check, the user will have its original groups and the permission will be applied
        // according to the permission settings of the admin panel
        PermissionLock::stopRestrictingPermissions();

        // Revoke access the same way as the suspend extension does
        if ($policies->mustAcceptNewPolicies($event->user)) {
            $event->groupIds = [Group::GUEST_ID];
        }

        // Restore our ability to restrict permissions for the next permission check for the same or another user
        PermissionLock::continueRestrictingPermissions();
    }
}
