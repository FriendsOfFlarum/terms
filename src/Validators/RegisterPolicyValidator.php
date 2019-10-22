<?php

namespace FoF\Terms\Validators;

use Flarum\Foundation\AbstractValidator;
use FoF\Terms\Repositories\PolicyRepository;

class RegisterPolicyValidator extends AbstractValidator
{
    protected function getRules()
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        $rules = [];

        foreach ($policies->all() as $policy) {
            $rules['fof_terms_policy_' . $policy->id] = 'accepted';
        }

        return $rules;
    }

    protected function getMessages()
    {
        /**
         * @var $policies PolicyRepository
         */
        $policies = app(PolicyRepository::class);

        $messages = [];

        foreach ($policies->all() as $policy) {
            $messages['fof_terms_policy_' . $policy->id . '.accepted'] = $this->translator->trans('fof-terms.forum.signup.must-accept', [
                '{policy}' => $policy->name,
            ]);
        }

        return $messages;
    }
}
