<?php

namespace Flagrow\Terms\Access;

use Flagrow\Terms\Policy;
use Flarum\Core\Access\AbstractPolicy;
use Flarum\Core\User;

class PolicyPolicy extends AbstractPolicy
{
    protected $model = Policy::class;

    public function postponeAccept(User $actor, Policy $policy)
    {
        return $actor->can('flagrow-terms.postpone-policies-accept');
    }

    public function export(User $actor, Policy $policy)
    {
        return $actor->can('flagrow-terms.export-policies');
    }
}
