<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
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
     *
     * @throws PermissionDeniedException
     */
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->policies->findOrFail($id);

        $this->policies->delete($actor, $field);
    }
}
