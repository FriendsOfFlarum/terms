<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Middlewares\RegisterMiddleware;
use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Event\ConfigureMiddleware;
use Flarum\User\Event\Registered;
use Illuminate\Contracts\Events\Dispatcher;

class UserRegistration
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Registered::class, [$this, 'registered']);
        $events->listen(ConfigureMiddleware::class, [$this, 'middlewares']);
    }

    public function registered(Registered $event)
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        $policies->acceptAll($event->user);
    }

    public function middlewares(ConfigureMiddleware $middleware)
    {
        $middleware->pipe->pipe(app(RegisterMiddleware::class));
    }
}
