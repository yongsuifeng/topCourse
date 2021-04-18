<template>
  <div id="privileges-users-list">
    <div class="ivu-mt ivu-card ivu-card-dis-hover">
      <Card>
        <Form ref="tableSearchForm" :model="searchForm" inline :label-width="80">
          <Row>
            <Col>
              <FormItem label="权限名" prop="name">
                <Input icon="search" placeholder="请输入权限名称..." v-model="searchForm.name"/>
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
          <Col :xs="8" :lg="16">
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

          <Table class="no-border-table" :columns="columns" :data="dataList" @on-sort-change='onSortChange'>
            <template slot-scope="{ row, index }" slot="action">
              <a class="color-primary margin-right-5" type="text"
                 @click="tableButtonEdit(row,index)">{{$t('edit')}} </a>
              <Divider type="vertical"/>
              <a class="color-warning margin-right-5" type="text"
                 @click="tableButtonDestroyOk(row,index)">{{$t('destroy')}} </a>
            </template>
          </Table>

        </Row>
      </Card>
    </div>

    <add-component v-if='addModal.show' @on-add-modal-success='getTableDataExcute'
                   @on-add-modal-hide="addModalHide"></add-component>
    <edit-component v-if='editModal.show' :modal-id='editModal.id' @on-edit-modal-success='getTableDataExcute'
                    @on-edit-modal-hide="editModalHide"></edit-component>

  </div>
</template>

<script>
import AddComponent from './components/add'
import EditComponent from './components/edit'
import { Modal } from 'view-design'

import {
  getTableData,
  destroy
} from '@/api/permission'

export default {
  components: {
    AddComponent,
    EditComponent
  },
  data () {
    return {
      searchForm: {
        order_by: 'id,desc',
        name: ''
      },
      notRealySortKey: [],
      tableLoading: true,
      dataList: [],
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
      }, {
        title: '权限名称',
        key: 'name',
        minWidth: 150
      }, {
        title: '看守器',
        key: 'guard_name',
        minWidth: 150
      }, {
        title: '权限描述',
        key: 'description',
        minWidth: 150
      }, {
        title: '创建时间',
        key: 'created_at',
        minWidth: 150
      }, {
        title: '更新时间',
        key: 'created_at',
        minWidth: 150
      }, {
        title: '操作',
        minWidth: 200,
        slot: 'action'
      }]
    }
  },
  mounted () {
    this.getTableDataExcute()
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getTableDataExcute () {
      let t = this
      t.loading = true
      getTableData(t.searchForm).then(res => {
        const response_data = res.data
        t.dataList = response_data
        t.tableLoading = false
      }, function (error) {
        t.tableLoading = false
      })
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
            t.dataList.splice(index, 1)
      t.$Message.info({
              content: res.message
            })
          })
        },
        onCancel: () => {
        }
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
    addBtn () {
      this.addModal.show = true
    },
    addModalHide () {
      this.addModal.show = false
    },
    editModalHide () {
      this.editModal.show = false
    }
  }
}
</script>
