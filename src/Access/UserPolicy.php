<?php

namespace FoF\Terms\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function seeFoFTermsPoliciesState(User $actor, User $user)
    {
        if ($user->id === $actor->id) {
            return $this->allow();
        }

        if ($actor->can('fof-terms.see-user-policies-state')) {
            return $this->allow();
        }
    }
}
