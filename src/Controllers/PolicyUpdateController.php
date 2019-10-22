<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\User\AssertPermissionTrait;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Serializers\PolicySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyUpdateController extends AbstractCreateController
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
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = array_get($request->getQueryParams(), 'id');

        $policy = $this->policies->findOrFail($id);

        $attributes = array_get($request->getParsedBody(), 'data.attributes', []);

        return $this->policies->update($policy, $attributes);
    }
}
