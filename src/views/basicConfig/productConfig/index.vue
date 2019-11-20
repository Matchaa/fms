<!--产品配置-->
<template>
  <div>
    <el-form class="form"
      :inline="true">
      <el-form-item label="产品名称">
        <el-input v-model="form.name"
          placeholder="请输入产品名称"
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
      @success="searchTableData"></add-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      },

      tableHeader: [
        {
          title: '序号',
          name: 'num',
          width: 80
        },
        {
          title: '产品名称',
          name: 'name'
        },
        {
          title: '产品种类',
          name: 'type'
        },
        {
          title: '单位',
          name: 'unit'
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
        form: { name }
      } = this
      this.$db
        .getData('PRODUCT_DATA', {
          pageSize: pageSize,
          pageIndex: currentPage,
          search: [{ name: 'name', value: name }]
        })
        .then(res => {
          this.tableData = res.data.map((item, index) => {
            item.num = pageSize * (currentPage - 1) + index + 1
            return item
          })
          this.total = res.total
        })
    },
    onAddClick() {
      this.$refs.addDialog.detail = {}
      this.$refs.addDialog.show = true
    },
    onEditClick(row) {
      this.$refs.addDialog.detail = row
      this.$refs.addDialog.show = true
    },
    onDeleteClick(row) {
      this.$db.deleteData('PRODUCT_DATA', row.id).then(() => {
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
