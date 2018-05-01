<?php

namespace Flagrow\Terms;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;

/**
 * @property int $id
 * @property int $sort
 * @property string $name
 * @property string $url
 * @property string $update_message
 * @property Carbon $terms_updated_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Policy extends AbstractModel
{
    protected $table = 'flagrow_terms_policies';

    public $timestamps = true;

    protected $dates = [
        'terms_updated_at',
    ];

    protected $visible = [
        'sort',
        'name',
        'url',
        'update_message',
        'terms_updated_at',
    ];

    protected $fillable = [
        'name',
        'url',
        'update_message',
        'terms_updated_at',
    ];

    protected function setUrlAttribute($value)
    {
        $this->attributes['url'] = $value ? $value : null;
    }

    protected function setUpdateMessageAttribute($value)
    {
        $this->attributes['update_message'] = $value ? $value : null;
    }

    protected function setTermsUpdatedAtAttribute($value)
    {
        $this->attributes['terms_updated_at'] = $value ? Carbon::parse($value) : null;
    }
}
