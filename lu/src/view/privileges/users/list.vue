<template>
  <div>
    <div class="ivu-mt ivu-card ivu-card-dis-hover">
      <Card>
        <Form ref="tableSearchForm" :model="searchForm" inline :label-width="150">
          <Row>
            <Col>
              <FormItem label="是否能登录后台" prop="is_admin">
                <Select v-model="searchForm.is_admin" placeholder="请选择" style="width:100px">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.is_admin" :value="key" :key="key">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="邮箱" prop="email">
                <Input placeholder="请输入邮箱搜索..." v-model="searchForm.email"></Input>
              </FormItem>
              <FormItem label="状态" prop="enable">
                <Select v-model="searchForm.enable" placeholder="请选择" style="width:100px">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.enable" :value="key" :key="key">{{ item }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col class="text-right">
              <FormItem class="right-float">
                <Button class="margin-right-10" type="primary" @click="getTableDataExcute(1)">{{ $t('queryBtn') }}
                </Button>
                <Button type="default" @click="handleReset('tableSearchForm')">{{ $t('resetBtn') }}</Button>
                <!--                <a class="ivu-ml-8"> 展开 <i class="ivu-icon ivu-icon-ios-arrow-down"></i></a>-->
                <!--                <a class="ivu-ml-8"> 收起 <i class="ivu-icon ivu-icon-ios-arrow-up"></i></a>-->
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Row :gutter="24">
          <Col :xs="7" :lg="11">
            <Button v-if="isHasRoleToAccess(['Founder', 'Maintainer'])" type="success" icon="plus" @click="addBtn()">{{
              $t('add') }}
            </Button>
          </Col>
        </Row>
        <br>

        <Row>
          <div class="demo-spin-container" v-if="tableLoading">
            <Spin fix>
              <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
              <div>{{ $t('table_loading') }}</div>
            </Spin>
          </div>
          <Table class="no-border-table" :columns="columns" :data="feeds.data" @on-sort-change='onSortChange'>

            <template slot-scope="{ row, index }" slot="avatar">
              <div class="text-center">
                <Avatar size="large" :src="row.avatar" v-if="row.avatar" class="fancybox" :href="row.avatar" title="头像"
                        alt="头像"></Avatar>
                <Avatar v-else size="large" style="color: #f56a00;background-color: #fde3cf">{{
                  row.real_name.substr(0,1)}}
                </Avatar>
              </div>
            </template>

            <template slot-scope="{ row, index }" slot="is_admin">
              <Tag v-if="row.is_admin === 'T'" :color="'green'">可登录</Tag>
              <Tag v-else :color="'red'">不可登录</Tag>
            </template>

            <template slot-scope="{ row, index }" slot="enable">
              <iSwitch :slot="'open'" type='primary' :value="row.enable === 'T'"
                       @on-change="switchChange(row,index)"></iSwitch>
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <a class="color-primary margin-right-5" v-if="isHasRoleToAccess(['Founder', 'Maintainer'])" type="text"
                 @click="tableButtonEdit(row,index)">{{ $t('edit') }}
              </a>
              <Divider type="vertical"/>
              <Dropdown :transfer=true v-if="isHasRoleToAccess(['Founder', 'Developer'])" trigger="click"
                        @on-click="tableButtonMoreAction($event,row,index)">
                <span>更多</span>
                <Icon :size="18" type="md-arrow-dropdown"></Icon>
                <DropdownMenu slot="list">
                  <DropdownItem name="role">{{ $t('role') }}</DropdownItem>
                  <DropdownItem name="destroy">{{ $t('destroy')}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </template>
          </Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="feeds.total" :current="feeds.current_page" :page-size="feeds.per_page" class="paging"
                    show-elevator show-total show-sizer @on-change="handleOnPageChange"
                    @on-page-size-change='onPageSizeChange'></Page>
            </div>
          </div>
        </Row>

        <Modal v-model="roleModal.show" :mask-closable=false width="1000">
          <h3 slot="header">分配角色</h3>
          <Transfer v-if="roleModal.show" :data="roleModal.allRoles" :target-keys="roleModal.hasRoles"
                    :render-format="renderFormat" :operations="['移除角色','添加角色']" :list-style="roleModal.listStyle"
                    filterable
                    @on-change="handleTransferChange">
          </Transfer>
          <div slot="footer">
            <Button type="text" @click="cancelRoleModal">取消</Button>
            <Button type="primary" @click="giveUserRoleExcute">保存</Button>
          </div>
        </Modal>

      </Card>
    </div>

    <add-component v-if='addModal.show' :tableStatus_is_admin="tableStatus.is_admin"
                   @on-add-modal-success='getTableDataExcute(feeds.current_page)'
                   @on-add-modal-hide="addModalHide"></add-component>
    <edit-component v-if='editModal.show' :tableStatus_is_admin="tableStatus.is_admin" :modal-id='editModal.id'
                    @on-edit-modal-success='getTableDataExcute(feeds.current_page)'
                    @on-edit-modal-hide="editModalHide"></edit-component>
  </div>
</template>

<script>
import AddComponent from './components/add'
import EditComponent from './components/edit'
import { Modal } from 'view-design'

import {
  getTableData,
  getUserRoles,
  giveUserRole,
  destroy
} from '@/api/user'

import {
  getAllRole
} from '@/api/role'

import {
  hasOneOf
} from '@/libs/tools'

import {
  getTableStatus,
  switchEnable
} from '@/api/common'

export default {
  components: {
    AddComponent,
    EditComponent
  },
  data () {
    return {
      searchForm: {
        order_by: 'created_at,desc',
        is_admin: '',
        enable: '',
        email: ''
      },
      notRealySortKey: [],
      tableLoading: false,
      tableStatus: {
        enable: [],
        is_admin: []
      },
      feeds: {
        data: [],
        total: 0,
        current_page: 1,
        per_page: 10
      },
      roleModal: {
        id: 0,
        allRoles: [],
        hasRoles: [],
        show: false,
        saveLoading: false,
        listStyle: {
          width: '400px',
          height: '600px'
        }
      },
      addModal: {
        show: false
      },
      editModal: {
        show: false,
        id: 0
      },
      columns: [{
        title: 'ID',
        key: 'id',
        sortable: 'customer',
        minWidth: 100
      },
      {
        title: '姓名',
        key: 'real_name',
        minWidth: 100
      },
      {
        title: '昵称',
        key: 'nickname',
        minWidth: 100
      },
      {
        title: '头像',
        key: '',
        width: 80,
        slot: 'avatar'
      },
      {
        title: '邮箱',
        key: 'email',
        minWidth: 150
      },
      {
        title: '后台权限',
        minWidth: 80,
        slot: 'is_admin'
      },
      {
        title: '启用状态',
        key: 'enable',
        minWidth: 80,
        slot: 'enable'
      },
      {
        title: '创建时间',
        key: 'created_at',
        minWidth: 150
      },
      {
        title: '最近登录时间',
        key: 'last_login_at',
        sortable: 'customer',
        minWidth: 150
      },
      {
        title: '操作',
        key: '',
        minWidth: 100,
        slot: 'action'
      }
      ]

    }
  },
  created () {
    let t = this
    t.getTableStatusExcute('users')
    t.getAllRoleExcute()
  },
  computed: {
    // isHasRoleToAccess (roleArray) {
    //   // ['Founder', 'Maintainer']
    //   return !!hasOneOf(roleArray, this.$store.state.user.access)
    // }
  },
  methods: {
    handleOnPageChange: function (to_page) {
      this.getTableDataExcute(to_page)
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    tableButtonMoreAction (name, row, index) {
      switch (name) {
        case 'role':
          this.tableButtonGiveUserRoles(row, index)
          break
        case 'destroy':
          this.tableButtonDestroyOk(row, index)
          break
      }
    },
    onPageSizeChange: function (per_page) {
      this.feeds.per_page = per_page
      this.getTableDataExcute(this.feeds.current_page)
    },
    getTableStatusExcute (params) {
      let t = this
      getTableStatus(params).then(res => {
        t.tableStatus.enable = res.data.enable
        t.tableStatus.is_admin = res.data.is_admin
        t.getTableDataExcute(t.feeds.current_page)
      })
    },
    getTableDataExcute (to_page) {
      let t = this
      t.tableLoading = true
      t.feeds.current_page = to_page
      getTableData(to_page, t.feeds.per_page, t.searchForm).then(res => {
        t.feeds.data = res.data
        t.feeds.total = res.meta.total
        t.tableLoading = false
        t.globalFancybox()
      }, function (error) {
        t.tableLoading = false
      })
    },
    onSortChange: function (data) {
      const order = data.column.key + ',' + data.order
      if (oneOf(data.column.key, this.notRealySortKey)) {

      } else {
        this.searchForm.order_by = order
        this.getTableDataExcute(this.feeds.current_page)
      }
    },
    tableButtonEdit (row, index) {
      this.editModal.show = true
      this.editModal.id = row.id
    },
    tableButtonDestroyOk (row, index) {
      let t = this
      Modal.confirm({
        title: '确定要删除id为 ' + row.id + ' 的数据吗?',
        onOk: () => {
          destroy(row.id).then(res => {
            t.feeds.data.splice(index, 1)
      t.$Message.info({
              content: res.message
            })
          })
        },
        onCancel: () => {
        }
      })
    },
    tableButtonGiveUserRoles (row, index) {
      let t = this
      getUserRoles(row.id).then(res => {
        this.roleModal.hasRoles = res.data
      })
      t.roleModal.show = true
      t.roleModal.id = row.id
    },

    switchChange: function (row, index) {
      let t = this
      let new_status = 'T'
      if (t.feeds.data[index].enable === 'T') {
        new_status = 'F'
      }
      switchEnable(t.feeds.data[index].id, 'users', new_status).then(res => {
        t.feeds.data[index].enable = new_status
        t.$Notice.success({
          title: res.message
        })
      }).catch((err) => {
        t.getTableDataExcute(t.feeds.current_page)
      })
    },
    addBtn () {
      this.addModal.show = true
    },
    addModalHide () {
      this.addModal.show = false
    },
    editModalHide () {
      this.editModal.show = false
    },
    getAllRoleExcute () {
      let t = this
      getAllRole().then(res => {
        t.roleModal.allRoles = res.data
      })
    },
    handleTransferChange (newTargetKeys) {
      this.roleModal.hasRoles = newTargetKeys
    },
    renderFormat (item) {
      return item.label + '「' + item.description + '」'
    },
    giveUserRoleExcute () {
      let t = this
      giveUserRole(t.roleModal.id, t.roleModal.hasRoles).then((res) => {
        t.$Notice.success({
          title: '操作成功',
          desc: res.message
        })
        t.roleModal.show = false
      })
    },
    cancelRoleModal () {
      let t = this
      t.roleModal.show = false
      t.roleModal.saveLoading = false
    },
    isHasRoleToAccess (roleArray) {
      // ['Founder', 'Maintainer']
      return !!hasOneOf(roleArray, this.$store.state.user.access)
    }

  }
}
</script>
