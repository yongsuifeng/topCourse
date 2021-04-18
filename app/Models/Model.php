<?php

namespace App\Models;

use App\Http\Controllers\Api\Traits\BaseResponseTrait;
use App\Models\Traits\ExcuteTrait;
use App\Models\Traits\ScopeTrait;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel
{
    use ScopeTrait, ExcuteTrait,BaseResponseTrait;

    /**
     * 为数组 / JSON 序列化准备日期。
     *
     * @param  \DateTimeInterface  $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }
}
