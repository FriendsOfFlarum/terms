<?php

namespace FoF\Terms\Extenders;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\User\Event\Registered;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Contracts\Container\Container;

class UserRegistration implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Registered::class, [$this, 'registered']);
    }

    public function registered(Registered $event)
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        $policies->acceptAll($event->user);
    }
}
