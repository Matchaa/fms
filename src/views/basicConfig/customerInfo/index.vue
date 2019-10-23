<!--客户信息-->
<template>
  <div>
    <el-form class="form"
      :inline="true">
      <el-form-item label="客户名称">
        <el-input v-model="form.name"
          placeholder="请输入客户名称"
          @change="searchTableData"></el-input>
      </el-form-item>
      <el-form-item label="客户号码">
        <el-input v-model="form.phone"
          placeholder="请输入客户号码"
          @change="searchTableData"></el-input>
      </el-form-item>
      <el-button type="primary"
        @click="onAddClick">新增</el-button>

    </el-form>
    <el-table class="table"
      :data="tableData"
      height="500px">
      <el-table-column v-for="header in tableHeader"
        :key="header.name"
        :prop="header.name"
        :label="header.title"
        :width="header.width||''">
        <template slot-scope="scope">
          <span>{{scope.row[header.name]||'--'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px"
        label="操作"
        fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
            @click="onEditClick(scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="onDeleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page="currentPage"
      :page-sizes="[50, 100, 200, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <add-dialog ref="addDialog"
      @success="reFindTableData"></add-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: ''
      },

      tableHeader: [
        {
          title: '序号',
          name: 'num',
          width: 80
        },
        {
          title: '客户名称',
          name: 'name'
        },
        {
          title: '联系电话',
          name: 'phone'
        },
        {
          title: '客户地址',
          name: 'address',
          width: 250
        },
        {
          title: '传真',
          name: 'fax'
        }
      ],
      tableData: [
        // {
        //   name: '章三',
        //   address: '浙江省余姚市',
        //   phone: 1585883882,
        //   fax: '4203-374832'
        // }
      ],
      currentPage: 1,
      pageSize: 50,
      total: 0
    }
  },

  computed: {},

  mounted() {
    this.reFindTableData()
  },

  methods: {
    searchTableData() {
      this.currentPage = 1
      this.reFindTableData()
    },
    reFindTableData() {
      const {
        pageSize,
        currentPage,
        form: { name, phone }
      } = this
      this.$db
        .getData(
          {
            name: 'CUSTOMER_DATA',
            key: 'id'
          },
          {
            pageSize: pageSize,
            pageIndex: currentPage,
            search: [
              { name: 'name', value: name },
              { name: 'phone', value: phone }
            ]
          }
        )
        .then(res => {
          this.tableData = res.map((item, index) => {
            item.num = pageSize * (currentPage - 1) + index + 1
            return item
          })
          // .filter(
          //   (item, index) =>
          //     index >= pageSize * (currentPage - 1) &&
          //     index < pageSize * currentPage &&
          //     (name === '' || name === item.name) &&
          //     (phone === '' || phone === item.phone)
          // )
          this.total = this.tableData.length
        })
    },
    onAddClick() {
      this.$refs.addDialog.show = true
      this.$refs.addDialog.detail = {}
    },
    onEditClick(row) {
      this.$refs.addDialog.show = true
      this.$refs.addDialog.detail = row
    },
    onDeleteClick(row) {
      this.$db.deleteData('CUSTOMER_DATA', row.id).then(() => {
        this.reFindTableData()
      })
    },
    onSizeChange() {
      this.reFindTableData()
    },
    onCurrentChange(value) {
      this.currentPage = value
      this.reFindTableData()
    }
  },

  components: {
    addDialog: () => import('./components/addDialog')
  }
}
</script>
<style lang='scss' scoped>
.form {
  * {
    margin-bottom: 22px;
  }
}
.page {
  margin-top: 20px;
  float: right;
}
</style>
