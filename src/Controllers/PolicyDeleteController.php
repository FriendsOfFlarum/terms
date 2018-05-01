<?php

namespace Flagrow\Terms\Controllers;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;

class PolicyDeleteController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = array_get($request->getQueryParams(), 'id');

        $field = $this->policies->findOrFail($id);

        $this->policies->delete($field);
    }
}
