<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Serializers\PolicySerializer;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyStoreController extends AbstractCreateController
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
     * @throws ValidationException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        /**
         * @var $actor User
         */
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->policies->store($attributes);
    }
}
