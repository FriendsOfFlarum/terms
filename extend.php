<?php

namespace FoF\Terms;

use Flarum\Extend;
use FoF\Terms\Middlewares\RegisterMiddleware;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->post(
            '/fof/terms/policies/order',
            'fof.terms.api.policies.order',
            Controllers\PolicyOrderController::class
        )
        ->get(
            '/fof/terms/policies',
            'fof.terms.api.policies.index',
            Controllers\PolicyIndexController::class
        )
        ->post(
            '/fof/terms/policies',
            'fof.terms.api.policies.store',
            Controllers\PolicyStoreController::class
        )
        ->patch(
            '/fof/terms/policies/{id:[0-9]+}',
            'fof.terms.api.policies.update',
            Controllers\PolicyUpdateController::class
        )
        ->delete(
            '/fof/terms/policies/{id:[0-9]+}',
            'fof.terms.api.policies.delete',
            Controllers\PolicyDeleteController::class
        )
        ->post(
            '/fof/terms/policies/{id:[0-9]+}/accept',
            'fof.terms.api.policies.delete',
            Controllers\PolicyAcceptController::class
        )
        ->get(
            '/fof/terms/policies/{id:[0-9]+}/export.{format:json|csv}',
            'fof.terms.api.policies.export',
            Controllers\PolicyExportController::class
        ),

    new Extenders\ForumPoliciesRelationship(),
    new Extenders\InjectSettings(),
    new Extenders\RevokeAccessWhenNotAccepted(),
    new Extenders\UserPoliciesRelationship(),
    new Extenders\UserRegistration(),

    function (Dispatcher $events) {
        $events->subscribe(Access\PolicyPolicy::class);
        $events->subscribe(Access\UserPolicy::class);
    },

    (new Extend\Middleware('forum'))->add(RegisterMiddleware::class),
];
