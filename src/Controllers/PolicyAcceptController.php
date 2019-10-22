<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\AssertPermissionTrait;
use FoF\Terms\Repositories\PolicyRepository;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyAcceptController extends AbstractShowController
{
    use AssertPermissionTrait;

    public $serializer = BasicUserSerializer::class;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     * @throws \Flarum\User\Exception\NotAuthenticatedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = array_get($request->getQueryParams(), 'id');

        $policy = $this->policies->findOrFail($id);

        $actor = $request->getAttribute('actor');

        $this->assertRegistered($actor);

        $this->policies->accept($actor, $policy);

        return $actor;
    }
}
