<!--添加送货单-->
<template>
  <el-dialog title="新增送货单" :visible.sync="show" width="1000px" @open="dialogOpen">
    <el-form class="form" :inline="true">
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option label="未打印" :value="0"></el-option>
          <el-option label="未发货" :value="1"></el-option>
          <el-option label="已发货" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-select v-model="form.name" filterable placeholder="请选择客户" @change="customerChange">
          <el-option v-for="customer in customerList" :key="customer.id" :label="customer.name" :value="customer.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户地址">
        <el-input v-model="form.address" disabled placeholder="请输入客户地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" disabled placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="送货时间">
        <el-date-picker v-model="form.date" type="date" placeholder="请选择送货日期" @change="dateChange">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addGoods">添加</el-button>
    <el-table class="table" :data="tableData">
      <el-table-column label="产品名称" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.productName" filterable placeholder="请选择产品名称" @change="(value)=>productChange(value,scope)" size="small">
            <el-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column v-for="(header,key) in tableHeader" :key="key" :prop="key" :label="header.title" :width="header.width||150">
        <template slot-scope="scope">
          <!-- <el-select v-if="header.type==='select'" v-model="scope.row[key]" filterable :placeholder="'请选择'+header.title" @change="(value)=>header.change(value,scope.row)">
            <el-option v-for="item in header.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
          <el-input v-if="header.type==='input'" v-model="scope.row[key]" :disabled="header.disabled||scope.row.productType===''||false" :placeholder="'请输入'+header.title" @blur="(value)=>header.change(value,scope)" size="small"></el-input>
          <el-input-number v-else-if="header.type==='inputNumber'" v-model="scope.row[key]" :disabled="header.disabled||scope.row.productType===''||false" :precision="header.precision||0" :step="header.step||1" :min="header.min||0" size="small"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size="small" type="danger">
            <i class="el-icon-delete table__delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="meta">备注：净尺寸和毛尺寸规格参考格式：100*100*100。</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="onCertain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    var generalStandardsChange = (value, scope) => {
      const { $index: index, row } = scope
      // console.log(row)
      const general = row.generalStandards.split('*')
      if (general.length !== 3) {
        this.$message.warning('请按照参考格式输入净尺寸规格！')
        row.generalStandards = ''
        this.$set(this.tableData, index, row)
        return
      }
      let isAccord = general.every(item => {
        return item >= 0
      })
      if (!isAccord) {
        this.$message.warning('净尺寸规格只能为大于等于0的数字！')
        row.generalStandards = ''
        this.$set(this.tableData, index, row)
        return
      }
      if (row.additionalStandards === '') return
      const additional = row.additionalStandards.split('*')
      console.log(general
        .map((item, index) => {
          return Number(item)+Number(additional[index]) 
        }))
      const sum = general
        .map((item, index) => {
          return Number(item)+Number(additional[index]) 
        })
        .reduce((accumulator, currentValue) => accumulator * currentValue)

      row.weight = (sum * 7.85 * 0.000001 * row.amount).toFixed(2)
      this.$set(this.tableData, index, row)
    }
    var additionalStandardsChange = (value, scope) => {
      const { $index: index, row } = scope
      // console.log(row)
      const additional = row.additionalStandards.split('*')
      console.log(additional)
      if (additional.length !== 3) {
        row.additionalStandards = ''
        this.$set(this.tableData, index, row)
        this.$message.warning('请按照参考格式输入毛尺寸规格！')
        return
      }
      let isAccord = additional.every(item => {
        return item >= 0
      })
      if (!isAccord) {
        row.additionalStandards = ''
        this.$set(this.tableData, index, row)
        this.$message.warning('毛尺寸规格只能为大于等于0的数字！')
        return
      }
    }
    return {
      show: false,
      form: {
        state: 0,
        name: '',
        address: '',
        phone: '',
        date: ''
      },
      customerList: [],
      tableHeader: {
        // productName: {
        //   title: '产品名称',
        //   type: 'select',
        //   list: [],
        //   change:this.productChange
        // },
        generalStandards: {
          title: '净尺寸规格',
          type: 'input',
          change: generalStandardsChange
        },
        additionalStandards: {
          title: '毛尺寸规格',
          type: 'input',
          change: additionalStandardsChange
        },
        amount: {
          title: '件数',
          type: 'inputNumber',
          precision: 0
        },
        weight: {
          title: '重量',
          name: 'weight',
          type: 'input',
          disabled: true
        },
        unitPrice: {
          title: '单价',
          name: 'unitPrice',
          precision: 2,
          type: 'inputNumber'
        },
        price: {
          title: '金额',
          name: 'price',
          type: 'input',

          disabled: true
        },
        material: {
          title: '材料费',
          name: 'material',
          precision: 2,
          type: 'inputNumber'
        },
        machining: {
          title: '精加工',
          name: 'machining',
          precision: 2,
          type: 'inputNumber'
        },
        flashSide: {
          title: '飞边',
          name: 'flashSide',
          precision: 2,
          type: 'inputNumber'
        },
        gasCut: {
          title: '气割费',
          name: 'gasCut',
          precision: 2,
          type: 'inputNumber'
        },
        saw: {
          title: '锯费',
          name: 'saw',
          precision: 2,
          type: 'inputNumber'
        },
        totalPrice: {
          title: '总金额',
          name: 'totalPrice',
          type: 'input',
          disabled: true
        },
        remarks: {
          title: '备注',
          name: 'remarks',
          type: 'input',
          width:200
        }
      },
      tableData: [],
      productList: []
    }
  },

  computed: {},

  mounted() {},

  methods: {
    addGoods() {
      this.tableData.unshift({
        productName: '',
        productType: '',
        generalStandards: '',
        additionalStandards: '',
        amount: 1,
        weight: 0,
        unitPrice: 1,
        material: 0,
        machining: 0,
        flashSide: 0,
        gasCut: 0,
        saw: 0,
        totalPrice: 0,
        remarks: ''
      })
    },
    dialogOpen() {
      this.reFindCustomerList()
      this.reFindProductList().then(() => {
        this.addGoods()
      })
    },
    productChange(value, scope) {
      const { $index: index, row } = scope
      row.productType = this.productList.find(item => {
        return item.id === value
      }).typeId
      this.$set(this.tableData, index, row)
    },
    customerChange(value) {
      const selected = this.customerList.find(item => item.id === value)
      this.form.address = selected.address
      this.form.phone = selected.phone
    },
    dateChange(value) {
      this.form.date = moment(value).format('YYYY-MM-DD')
    },
    reFindCustomerList() {
      this.$db.getData('CUSTOMER_DATA').then(res => {
        this.customerList = res
      })
    },
    reFindProductList() {
      return this.$db.getData('PRODUCT_DATA').then(res => {
        this.productList = res
      })
    },
    onCertain() {
      console.log(this.form)

      // const param = {}
      // this.$db.putData('DELIVERYNOTE_DATA', param).then(() => {
      //   this.$emit('success')
      //   this.show = false
      // })
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
.table {
  width: 100%;
  &__delete {
    color: #fff;
  }
}
.meta {
  color: #a0a0a0;
  margin-top: 10px;
}
</style>
