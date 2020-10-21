<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Serializers\PolicySerializer;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyIndexController extends AbstractListController
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
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        return $this->policies->all();
    }
}
