<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Terms\Policy;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
class PolicySerializer extends AbstractSerializer
{
    protected $type = 'fof-terms-policies';

    public function __construct(protected SettingsRepositoryInterface $settings)
    {
    }

    /**
     * @param Policy $model
     *
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        $attributes = $model->toArray();

        if ($this->settings->get('fof-terms.hide-updated-at')) {
            $attributes['terms_updated_at'] = null;
        } else {
            $attributes['terms_updated_at'] = $this->formatDate($model->terms_updated_at);
        }

        return $attributes;
    }
}
