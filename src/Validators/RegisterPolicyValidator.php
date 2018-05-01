<?php

namespace Flagrow\Terms\Validators;

use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Core\Validator\AbstractValidator;

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
            $rules['flagrow_terms_policy_' . $policy->id] = 'accepted';
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
            $messages['flagrow_terms_policy_' . $policy->id . '.accepted'] = $this->translator->trans('flagrow-terms.forum.signup.must-accept', [
                '{policy}' => $policy->name,
            ]);
        }

        return $messages;
    }
}
