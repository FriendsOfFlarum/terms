<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        /**
         * @var $settings SettingsRepositoryInterface
         */
        $settings = app(SettingsRepositoryInterface::class);

        foreach ([
            'signup-legal-text',
            'hide-updated-at',
            'date-format',
        ] as $key) {
            $value = $settings->get('flagrow-terms.'.$key);

            if (!is_null($value)) {
                $settings->set('fof-terms.'.$key, $value);
                $settings->delete('flagrow-terms.'.$key);
            }
        }
    },
    'down' => function (Builder $schema) {
        // Not doing anything but `down` has to be defined
    },
];
