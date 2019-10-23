<?php

namespace FoF\Terms\Extenders;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Event\WillSerializeData;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Serializers\PolicySerializer;
use Illuminate\Contracts\Container\Container;

class ForumPoliciesRelationship implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(WillSerializeData::class, [$this, 'loadRelationship']);
        $container['events']->listen(GetApiRelationship::class, [$this, 'getApiAttributes']);
        $container['events']->listen(WillGetData::class, [$this, 'addIncludes']);
    }

    public function loadRelationship(WillSerializeData $event)
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        if ($event->isController(ShowForumController::class)) {
            $event->data['fofTermsPolicies'] = $policies->all();
        }
    }

    public function getApiAttributes(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'fofTermsPolicies')) {
            return $event->serializer->hasMany($event->model, PolicySerializer::class, 'fofTermsPolicies');
        }
    }

    public function addIncludes(WillGetData $event)
    {
        if ($event->isController(ShowForumController::class)) {
            $event->addInclude('fofTermsPolicies');
        }
    }
}
