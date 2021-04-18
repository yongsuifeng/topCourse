<?php

namespace App\Models;

use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\RefreshesPermissionCache;
use DB;

class Role extends Model
{
    use HasPermissions;
    use RefreshesPermissionCache;

    protected $fillable = ['name', 'guard_name', 'description'];

    public function storeAction($input)
    {
        $input['guard_name'] = 'web';
        try {
            $this->fill($input);
            $this->save();
            return $this->baseSucceed([], '操作成功');
        } catch (\Exception $e) {
            return $this->baseFailed('内部错误');
        }
    }

    public function updateAction($input)
    {
        try {
            $this->fill($input)->save();
            return $this->baseSucceed([], '操作成功');
        } catch (\Exception $e) {
            return $this->baseFailed('内部错误');
        }
    }

    public function destroyAction()
    {
        DB::beginTransaction();
        try {
            $this->delete();
            $this->syncPermissions([]);
            DB::commit();
            return $this->baseSucceed([], '角色删除成功');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->baseFailed('内部错误');
        }
    }
}
