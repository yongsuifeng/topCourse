<template>
<div>
  <div class="ivu-mt ivu-card ivu-card-dis-hover">
    <Card>
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
    <Table class="no-border-table" editable  :columns="columns" :data="dataList" @on-sort-change='onSortChange'>
      <template slot-scope="{ row, index }" slot="weight">
        <table-edit table="carousels" column="weight" :id="row.id" :value="row.weight" :index="index"></table-edit>
      </template>

      <template slot-scope="{ row, index }" slot="cover_image">
        <div class="text-center">
          <img v-if="row.cover_image" class="fancybox" :href="row.cover_image" :src="row.cover_image" alt="封面" style="max-height:100px">
          <span v-else></span>
        </div>
      </template>

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

  <add-component v-if='addModal.show' @on-add-modal-success='getTableDataExcute' @on-add-modal-hide="addModalHide"></add-component>
  <edit-component v-if='editModal.show' :modal-id='editModal.id' @on-edit-modal-success='getTableDataExcute' @on-edit-modal-hide="editModalHide"> </edit-component>

</div>
</template>

<script>
import AddComponent from './components/add'
import EditComponent from './components/edit'
import TableEdit from '_c/common/table-edit.vue'
import { Modal } from 'view-design'

import {
  getTableData,
  destroy
} from '@/api/carousel'

export default {
  components: {
    AddComponent,
    EditComponent,
    TableEdit
  },
  data () {
    return {
      searchForm: {
        order_by: 'id,desc'
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
      },
      {
        title: '标题',
        key: 'title',
        minWidth: 100
      }, {
        title: '图片',
        minWidth: 100,
        slot: 'cover_image'
      }, {
        title: '描述',
        key: 'description',
        minWidth: 100
      }, {
        title: '排序',
        key: 'weight',
        minWidth: 50,
        sortable: 'customer',
        slot: 'weight'
      },
      {
        title: '创建时间',
        key: 'created_at',
        minWidth: 150
      },
      {
        title: '更新时间',
        key: 'created_at',
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
    t.getTableDataExcute()
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getTableDataExcute () {
      let t = this
      t.tableLoading = true
      getTableData(t.searchForm).then(res => {
        const response_data = res.data
        t.dataList = response_data
        t.tableLoading = false
        t.globalFancybox()
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
