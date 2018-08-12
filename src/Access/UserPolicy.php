<?php

namespace Flagrow\Terms\Access;

use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    protected $model = User::class;

    public function seeFlagrowTermsPoliciesState(User $actor, User $user)
    {
        if ($user->id === $actor->id) {
            return true;
        }

        if ($actor->can('flagrow-terms.see-user-policies-state')) {
            return true;
        }

        return false;
    }
}
