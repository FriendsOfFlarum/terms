<?php

namespace FoF\Terms\Listeners;

use Flarum\Event\ConfigureMiddleware;
use Flarum\User\Event\Registered;
use FoF\Terms\Middlewares\RegisterMiddleware;
use FoF\Terms\Repositories\PolicyRepository;
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
