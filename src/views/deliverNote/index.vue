<!--送货单-->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="送货单号">
        <el-input v-model="form.num"
          placeholder="请输入送货单号"></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="form.name"
          placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="送货时间">
        <el-date-picker v-model="form.date"
          type="date"
          placeholder="选择送货日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="onAddClick">新增</el-button>
        <el-button @click="onPrintClick">打印</el-button>
        <el-button @click="onPrintPreviewClick">打印预览</el-button>
      </el-form-item>
    </el-form>
    <el-table class="table"
      :data="tableData"
      height="500px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table class="expand-table"
            :data="scope.row.detail">
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
            @click="onDeleteClick(scope.$index, scope.row)">删除</el-button>
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
          title: '状态',
          name: 'state'
        },
        {
          title: '送货单号',
          name: 'num'
        },
        {
          title: '客户名称',
          name: 'name'
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
      tableData: [
        {
          state: '已发货',
          num: 123,
          name: '舜禹集团',
          address: '浙江省余姚市',
          phone: 1585883882,
          date: '2019-09-28',
          detail: [
            {
              num: 12345,
              generalStandards: '200*200*100',
              additionalStandards: '10*10*20',
              amount: 124,
              weight: 123,
              unitPrice: 11122,
              material: 234,
              machining: 555,
              flashSide: 88,
              gasCut: 111,
              saw: 222,
              totalPrice: 123,
              remake: '备注'
            },
            {
              num: 12345,
              generalStandards: '200*200*100',
              additionalStandards: '10*10*20',
              amount: 124,
              weight: 123,
              unitPrice: 11122,
              material: 234,
              machining: 555,
              flashSide: 88,
              gasCut: 111,
              saw: 222,
              totalPrice: 123,
              remake: '备注'
            }
          ]
        }
      ],
      // （送货单）钢号、规格（净尺寸规格/毛尺寸规格）、件数、重量、单价、材料费、加工费（方：精加工、飞边、气割费，圆：锯费）、总金额、备注
      expandTableHeader: [
        {
          title: '钢号',
          name: 'num'
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

  mounted() {},

  methods: {
    onAddClick() {
      this.$refs.addDialog.show = true
    },
    // 打印
    onPrintClick() {},
    // 打印预览
    onPrintPreviewClick() {},
    onEditClick(index, row) {
      console.log(index, row)
    },
    onDeleteClick(index, row) {
      console.log(index, row)
    },
    onSizeChange() {},
    onCurrentChange(value) {
      this.currentPage = value
    }
  },

  components: {
    addDialog: () => import('./components/addDialog')
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
