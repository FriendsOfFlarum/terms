<?php

namespace Flagrow\Terms\Listeners;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flagrow\Terms\Serializers\PolicySerializer;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\PrepareApiData;
use Illuminate\Contracts\Events\Dispatcher;

class ForumPoliciesRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiData::class, [$this, 'loadRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiAttributes']);
        $events->listen(ConfigureApiController::class, [$this, 'addIncludes']);
    }

    public function loadRelationship(PrepareApiData $event)
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

    public function addIncludes(ConfigureApiController $event)
    {
        if ($event->isController(ShowForumController::class)) {
            $event->addInclude('flagrowTermsPolicies');
        }
    }
}
