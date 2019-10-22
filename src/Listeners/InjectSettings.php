<?php

namespace FoF\Terms\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class InjectSettings
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'permissions']);
    }

    public function permissions(Serializing $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            $event->attributes['fof-terms.signup-legal-text'] = $this->settings->get('fof-terms.signup-legal-text', '');
            $event->attributes['fof-terms.hide-updated-at'] = (bool) $this->settings->get('fof-terms.hide-updated-at');
            $event->attributes['fof-terms.date-format'] = $this->settings->get('fof-terms.date-format') ?: 'YYYY-MM-DD';
            $event->attributes['fof-terms.canSeeUserPoliciesState'] = $event->actor->can('fof-terms.see-user-policies-state');
        }
    }
}
