<?php

namespace Flagrow\Terms\Validators;

use Flarum\Core\Validator\AbstractValidator;

class PolicyValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name' => 'required|string',
            'url' => 'sometimes|url',
            'update_message' => 'sometimes|string',
            // The date MUST be in the past, otherwise accepting the new TOS "now" still won't be more recent and won't restore access
            'terms_updated_at' => 'sometimes|date|before:now',
        ];
    }
}
