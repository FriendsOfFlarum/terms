<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Extenders;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;

class UserPoliciesRelationship
{
    public function __invoke(BasicUserSerializer $serializer, User $user, array $attributes)
    {
        if ($serializer->getActor()->can('seeFoFTermsPoliciesState', $user)) {
            /**
             * @var $policies PolicyRepository
             */
            $policies = app(PolicyRepository::class);

            $attributes['fofTermsPoliciesState'] = $policies->state($user);
            $attributes['fofTermsPoliciesHasUpdate'] = $policies->hasPoliciesUpdate($user);
            $attributes['fofTermsPoliciesMustAccept'] = $policies->mustAcceptNewPolicies($user);
        }

        return $attributes;
    }
}
