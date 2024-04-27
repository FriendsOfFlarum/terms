<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\User\User;

/**
 * @property int    $id
 * @property int    $sort
 * @property string $name
 * @property string $url
 * @property string $update_message
 * @property Carbon $terms_updated_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property bool   $optional
 * @property array  $additional_info
 */
class Policy extends AbstractModel
{
    protected $table = 'fof_terms_policies';

    public $timestamps = true;

    protected $casts = [
        'additional_info' => 'array',
    ];

    protected $dates = [
        'terms_updated_at',
    ];

    protected $visible = [
        'sort',
        'name',
        'url',
        'update_message',
        'terms_updated_at',
        'optional',
        'additional_info',
    ];

    protected $fillable = [
        'name',
        'url',
        'update_message',
        'terms_updated_at',
        'optional',
        'additional_info',

    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'fof_terms_policy_user')->withPivot('accepted_at');
    }

    protected function setUrlAttribute($value)
    {
        $this->attributes['url'] = $value ?: null;
    }

    protected function setUpdateMessageAttribute($value)
    {
        $this->attributes['update_message'] = $value ?: null;
    }

    protected function setTermsUpdatedAtAttribute($value)
    {
        $this->attributes['terms_updated_at'] = $value ? Carbon::parse($value) : null;
    }

    protected function setOptionalAttribute($value)
    {
        $this->attributes['optional'] = $value ? true : false;
    }

    protected function setAdditionalInfoAttribute($value)
    {
        $this->attributes['additional_info'] = json_encode($value);
    }
}
