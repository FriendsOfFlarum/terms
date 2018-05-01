<?php

namespace Flagrow\Terms\Serializers;

use Flagrow\Terms\Policy;
use Flarum\Api\Serializer\AbstractSerializer;

class PolicySerializer extends AbstractSerializer
{
    protected $type = 'flagrow-terms-policies';

    /**
     * @param Policy $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }
}
