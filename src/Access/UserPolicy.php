<?php

namespace FoF\Terms\Access;

use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    protected $model = User::class;

    public function seeFoFTermsPoliciesState(User $actor, User $user)
    {
        if ($user->id === $actor->id) {
            return true;
        }

        if ($actor->can('fof-terms.see-user-policies-state')) {
            return true;
        }

        return false;
    }
}
