<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Core\Group;
use Flarum\Event\PrepareUserGroups;
use Illuminate\Contracts\Events\Dispatcher;

class RevokeAccessWhenNotAccepted
{
    use AssertPermissionTrait;

    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareUserGroups::class, [$this, 'prepareUserGroups']);
    }

    public function prepareUserGroups(PrepareUserGroups $event)
    {
        // Trying to get the policies relation on the guest user doesn't end well
        // Don't look further if the user is already a guest
        if ($event->user->isGuest()) {
            return;
        }

        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        // Revoke access the same way as the suspend extension does
        if ($policies->mustAcceptNewPolicies($event->user)) {
            $event->groupIds = [Group::GUEST_ID];
        }
    }
}
