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

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PolicyAcceptController extends AbstractShowController
{
    public $serializer = BasicUserSerializer::class;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     * @param Document               $document
     *
     * @throws NotAuthenticatedException
     *
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');

        $policy = $this->policies->findOrFail($id);

        $actor = RequestUtil::getActor($request);

        $actor->assertRegistered();

        $this->policies->accept($actor, $policy);

        return $actor;
    }
}
