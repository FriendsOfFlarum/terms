<?php

namespace Flagrow\Terms;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Routes('api'))
        ->post(
            '/flagrow/terms/policies/order',
            'flagrow.terms.api.policies.order',
            Controllers\PolicyOrderController::class
        )
        ->get(
            '/flagrow/terms/policies',
            'flagrow.terms.api.policies.index',
            Controllers\PolicyIndexController::class
        )
        ->post(
            '/flagrow/terms/policies',
            'flagrow.terms.api.policies.store',
            Controllers\PolicyStoreController::class
        )
        ->patch(
            '/flagrow/terms/policies/{id:[0-9]+}',
            'flagrow.terms.api.policies.update',
            Controllers\PolicyUpdateController::class
        )
        ->delete(
            '/flagrow/terms/policies/{id:[0-9]+}',
            'flagrow.terms.api.policies.delete',
            Controllers\PolicyDeleteController::class
        )
        ->post(
            '/flagrow/terms/policies/{id:[0-9]+}/accept',
            'flagrow.terms.api.policies.delete',
            Controllers\PolicyAcceptController::class
        )
        ->get(
            '/flagrow/terms/policies/{id:[0-9]+}/export.{format:json|csv}',
            'flagrow.terms.api.policies.export',
            Controllers\PolicyExportController::class
        ),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\ForumPoliciesRelationship::class);
        $events->subscribe(Listeners\InjectSettings::class);
        $events->subscribe(Listeners\RevokeAccessWhenNotAccepted::class);
        $events->subscribe(Listeners\UserPoliciesRelationship::class);
        $events->subscribe(Listeners\UserRegistration::class);

        $events->subscribe(Access\PolicyPolicy::class);
        $events->subscribe(Access\UserPolicy::class);
    }
];
