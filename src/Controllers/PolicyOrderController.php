<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\User\AssertPermissionTrait;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Serializers\PolicySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyOrderController extends AbstractListController
{
    use AssertPermissionTrait;

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
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $attributes = $request->getParsedBody();

        $this->policies->sorting(array_get($attributes, 'sort'));

        // Return updated sorting values
        return $this->policies->all();
    }
}
