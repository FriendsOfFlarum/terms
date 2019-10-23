<?php

namespace FoF\Terms\Extenders;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Event\GetModelRelationship;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\User\User;
use FoF\Terms\Policy;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Contracts\Container\Container;

class UserPoliciesRelationship implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $container['events']->listen(Serializing::class, [$this, 'addAttributes']);
    }

    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(User::class, 'fofTermsPolicies')) {
            return $event->model->belongsToMany(Policy::class, 'fof_terms_policy_user')->withPivot('accepted_at');
        }
    }

    public function addAttributes(Serializing $event)
    {
        if ($event->isSerializer(BasicUserSerializer::class)) {
            if ($event->actor->can('seeFoFTermsPoliciesState', $event->model)) {
                /**
                 * @var $policies PolicyRepository
                 */
                $policies = app(PolicyRepository::class);

                $event->attributes['fofTermsPoliciesState'] = $policies->state($event->model);
                $event->attributes['fofTermsPoliciesHasUpdate'] = $policies->hasPoliciesUpdate($event->model);
                $event->attributes['fofTermsPoliciesMustAccept'] = $policies->mustAcceptNewPolicies($event->model);
            }
        }
    }
}
