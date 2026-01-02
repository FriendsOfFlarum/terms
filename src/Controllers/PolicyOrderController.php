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

use Flarum\Api\JsonApiResponse;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\Terms\Policy;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class PolicyOrderController implements RequestHandlerInterface
{
    public function __construct(
        protected PolicyRepository $policies,
        protected SettingsRepositoryInterface $settings
    ) {
    }

    /**
     * @param ServerRequestInterface $request
     *
     * @throws PermissionDeniedException
     *
     * @return ResponseInterface
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $attributes = $request->getParsedBody();

        $this->policies->sorting(Arr::get($attributes, 'sort'));
        $this->policies->clearCache();

        // Get updated policies and return as JSON:API
        $policies = $this->policies->all();

        $data = [];
        foreach ($policies as $policy) {
            $hideUpdatedAt = $this->settings->get('fof-terms.hide-updated-at');

            $data[] = [
                'type' => 'fof-terms-policies',
                'id' => (string) $policy->id,
                'attributes' => [
                    'sort' => $policy->sort,
                    'name' => $policy->name,
                    'url' => $policy->url,
                    'updateMessage' => $policy->update_message,
                    'termsUpdatedAt' => $hideUpdatedAt ? null : ($policy->terms_updated_at ? $policy->terms_updated_at->toIso8601String() : null),
                    'optional' => $policy->optional,
                    'additionalInfo' => $policy->additional_info,
                    'createdAt' => $policy->created_at->toIso8601String(),
                    'updatedAt' => $policy->updated_at->toIso8601String(),
                ],
            ];
        }

        return new JsonApiResponse(['data' => $data]);
    }
}
