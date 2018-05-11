<?php

namespace Flagrow\Terms\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\PrepareApiAttributes;
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
        $events->listen(PrepareApiAttributes::class, [$this, 'permissions']);
    }

    public function permissions(PrepareApiAttributes $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            $event->attributes['flagrow-terms.signup-legal-text'] = $this->settings->get('flagrow-terms.signup-legal-text', '');
            $event->attributes['flagrow-terms.hide-updated-at'] = (bool) $this->settings->get('flagrow-terms.hide-updated-at');
            $event->attributes['flagrow-terms.date-format'] = $this->settings->get('flagrow-terms.date-format') ?: 'YYYY-MM-DD';
            $event->attributes['flagrow-terms.canSeeUserPoliciesState'] = $event->actor->can('flagrow-terms.see-user-policies-state');
        }
    }
}
