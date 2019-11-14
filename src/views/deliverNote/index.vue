<!--送货单-->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="送货单号">
        <el-input v-model="form.num"
          placeholder="请输入送货单号"
          @change="searchTableData"></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="form.name"
          placeholder="请输入客户名称"
          @change="searchTableData"></el-input>
      </el-form-item>
      <el-form-item label="送货时间">
        <el-date-picker v-model="form.date"
          type="date"
          placeholder="选择送货日期"
          @change="searchTableData">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="onAddClick">新增</el-button>
        <!-- <el-button @click="onPrintClick">打印</el-button>
        <el-button @click="onPrintPreviewClick">打印预览</el-button> -->
      </el-form-item>
    </el-form>
    <el-table class="table"
      :data="tableData"
      height="500px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table class="expand-table"
            :data="scope.row.productData">
            <el-table-column v-for="header in expandTableHeader"
              :key="header.name"
              :prop="header.name"
              :label="header.title"
              :width="header.width||''">
              <template slot-scope="scope">
                <span>{{scope.row[header.name]||'--'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
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
            @click="onEditClick(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
            type="danger"
            @click="onDeleteClick(scope.$index)">删除</el-button>
          <el-button size="mini"
            type="primary"
            @click="onPrintClick(scope.row)">打印</el-button>
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
    <add-dialog ref="addDialog"></add-dialog>
    <print-preview ref="printPreview"></print-preview>
  </div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        num: '',
        name: '',
        date: ''
      },

      tableHeader: [
        {
          title: '序号',
          name: 'sort'
        },
        {
          title: '状态',
          name: 'state'
        },
        {
          title: '送货单号',
          name: 'num'
        },
        {
          title: '客户名称',
          name: 'customerName'
        },
        {
          title: '客户地址',
          name: 'address',
          width: 200
        },
        {
          title: '联系电话',
          name: 'phone',
          width: 100
        },
        {
          title: '送货时间',
          name: 'date',
          width: 100
        }
      ],
      tableData: [],
      // （送货单）钢号、规格（净尺寸规格/毛尺寸规格）、件数、重量、单价、材料费、加工费（方：精加工、飞边、气割费，圆：锯费）、总金额、备注
      expandTableHeader: [
        {
          title: '产品名称',
          name: 'productName'
        },
        {
          title: '净尺寸规格',
          name: 'generalStandards',
          width: 150
        },
        {
          title: '毛尺寸规格',
          name: 'additionalStandards',
          width: 150
        },
        {
          title: '件数',
          name: 'amount'
        },
        {
          title: '重量',
          name: 'weight'
        },
        {
          title: '单价',
          name: 'unitPrice'
        },
        {
          title: '金额',
          name: 'price'
        },
        {
          title: '材料费',
          name: 'material'
        },
        {
          title: '精加工',
          name: 'machining'
        },
        {
          title: '飞边',
          name: 'flashSide'
        },
        {
          title: '气割费',
          name: 'gasCut'
        },
        {
          title: '锯费',
          name: 'saw'
        },
        {
          title: '总金额',
          name: 'totalPrice'
        },
        {
          title: '备注',
          name: 'remarks'
        }
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
    reFindTableData() {
      const {
        pageSize,
        currentPage,
        form: { num, name, date }
      } = this
      this.$db
        .getData('DELIVERYNOTE_DATA', {
          pageSize: pageSize,
          pageIndex: currentPage,
          search: [
            { name: 'num', value: num },
            { name: 'name', value: name },
            { name: 'date', value: date }
          ]
        })
        .then(res => {
          this.tableData = res.data.map((item, index) => {
            item.sort = pageSize * (currentPage - 1) + index + 1
            return item
          })
          this.total = res.total
        })
    },
    searchTableData() {
      this.currentPage = 1
      this.reFindTableData()
    },
    onAddClick() {
      this.$refs.addDialog.detail = {}
      this.$refs.addDialog.show = true
    },
    // 打印
    onPrintClick(row) {
      this.$refs.printPreview.detail = row
      this.$refs.printPreview.printPreview()
      // this.$refs.printPreview.show = true
    },
    // 打印预览
    // onPrintPreviewClick() {
    //   this.$refs.printPreview.show = true
    // },
    onEditClick(index, row) {
      this.$refs.addDialog.detail = row
      this.$refs.addDialog.show = true
    },
    onDeleteClick(index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
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
    addDialog: () => import('./components/addDialog'),
    printPreview: () => import('./components/printPreview.vue')
  }
}
</script>
<style lang='scss' scoped>
.table {
  width: 100%;
}
// .expand-table {
//   width: 800px;
// }
/deep/ .el-table__expanded-cell {
  // padding: 20px 170px 20px 50px;
  .el-table {
    width: calc(100vw - 420px);
  }
}
.page {
  margin-top: 20px;
  float: right;
}
</style>
