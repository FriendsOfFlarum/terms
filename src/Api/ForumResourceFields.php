<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Api;

use Flarum\Api\Context;
use Flarum\Api\Schema;
use FoF\Terms\Repositories\PolicyRepository;

class ForumResourceFields
{
    public function __construct(protected PolicyRepository $policies)
    {
    }

    public function __invoke(): array
    {
        return [
            Schema\Arr::make('fof-terms')
                ->get(function ($forum, Context $context) {
                    return [
                        'canSeeUserPoliciesState' => $context->getActor()->hasPermission('fof-terms.see-user-policies-state'),
                    ];
                }),

            Schema\Relationship\ToMany::make('fofTermsPolicies')
                ->type('fof-terms-policies')
                ->includable()
                ->get(fn () => $this->policies->all()->all()),
        ];
    }
}
