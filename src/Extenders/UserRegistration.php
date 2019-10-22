<?php

namespace FoF\Terms\Extenders;

use Flarum\Event\ConfigureMiddleware;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\User\Event\Registered;
use FoF\Terms\Middlewares\RegisterMiddleware;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Contracts\Container\Container;

class UserRegistration implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Registered::class, [$this, 'registered']);
        $container['events']->listen(ConfigureMiddleware::class, [$this, 'middlewares']);
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
