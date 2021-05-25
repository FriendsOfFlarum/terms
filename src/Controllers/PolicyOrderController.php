<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Serializers\PolicySerializer;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyOrderController extends AbstractListController
{
    public $serializer = PolicySerializer::class;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     * @throws PermissionDeniedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        /**
         * @var $actor User
         */
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $attributes = $request->getParsedBody();

        $this->policies->sorting(Arr::get($attributes, 'sort'));

        // Return updated sorting values
        return $this->policies->all();
    }
}
