<?php

namespace Flagrow\Terms\Controllers;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Api\Serializer\UserBasicSerializer;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyAcceptController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = UserBasicSerializer::class;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

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
