<template>
  <div>
    <div class="ivu-mt ivu-card ivu-card-dis-hover">
      <Card>
        <Form ref="tableSearchForm" :model="searchForm" inline :label-width="90">
          <Row>
            <Col>
              <FormItem label="发送时间">
                <DatePicker prop="start_time" @on-change="searchTimeStart" type="datetime" format="yyyy-MM-dd HH:mm"
                            placeholder="开始时间"></DatePicker>
                -
                <DatePicker prop="end_time" @on-change="searchTimeEnd" type="datetime" format="yyyy-MM-dd HH:mm"
                            placeholder="结束时间"></DatePicker>
              </FormItem>
              <FormItem label="日志类型" prop="type">
                <Select v-model="searchForm.type" placeholder="请选择">
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in tableStatus.type" :value="key" :key="key">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="模型表" prop="table_name">
                <Select v-model="searchForm.table_name" placeholder="请选择" filterable>
                  <Option value="" key="">全部</Option>
                  <Option v-for="(item,key) in allTableList" :value="key" :key="key">{{ item.table_name_cn }}</Option>
                </Select>
              </FormItem>
              <FormItem label="操作人姓名" prop="real_name">
                <Input icon="search" placeholder="请输入操作人真实姓名..." v-model="searchForm.real_name"></Input>
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
          <Col :xs="4" :lg="2" class="hidden-mobile">
            <!-- <a :href='exportExcel' target="_blank"><Button icon="md-download">导出文件</Button></a> -->
            <Button @click="exportExcelLogExcute" icon="md-download">导出文件</Button>
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

            <template slot-scope="{ row, index }" slot="user_id">
              <div class="text-center">
                {{ row.user.real_name }}
              </div>
            </template>

            <template slot-scope="{ row, index }" slot="table_name">
              {{ tableStatus.type[row.type] }} -{{ allTableList[row.table_name].table_name_cn }}
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <a class="color-primary margin-right-5" type="text"
                 @click="tableButtonShowInfo(row,index)">{{ $t('show_info') }}
              </a>
              <Divider type="vertical"/>
              <a class="color-warning margin-right-5" type="text" @click="tableButtonDestroyOk(row,index)">{{$t('destroy')}}
              </a>
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

    <show-info v-if='showInfoModal.show' :info='showInfoModal.info' @show-modal-close="showModalClose"></show-info>
  </div>
</template>

<script>
import ShowInfo from './components/show-info'

import {
  getTableData,
  destroy
} from '@/api/log'

import {
  getAllTables
} from '@/api/table'
import {
  exportExcelLog
} from '@/api/excel_url'

import {
  getTableStatus
} from '@/api/common'

import { downloadFilePassUrl, oneOf } from '@/libs/tools'
import { Modal } from 'view-design'

export default {
  components: {
    ShowInfo
  },
  data () {
    return {
      searchForm: {
        order_by: 'created_at,desc',
        table_name: '',
        type: '',
        real_name: '', // 操作人真实姓名
        start_time: '',
        end_time: ''
      },
      allTableList: [],
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
      showInfoModal: {
        show: false,
        info: ''
      },
      columns: [
        {
          title: '操作人',
          minWidth: 100,
          slot: 'user_id'
        },
        {
          title: '描述',
          key: 'description',
          tooltip: true
        },
        {
          title: '模型表',
          key: '',
          width: 80,
          slot: 'table_name'
        },
        {
          title: '操作人ip',
          key: 'ip',
          minWidth: 150
        },
        {
          title: '创建时间',
          key: 'created_at',
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
    t.getTableStatusExcute('logs/type')
    t.getAllTablesExcute()
  },
  computed: {
    // exportExcel() {
    //   return exportExcelLogUrl + '?search_data=' + JSON.stringify(this.searchForm)
    // }
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
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
        t.tableStatus.type = res.data
        t.getTableDataExcute(t.feeds.current_page)
      })
    },
    getAllTablesExcute (params) {
      let t = this
      getAllTables('').then(res => {
        t.allTableList = res.data
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
    tableButtonShowInfo (row, index) {
      this.showInfoModal.show = true
      this.showInfoModal.info = row
    },
    showModalClose () {
      this.showInfoModal.show = false
    },
    searchTimeStart: function (value, dateType) {
      this.searchForm.start_time = value
    },
    searchTimeEnd: function (value, dateType) {
      this.searchForm.end_time = value
    },
    exportExcelLogExcute () {
      let t = this
      t.tableLoading = true
      exportExcelLog().then(res => {
        let resData = res.data
        downloadFilePassUrl(resData.url)
        t.tableLoading = false
      }, function (error) {
        t.tableLoading = false
      })
    }
  }
}
</script>
