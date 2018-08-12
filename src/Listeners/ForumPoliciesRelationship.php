<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flagrow\Terms\Serializers\PolicySerializer;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Event\WillGetData;
use Flarum\Event\GetApiRelationship;
use Flarum\Api\Event\WillSerializeData;
use Illuminate\Contracts\Events\Dispatcher;

class ForumPoliciesRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(WillSerializeData::class, [$this, 'loadRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiAttributes']);
        $events->listen(WillGetData::class, [$this, 'addIncludes']);
    }

    public function loadRelationship(WillSerializeData $event)
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        if ($event->isController(ShowForumController::class)) {
            $event->data['flagrowTermsPolicies'] = $policies->all();
        }
    }

    public function getApiAttributes(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'flagrowTermsPolicies')) {
            return $event->serializer->hasMany($event->model, PolicySerializer::class, 'flagrowTermsPolicies');
        }
    }

    public function addIncludes(WillGetData $event)
    {
        if ($event->isController(ShowForumController::class)) {
            $event->addInclude('flagrowTermsPolicies');
        }
    }
}
