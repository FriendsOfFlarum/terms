<?php

namespace Flagrow\Terms;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddApiRoutes::class);
    $events->subscribe(Listeners\Assets::class);
    $events->subscribe(Listeners\ForumPoliciesRelationship::class);
    $events->subscribe(Listeners\InjectSettings::class);
    $events->subscribe(Listeners\RevokeAccessWhenNotAccepted::class);
    $events->subscribe(Listeners\UserPoliciesRelationship::class);
    $events->subscribe(Listeners\UserRegistration::class);

    $events->subscribe(Access\PolicyPolicy::class);
    $events->subscribe(Access\UserPolicy::class);
};
