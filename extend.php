<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Database\AbstractModel;
use Flarum\Extend;
use Flarum\Gdpr\Extend\UserData;
use Flarum\User\User;
use FoF\Terms\Middlewares\RegisterMiddleware;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->jsDirectory(__DIR__.'/js/dist/forum'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        // Custom action routes (not covered by standard CRUD endpoints)
        ->post('/fof/terms/policies/order', 'fof.terms.api.policies.order', Controllers\PolicyOrderController::class)
        ->get('/fof/terms/policies/{id:[0-9]+}/export.{format:json|csv}', 'fof.terms.api.policies.export', Controllers\PolicyExportController::class),

    (new Extend\Middleware('forum'))
        ->add(RegisterMiddleware::class),

    (new Extend\Model(User::class))
        ->relationship('fofTermsPolicies', fn (AbstractModel $user): BelongsToMany => $user
                ->belongsToMany(Policy::class, 'fof_terms_policy_user')
                ->withPivot(['accepted_at', 'is_accepted'])),

    (new Extend\User())
        ->permissionGroups(function ($actor, $groupIds) {
            return PermissionGroupProcessor::process($actor, $groupIds);
        }),

    (new Extend\Policy())
        ->modelPolicy(Policy::class, Access\PolicyPolicy::class)
        ->modelPolicy(User::class, Access\UserPolicy::class),

    (new Extend\Settings())
        ->default('fof-terms.date-format', 'YYYY-MM-DD')
        ->serializeToForum('fof-terms.signup-legal-text', 'fof-terms.signup-legal-text')
        ->serializeToForum('fof-terms.hide-updated-at', 'fof-terms.hide-updated-at', 'boolVal')
        ->serializeToForum('fof-terms.date-format', 'fof-terms.date-format', 'strVal'),

    (new Extend\ApiResource(Resource\UserResource::class))
        ->fields(Api\UserResourceFields::class),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(Api\ForumResourceFields::class)
        ->endpoint(Endpoint\Show::class, function (Endpoint\Show $endpoint) {
            return $endpoint->addDefaultInclude(['fofTermsPolicies']);
        }),

    new Extend\ApiResource(Api\Resource\PolicyResource::class),

    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-gdpr', fn () => [
            (new UserData())
                ->addType(Data\UserPolicyData::class),
        ]),
];
