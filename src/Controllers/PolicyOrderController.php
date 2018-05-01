<?php

namespace Flagrow\Terms\Controllers;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flagrow\Terms\Serializers\PolicySerializer;
use Flarum\Api\Controller\AbstractCollectionController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyOrderController extends AbstractCollectionController
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

        $attributes = $request->getParsedBody();

        $this->policies->sorting(array_get($attributes, 'sort'));

        // Return updated sorting values
        return $this->policies->all();
    }
}
