<template>
  <div>
    <div class="ivu-mt ivu-card ivu-card-dis-hover">
      <Card>
        <Form ref="tableSearchForm" :model="searchForm" inline :label-width="90">
          <Row>
            <Col>
              <FormItem label="择协议分类" prop="agree_type">
                <Select v-model="searchForm.agree_type" filterable placeholder="请选">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.agree_type" :key="key" :value="item">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="状态" prop="enable">
                <Select v-model="searchForm.enable" placeholder="请选择">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.enable" :value="key" :key="key">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="协议名称" prop="name">
                <Input icon="search" placeholder="请输入协议名称搜索..." v-model="searchForm.name"></Input>
              </FormItem>
            </Col>
            <Col class="text-right">
              <FormItem class="right-float">
                <Button class="margin-right-10" type="primary" @click="getTableDataExcute(1)">{{ $t('queryBtn') }}
                </Button>
                <Button type="default" @click="handleReset('tableSearchForm')">{{ $t('resetBtn') }}</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row :gutter="24">
          <Col :xs="5" :lg="1">
            <Button type="success" icon="plus" @click="addBtn()">{{ $t('add') }}</Button>
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
            <template slot-scope="{ row, index }" slot="agree_type">
              {{ tableStatus.agree_type[row.agree_type] }}
            </template>
            <template slot-scope="{ row, index }" slot="enable">
              <iSwitch :slot="'open'" type='primary' :value="row.enable === 'T'"
                       @on-change="enableOrDisableExcute(row)"></iSwitch>
            </template>
            <template slot-scope="{ row, index }" slot="opuser">
              {{ row.user.real_name }}
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <a class="color-primary margin-right-5" type="text"
                 @click="tableButtonEdit(row,index)">{{ $t('edit') }}
              </a>
              <Divider type="vertical"/>
              <Dropdown :transfer=true  trigger="click"
                        @on-click="tableButtonMoreAction($event,row,index)">
                <span>更多</span>
                <Icon :size="18" type="md-arrow-dropdown"></Icon>
                <DropdownMenu slot="list">
                  <DropdownItem name="show_info">{{ $t('show_info') }}</DropdownItem>
                  <DropdownItem name="destroy">{{ $t('destroy')}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </template>
          </Table>
        </Row>
      </Card>
    </div>

    <add-component v-if='addModal.show' :agreeTypeList="tableStatus.agree_type"
                   @on-add-modal-success='getTableDataExcute(feeds.current_page)'
                   @on-add-modal-hide="addModalHide"></add-component>
    <edit-component v-if='editModal.show' :agreeTypeList="tableStatus.agree_type" :modal-id='editModal.id'
                    @on-edit-modal-success='getTableDataExcute(feeds.current_page)'
                    @on-edit-modal-hide="editModalHide"></edit-component>
    <show-info v-if='showInfoModal.show' :info='showInfoModal.info' @show-modal-close="showModalClose"></show-info>
  </div>
</template>

<script>
import {
  getTableData,
  enableOrDisable,
  destroy
} from '@/api/user_agreement'
import {
  getConfigFileData,
  getTableStatus
} from '@/api/common'

import AddComponent from './components/add'
import EditComponent from './components/edit'
import ShowInfo from './components/show-info'
import { Modal } from 'view-design'

import {
  oneOf
} from '@/libs/tools'

export default {
  components: {
    AddComponent,
    EditComponent,
    ShowInfo
  },
  data () {
    return {
      searchForm: {
        order_by: 'created_at,desc',
        agree_type: '',
        name: '',
        enable: ''
      },
      notRealySortKey: [],
      tableLoading: false,
      tableStatus: {
        agree_type: [],
        enable: []
      },
      feeds: {
        data: [],
        total: 0,
        current_page: 1,
        per_page: 10
      },
      addBtn () {
        this.addModal.show = true
      },
      addModal: {
        show: false
      },
      editModal: {
        show: false,
        id: 0
      },
      showInfoModal: {
        show: false,
        info: ''
      },
      columns: [{
        title: 'ID',
        key: 'id',
        sortable: 'customer',
        minWidth: 100
      },
      {
        title: '名称',
        key: 'name',
        minWidth: 80
      },
      {
        title: '操作人',
        minWidth: 80,
        slot: 'opuser'
      },
      {
        title: '分类',
        minWidth: 90,
        slot: 'agree_type'
      },
      {
        title: '启用状态',
        key: 'enable',
        minWidth: 50,
        slot: 'enable'
      },
      {
        title: '描述',
        key: 'description',
        tooltip: true,
        minWidth: 100
      },
      {
        title: '创建时间',
        key: 'created_at',
        sortable: 'customer',
        minWidth: 150
      }, {
        title: '修改时间',
        key: 'updated_at',
        sortable: true,
        minWidth: 150
      },
      {
        title: '操作',
        minWidth: 100,
        slot: 'action'
      }
      ]

    }
  },
  created () {
    let t = this
    t.getConfigFileDataExcute('lu.userAgreementTable_agree_type')
    t.getTableStatusExcute('user_agreements/enable')
  },
  computed: {},
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    tableButtonMoreAction (name, row, index) {
      switch (name) {
        case 'show_info':
          this.tableButtonShowInfo(row, index)
          break
        case 'destroy':
          this.tableButtonDestroyOk(row, index)
          break
      }
    },
    handleOnPageChange: function (to_page) {
      this.getTableDataExcute(to_page)
    },
    onPageSizeChange: function (per_page) {
      this.feeds.per_page = per_page
      this.getTableDataExcute(this.feeds.current_page)
    },
    getTableStatusExcute (params) {
      let t = this
      getTableStatus(params).then(res => {
        t.tableStatus.enable = res.data
        t.getTableDataExcute(t.feeds.current_page)
      })
    },
    getTableDataExcute (to_page) {
      let t = this
      t.tableLoading = true
      t.feeds.current_page = to_page
      getTableData(t.searchForm).then(res => {
        t.feeds.data = res.data
        t.tableLoading = false
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
    addModalHide () {
      this.addModal.show = false
    },
    editModalHide () {
      this.editModal.show = false
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
    enableOrDisableExcute: function (row, index, column) {
      let t = this
      enableOrDisable(row.id).then(res => {
        t.$Notice.success({
          title: res.message
        })
        t.getTableDataExcute(t.feeds.current_page)
      }).catch((err) => {
        t.getTableDataExcute(t.feeds.current_page)
      })
    },
    getConfigFileDataExcute (param) {
      let t = this
      getConfigFileData(param).then(res => {
        t.tableStatus.agree_type = res.data
      })
    },
    tableButtonShowInfo (row, index) {
      this.showInfoModal.show = true
      this.showInfoModal.info = row
    },
    showModalClose () {
      this.showInfoModal.show = false
    }
  }
}
</script>
