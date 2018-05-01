<?php

namespace Flagrow\Terms\Controllers;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flagrow\Terms\Serializers\PolicySerializer;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyUpdateController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = PolicySerializer::class;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = array_get($request->getQueryParams(), 'id');

        $policy = $this->policies->findOrFail($id);

        $attributes = array_get($request->getParsedBody(), 'data.attributes', []);

        return $this->policies->update($policy, $attributes);
    }
}
