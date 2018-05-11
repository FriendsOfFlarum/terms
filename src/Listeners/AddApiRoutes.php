<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Controllers;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiRoutes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'routes']);
    }

    public function routes(ConfigureApiRoutes $routes)
    {
        $routes->post(
            '/flagrow/terms/policies/order',
            'flagrow.terms.api.policies.order',
            Controllers\PolicyOrderController::class
        );
        $routes->get(
            '/flagrow/terms/policies',
            'flagrow.terms.api.policies.index',
            Controllers\PolicyIndexController::class
        );
        $routes->post(
            '/flagrow/terms/policies',
            'flagrow.terms.api.policies.store',
            Controllers\PolicyStoreController::class
        );
        $routes->patch(
            '/flagrow/terms/policies/{id:[0-9]+}',
            'flagrow.terms.api.policies.update',
            Controllers\PolicyUpdateController::class
        );
        $routes->delete(
            '/flagrow/terms/policies/{id:[0-9]+}',
            'flagrow.terms.api.policies.delete',
            Controllers\PolicyDeleteController::class
        );

        $routes->post(
            '/flagrow/terms/policies/{id:[0-9]+}/accept',
            'flagrow.terms.api.policies.delete',
            Controllers\PolicyAcceptController::class
        );

        $routes->get(
            '/flagrow/terms/policies/{id:[0-9]+}/export.{format:json|csv}',
            'flagrow.terms.api.policies.export',
            Controllers\PolicyExportController::class
        );
    }
}
