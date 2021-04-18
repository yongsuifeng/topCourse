<?php

namespace App\Traits;

use Illuminate\Support\Facades\Redis;

trait RedisTrait
{
    protected $redisKeyType = [
        'demo' => [
            'name' => 'demo_', // 示例_[xxx]
            'expiry_time' => 3600 * 365, // 过期时间[秒]
            'default_value' => ''
        ],
        'demo_list' => [
            'name' => 'lst_', // 示例 olst_   桩号_枪号
            'expiry_time' => 60 * 20,
            'default_value' => [
                0 => '{"url":"http://baidu.com","data":{"id":1,"value":2},"next_notify_at":1543077027,"current_num":3}',
                1 => '{"url":"http://baidu.com","data":{"id":1,"value":2},"next_notify_at":1543077027,"current_num":3}',
            ]
        ],
    ];

    protected function setRedis($redisKeyType, $key, $value)
    {
        Redis::set($this->redisKeyType[$redisKeyType]['name'] . $key, json_encode($value));
    }

    protected function setExRedis($redisKeyType, $key, $value, $expiry_time = 0)
    {
        $expiry_time = $expiry_time > 0 ? $expiry_time: $this->redisKeyType[$redisKeyType]['expiry_time'];
        Redis::setex($this->redisKeyType[$redisKeyType]['name'] . $key, $expiry_time, json_encode($value));
    }

    protected function keys($key)
    {
        return Redis::keys($key);
    }

    // 键存在就仅修改值，不修改过期时间，键不存在就新建一个键
    protected function autSetRange($redisKeyType, $key, $value)
    {
        $realKey = $this->redisKeyType[$redisKeyType]['name'] . $key;
        $exsit = Redis::exists($realKey);
        if ($exsit) {
            Redis::setRange($realKey, json_encode($value));
        } else {
            $expiry_time = $this->redisKeyType[$redisKeyType]['expiry_time'];
            Redis::setex($realKey, $expiry_time, json_encode($value));
        }
    }

    // 从第0个位置开始覆盖原来的值
    protected function setRange($redisKeyType, $key, $value)
    {
        return Redis::setrange($this->redisKeyType[$redisKeyType]['name'] . $key, 0,json_encode($value));
    }

    protected function exists($redisKeyType, $key)
    {
        return Redis::exists($this->redisKeyType[$redisKeyType]['name'] . $key);
    }

    protected function getRedis($redisKeyType, $key)
    {
        $reidsKey = $this->redisKeyType[$redisKeyType];
        return json_decode(Redis::get($reidsKey['name'] . $key), true) ?: $reidsKey['default_value'];
    }

    public function setRedisListByRpush($redisKeyType, $key, $data)
    {
        Redis::rpush($this->redisKeyType[$redisKeyType]['name'] . $key, json_encode($data));
    }

    public function getRedisListByLrange($redisKeyType, $key, $max_get_num = 100000000000, $start = 0)
    {
        return Redis::lrange($this->redisKeyType[$redisKeyType]['name'] . $key, $start, $max_get_num);
    }

    public function getRedisListByLpop($redisKeyType, $key)
    {
        return Redis::lpop($this->redisKeyType[$redisKeyType]['name'] . $key);
    }

}
