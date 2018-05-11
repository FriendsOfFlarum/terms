<?php

namespace Flagrow\Terms\Serializers;

use Flagrow\Terms\Policy;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class PolicySerializer extends AbstractSerializer
{
    protected $type = 'flagrow-terms-policies';

    /**
     * @param Policy $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        $attributes = $model->toArray();

        /**
         * @var $settings SettingsRepositoryInterface
         */
        $settings = app(SettingsRepositoryInterface::class);

        if ($settings->get('flagrow-terms.hide-updated-at')) {
            $attributes['terms_updated_at'] = null;
        } else {
            $attributes['terms_updated_at'] = $this->formatDate($model->terms_updated_at);
        }

        return $attributes;
    }
}
