<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\User\AssertPermissionTrait;
use FoF\Terms\Repositories\PolicyRepository;
use Psr\Http\Message\ServerRequestInterface;

class PolicyDeleteController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = array_get($request->getQueryParams(), 'id');

        $field = $this->policies->findOrFail($id);

        $this->policies->delete($field);
    }
}
