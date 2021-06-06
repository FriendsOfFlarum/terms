<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Validators;

use Flarum\Foundation\AbstractValidator;

class PolicyValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name'           => 'required|string',
            'url'            => 'sometimes|nullable|url',
            'update_message' => 'sometimes|nullable|string',
            // The date MUST be in the past, otherwise accepting the new TOS "now" still won't be more recent and won't restore access
            'terms_updated_at' => 'sometimes|nullable|date|before:now',
        ];
    }
}
