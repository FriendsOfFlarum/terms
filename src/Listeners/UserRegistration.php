<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Middlewares\RegisterMiddleware;
use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Event\ConfigureMiddleware;
use Flarum\Event\UserWasRegistered;
use Illuminate\Contracts\Events\Dispatcher;

class UserRegistration
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserWasRegistered::class, [$this, 'registered']);
        $events->listen(ConfigureMiddleware::class, [$this, 'middlewares']);
    }

    public function registered(UserWasRegistered $event)
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        $policies->acceptAll($event->user);
    }

    public function middlewares(ConfigureMiddleware $middleware)
    {
        $middleware->pipe->pipe(null, app(RegisterMiddleware::class));
    }
}
