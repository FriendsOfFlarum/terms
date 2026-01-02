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
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;

class UserResourceFields
{
    public function __construct(protected PolicyRepository $policies)
    {
    }

    public function __invoke(): array
    {
        $fields = [
            Schema\Str::make('fofTermsPoliciesState')
                ->visible(fn (User $user, Context $context) =>
                    $context->getActor()->can('seeFoFTermsPoliciesState', $user)
                )
                ->get(fn (User $user) => $this->policies->state($user)),

            Schema\Boolean::make('fofTermsPoliciesHasUpdate')
                ->visible(fn (User $user, Context $context) =>
                    $context->getActor()->can('seeFoFTermsPoliciesState', $user)
                )
                ->get(fn (User $user) => $this->policies->hasPoliciesUpdate($user)),

            Schema\Boolean::make('fofTermsPoliciesMustAccept')
                ->visible(fn (User $user, Context $context) =>
                    $context->getActor()->can('seeFoFTermsPoliciesState', $user)
                )
                ->get(fn (User $user) => $this->policies->mustAcceptNewPolicies($user)),

            Schema\Relationship\ToMany::make('fofTermsPolicies')
                ->type('fof-terms-policies')
                ->includable(),
        ];

        // Add writable fields for each policy (used during registration)
        // These fields are processed by the RegisterMiddleware and don't affect the model
        foreach ($this->policies->all() as $policy) {
            $fields[] = Schema\Boolean::make('fof_terms_policy_'.$policy->id)
                ->writable()
                ->hidden() // Don't serialize these fields in responses
                ->set(function (User $user, $value, Context $context) {
                    // Do nothing - the RegisterMiddleware handles the actual logic
                    // This field definition just allows the field to pass validation
                });
        }

        return $fields;
    }
}
