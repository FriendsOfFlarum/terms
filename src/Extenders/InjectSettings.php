<?php

namespace FoF\Terms\Extenders;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class InjectSettings implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'permissions']);
    }

    public function permissions(Serializing $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            /**
             * @var SettingsRepositoryInterface $settings
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes['fof-terms.signup-legal-text'] = $settings->get('fof-terms.signup-legal-text', '');
            $event->attributes['fof-terms.hide-updated-at'] = (bool) $settings->get('fof-terms.hide-updated-at');
            $event->attributes['fof-terms.date-format'] = $settings->get('fof-terms.date-format') ?: 'YYYY-MM-DD';
            $event->attributes['fof-terms.canSeeUserPoliciesState'] = $event->actor->can('fof-terms.see-user-policies-state');
        }
    }
}
