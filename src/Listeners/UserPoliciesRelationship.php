<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Policy;
use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Api\Serializer\UserBasicSerializer;
use Flarum\Core\User;
use Flarum\Event\GetModelRelationship;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class UserPoliciesRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
    }

    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(User::class, 'flagrowTermsPolicies')) {
            return $event->model->belongsToMany(Policy::class, 'flagrow_terms_policy_user')->withPivot('accepted_at');
        }
    }

    public function addAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(UserBasicSerializer::class)) {
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
