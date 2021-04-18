<template>
  <div>
    <div class="ivu-mt ivu-card ivu-card-dis-hover">
      <Card>
        <Form ref="tableSearchForm" :model="searchForm" inline :label-width="90">
          <Row>
            <Col>
              <FormItem label="配置分组" prop="group">
                <Select v-model="searchForm.group" placeholder="请选择">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.config_group" :value="key" :key="key">{{ item.title }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="状态" prop="enable">
                <Select v-model="searchForm.enable" placeholder="请选择">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.enable" :value="key" :key="key">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="标识" prop="table_name_or_flag">
                <Input icon="search" placeholder="请输入标识或标题搜索..." v-model="searchForm.table_name_or_flag"></Input>
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
          <Col :xs="2" :lg="2">
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

          <Table class="no-border-table" size='small' :columns="columns" :data="feeds.data"
                 @on-sort-change='onSortChange'>
            <template slot-scope="{ row, index }" slot="config_group">
              {{ tableStatus.config_group[row.config_group]['title'] }}
            </template>
            <template slot-scope="{ row, index }" slot="enable">
              <iSwitch :slot="'open'" type='primary' :value="row.enable === 'T'"
                       @on-change="switchChange(row,index)"></iSwitch>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <a class="color-primary margin-right-5" type="text"
                 @click="tableButtonEdit(row,index)">{{ $t('edit') }}
              </a>
              <Divider type="vertical"/>
              <a class="color-warning margin-right-5" type="text"
                 @click="tableButtonDestroyOk(row,index)">{{ $t('destroy') }}
              </a>
            </template>
          </Table>
        </Row>
      </Card>
    </div>

    <add-component :config_group="tableStatus.config_group" v-if='addModal.show'
                   @on-add-modal-success='getTableDataExcute(feeds.current_page)'
                   @on-add-modal-hide="addModalHide"></add-component>
    <edit-component :config_group="tableStatus.config_group" v-if='editModal.show' :modal-id='editModal.id'
                    @on-edit-modal-success='getTableDataExcute(feeds.current_page)'
                    @on-edit-modal-hide="editModalHide"></edit-component>
  </div>
</template>

<script>
import {
  getTableData,
  destroy,
  getGroup
} from '@/api/system_config'
import {
  oneOf
} from '@/libs/tools'

import {
  switchEnable
} from '@/api/common'

import AddComponent from './components/add'
import EditComponent from './components/edit'
import InputHelper from '_c/common/input-helper'
import { Modal } from 'view-design'

export default {
  components: {
    AddComponent,
    EditComponent,
    InputHelper
  },
  data () {
    return {
      searchForm: {
        order_by: 'created_at,desc',
        table_name_or_flag: '',
        enable: '',
        group: ''
      },
      notRealySortKey: [],
      tableStatus: {
        enable: [],
        config_group: []
      },
      tableLoading: false,
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
      columns: [{
        title: 'ID',
        key: 'id',
        sortable: 'customer',
        minWidth: 100
      },
      {
        title: '配置分组',
        minWidth: 60,
        slot: 'config_group'
      },
      {
        title: '配置标识',
        key: 'flag',
        minWidth: 100
      },
      {
        title: '配置标题',
        key: 'title',
        minWidth: 100
      }, {
        title: '配置值',
        key: 'value',
        minWidth: 150,
        tooltip: true
      }, {
        title: '启用状态',
        key: 'enable',
        minWidth: 80,
        slot: 'enable'
      },
      {
        title: '创建时间',
        key: 'created_at',
        sortable: true,
        minWidth: 150
      }, {
        title: '修改时间',
        key: 'updated_at',
        sortable: true,
        minWidth: 150
      }, {
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
    t.getGroupExcute()
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getGroupExcute () {
      let t = this
      getGroup(t.searchForm).then(res => {
        const response_data = res.data
        t.tableStatus.config_group = response_data.config_group
        t.tableStatus.enable = response_data.enable

        t.getTableDataExcute(t.feeds.current_page)
      }, function (error) {
      })
    },
    getTableDataExcute (to_page) {
      let t = this
      t.tableLoading = true
      t.feeds.current_page = to_page
      getTableData(to_page, t.feeds.per_page, t.searchForm).then(res => {
        t.feeds.data = res.data
        t.feeds.total = 0
        t.tableLoading = false
      }, function (error) {
        t.tableLoading = false
      })
    },
    addModalHide () {
      this.addModal.show = false
    },
    editModalHide () {
      this.editModal.show = false
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
    switchChange: function (row, index) {
      let t = this
      let new_status = 'T'
      if (t.feeds.data[index].enable === 'T') {
        new_status = 'F'
      }
      switchEnable(t.feeds.data[index].id, 'system_configs', new_status).then(res => {
        t.feeds.data[index].enable = new_status
        t.$Notice.success({
          title: res.message
        })
      }).catch((err) => {
        t.getTableDataExcute(t.feeds.current_page)
      })
    }
  }
}
</script>
