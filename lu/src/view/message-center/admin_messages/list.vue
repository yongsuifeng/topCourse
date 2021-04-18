<template>
  <div>
    <div class="ivu-mt ivu-card ivu-card-dis-hover">
      <Card>
        <Form ref="tableSearchForm" :model="searchForm" inline :label-width="80">
          <Row>
            <Col>
              <FormItem label="方式" prop="sendByMyself_or_beloneMe">
                <Select v-model="searchForm.sendByMyself_or_beloneMe" placeholder="请选择"
                        @on-change="getTableDataExcute(feeds.current_page)">
                  <Option value="send_by_myself" key="send_by_myself">我发送的</Option>
                  <Option value="belone_me" key="belone_me">发给我的</Option>
                </Select>
              </FormItem>
              <FormItem label="消息类型" prop="message_type">
                <Select v-model="searchForm.message_type" placeholder="请选择">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.message_type" :value="key" :key="key">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="是否已读" prop="is_read">
                <Select v-model="searchForm.is_read" placeholder="状态">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.is_read" :value="key" :key="key">{{ item }}</Option>
                </Select>
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
          <Col :xs="6" :lg="2">
            <Button type="success" icon="plus" @click="addBtn()">发消息</Button>
          </Col>
          <Col :xs="0" :lg="2" class="hidden-mobile" v-if="canOpMessage">
            <Poptip confirm placement="bottom" title="确认要删除选中的数据?" @on-ok="batchDestroyExcute(selectIds)" ok-text="确认"
                    cancel-text="点错了">
              <Button type="error" :loading="loadingBatchDestroy">
                <span v-if="!loadingBatchDestroy">删除</span>
                <span v-else>删除中...</span>
              </Button>
            </Poptip>
          </Col>
          <Col :xs="0" :lg="2" class="hidden-mobile" v-if="canOpMessage">
            <Poptip confirm placement="bottom" title="确认要把所有消息置为已读?" @on-ok="readAllExcute()" ok-text="确认"
                    cancel-text="点错了">
              <Button type="primary">一键已读</Button>
            </Poptip>
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
          <Table class="no-border-table" :columns="columns" :data="feeds.data" @on-sort-change='onSortChange'
                 @on-selection-change='onSelectionChange'>

            <template slot-scope="{ row, index }" slot="recive_user">
              {{ row.admin_user.real_name }}
            </template>
            <template slot-scope="{ row, index }" slot="send_user">
              {{ row.user.real_name }}
            </template>
            <template slot-scope="{ row, index }" slot="message_type">
              {{ tableStatus.message_type[row.message_type] }}
            </template>
            <template slot-scope="{ row, index }" slot="is_read">
              {{ tableStatus.is_read[row.is_read] }}
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <a class="color-primary margin-right-5" type="text" v-if="row.is_read === 'F'"
                 @click="readOneExcute(row,index)">标为已读
              </a>
              <Divider type="vertical"/>
              <Dropdown :transfer=true v-if="isHasRoleToAccess(['Founder', 'Developer'])" trigger="click"
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
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="feeds.total" :current="feeds.current_page" :page-size="feeds.per_page" class="paging"
                    show-elevator show-total show-sizer @on-change="handleOnPageChange"
                    @on-page-size-change='onPageSizeChange'></Page>
            </div>
          </div>
        </Row>
      </Card>
    </div>

    <add-component v-if='addModal.show' :tableStatus_message_type="tableStatus.message_type"
                   @on-add-modal-success='getTableDataExcute(feeds.current_page)'
                   @on-add-modal-hide="addModalHide"></add-component>
    <show-info v-if='showInfoModal.show' :info='showInfoModal.info' @show-modal-close="showModalClose"></show-info>
  </div>
</template>

<script>
import AddComponent from './components/send-message'
import ShowInfo from './components/show-info'
import { Modal } from 'view-design'

import {
  getTableData,
  readOne,
  readAll,
  destroy,
  batchDestroy
} from '@/api/admin_message'
import {
  getTableStatus
} from '@/api/common'
import {
  oneOf
} from '@/libs/tools'

export default {
  components: {
    AddComponent,
    ShowInfo
  },
  data () {
    return {
      searchForm: {
        order_by: 'created_at,desc',
        sendByMyself_or_beloneMe: 'belone_me',
        message_type: '',
        is_read: ''
      },
      notRealySortKey: [],
      tableLoading: false,
      loadingBatchDestroy: false,
      selectIds: '',
      tableStatus: {
        message_type: [],
        is_read: [],
        is_alert_at_home: []
      },
      feeds: {
        data: [],
        total: 0,
        current_page: 1,
        per_page: 10
      },
      addModal: {
        show: false
      },
      showInfoModal: {
        show: false,
        info: ''
      },
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: 'ID',
        key: 'id',
        sortable: 'customer',
        minWidth: 100
      },
      {
        title: '标题',
        key: 'title',
        minWidth: 100
      }, {
        title: '接收人',
        minWidth: 80,
        slot: 'recive_user'
      }, {
        title: '发送人',
        minWidth: 80,
        slot: 'send_user'
      },
      {
        title: '消息类型',
        minWidth: 100,
        slot: 'message_type'
      }, {
        title: '是否已读',
        minWidth: 80,
        slot: 'is_read'
      }, {
        title: '创建时间',
        key: 'created_at',
        minWidth: 150
      },
      {
        title: '更新录时间',
        key: 'updated_at',
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
  computed: {
    canOpMessage () {
      return this.searchForm.sendByMyself_or_beloneMe === 'belone_me'
    }
  },
  created () {
    let t = this
    t.getTableStatusExcute('admin_messages')
  },
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
        t.tableStatus.message_type = res.data.message_type
        t.tableStatus.is_read = res.data.is_read
        t.tableStatus.is_alert_at_home = res.data.is_alert_at_home
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
    onSelectionChange: function (selection) {
      this.selectIds = ''
      for (let index in selection) {
        this.selectIds += ',' + selection[index].id
      }
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
    addBtn () {
      this.addModal.show = true
    },
    addModalHide () {
      this.addModal.show = false
    },
    batchDestroyExcute (ids) {
      if (!ids) {
        this.$Notice.error({
          title: '出错了',
          desc: '请先选择要操作的项'
        })
        return false
      }
      let t = this
      t.loadingBatchDestroy = true
      batchDestroy(ids).then(res => {
        t.getTableDataExcute(t.feeds.current_page)
        t.loadingBatchDestroy = false
      })
    },
    tableButtonShowInfo (row, index) {
      this.showInfoModal.show = true
      this.showInfoModal.info = row
    },
    showModalClose () {
      this.showInfoModal.show = false
    },
    readAllExcute () {
      let t = this
      if (t.feeds.data.length < 1) {
        this.$Notice.error({
          title: '出错了',
          desc: '没有消息'
        })
        return false
      }

      readAll().then(res => {
        t.getTableDataExcute(t.feeds.current_page)
      })
    },
    readOneExcute (row, index) {
      let t = this
      readOne(row.id).then(res => {
        t.getTableDataExcute(t.feeds.current_page)
      })
    }
  }
}
</script>
