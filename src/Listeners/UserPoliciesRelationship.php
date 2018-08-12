<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Policy;
use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\User;
use Flarum\Event\GetModelRelationship;
use Flarum\Api\Event\Serializing;
use Illuminate\Contracts\Events\Dispatcher;

class UserPoliciesRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(Serializing::class, [$this, 'addAttributes']);
    }

    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(User::class, 'flagrowTermsPolicies')) {
            return $event->model->belongsToMany(Policy::class, 'flagrow_terms_policy_user')->withPivot('accepted_at');
        }
    }

    public function addAttributes(Serializing $event)
    {
        if ($event->isSerializer(BasicUserSerializer::class)) {
            if ($event->actor->can('seeFlagrowTermsPoliciesState', $event->model)) {
                /**
                 * @var $policies PolicyRepository
                 */
                $policies = app(PolicyRepository::class);

                $event->attributes['flagrowTermsPoliciesState'] = $policies->state($event->model);
                $event->attributes['flagrowTermsPoliciesHasUpdate'] = $policies->hasPoliciesUpdate($event->model);
                $event->attributes['flagrowTermsPoliciesMustAccept'] = $policies->mustAcceptNewPolicies($event->model);
            }
        }
    }
}
