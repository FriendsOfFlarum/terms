<?php

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class PolicyDeleteController extends AbstractDeleteController
{
    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     * @throws PermissionDeniedException
     */
    protected function delete(ServerRequestInterface $request)
    {
        /**
         * @var $actor User
         */
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->policies->findOrFail($id);

        $this->policies->delete($field);
    }
}
