<!--添加送货单-->
<template>
  <el-dialog title="新增送货单"
    :visible.sync="show"
    width="1000px"
    @open="dialogOpen">
    <el-form class="form"
      :inline="true">
      <el-form-item label="状态">
        <el-select v-model="form.state"
          placeholder="请选择状态">
          <el-option label="未打印"
            :value="0"></el-option>
          <el-option label="未发货"
            :value="1"></el-option>
          <el-option label="已发货"
            :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-select v-model="form.name"
          filterable
          placeholder="请选择客户"
          @change="customerChange">
          <el-option v-for="customer in customerList"
            :key="customer.id"
            :label="customer.name"
            :value="customer.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户地址">
        <el-input v-model="form.address"
          disabled
          placeholder="请输入客户地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"
          disabled
          placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="送货时间">
        <el-date-picker v-model="form.date"
          type="date"
          placeholder="请选择送货日期"
          @change="dateChange">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary"
      @click="addGoods">添加</el-button>
    <el-table class="table"
      :data="tableData">
      <!-- <el-table-column label="产品名称"
        width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.productName"
            filterable
            placeholder="请选择产品名称"
            @change="(value)=>productChange(value,scope)"
            size="small">
            <el-option v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="净尺寸规格"
        width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.generalStandards"
            :disabled="scope.row.productType===''"
            placeholder="请输入净尺寸规格"
            @blur="(value)=>standardsChange(value,scope,'generalStandards')"
            size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="毛尺寸规格"
        width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.additionalStandards"
            :disabled="scope.row.productType===''"
            placeholder="请输入毛尺寸规格"
            @blur="(value)=>standardsChange(value,scope,'additionalStandards')"
            size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="件数"
        width="100">
        <template slot-scope="scope">
           <el-input-number v-model="scope.row.amount"
            :disabled="header.disabled||scope.row.productType===''||false"
            :precision="header.precision||0"
            :step="header.step||1"
            :min="header.min||0"
            size="small"
            @change="inputNumberChange(header,scope)"></el-input-number>
        </template>
      </el-table-column> -->
      <el-table-column v-for="(header,key) in tableHeader"
        :key="key"
        :prop="key"
        :label="header.title"
        :width="header.width||150">
        <template slot-scope="scope">
          <el-select v-if="header.type==='select'"
            v-model="scope.row[key]"
            filterable
            :placeholder="'请选择'+header.title"
            @change="headerChange(header,scope)">
            <el-option v-for="item in header.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
          <el-input v-if="header.type==='input'"
            v-model="scope.row[key]"
            :disabled="header.disabled||scope.row.productType===''||false"
            :placeholder="'请输入'+header.title"
            size="small"
            @change="headerChange(header,scope)"></el-input>
          <el-input-number v-else-if="header.type==='inputNumber'"
            v-model="scope.row[key]"
            :disabled="header.disabled||scope.row.productType===''||false"
            :precision="header.precision||0"
            :step="header.step||1"
            :min="header.min||0"
            size="small"
            @change="headerChange(header,scope)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)"
            size="small"
            type="danger">
            <i class="el-icon-delete table__delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="meta">备注：净尺寸和毛尺寸规格参考格式：100*100*100。</div>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary"
        @click="onCertain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import header from './goodsUtils.js'
export default {
  data() {
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
      tableData: [],
      productList: []
    }
  },

  computed: {
    tableHeader() {
      return header
    }
  },

  mounted() {},

  methods: {
    headerChange(header, scope) {
      if (header.change) {
        header.change(this, scope)
      }
    },
    addGoods() {
      this.tableData.unshift({
        productName: '',
        productType: '',
        generalStandards: '',
        additionalStandards: '',
        size: '',
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
      // this.reFindProductList().then(() => {
      this.addGoods()
      // })
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
    // reFindProductList() {
    //   return this.$db.getData('PRODUCT_DATA').then(res => {
    //     this.productList = res
    //   })
    // },
    standardsChange(value, scope, param) {
      const obj = { generalStandards: '净尺寸', additionalStandards: '毛尺寸' }
      const { $index: index, row } = scope
      const standard = value.split('*')
      const clear = () => {
        row[param] = ''
        this.$set(this.tableData, index, row)
      }
      if (standard.length !== 3) {
        clear()
        this.$message.warning(`请按照参考格式输入${obj[param]}规格！`)
        return
      }
      let isAccord = standard.every(item => {
        return item >= 0
      })
      if (!isAccord) {
        clear()
        this.$message.warning(`${obj[param]}规格只能为大于等于0的数字！`)
        return
      }
      const otherParam = param.includes('general')
        ? 'additionalStandards'
        : 'generalStandards'
      if (row[otherParam] === '') return
      const other = row[otherParam].split('*')
      const sum = standard
        .map((item, index) => {
          return Number(item) + Number(other[index])
        })
        .reduce((accumulator, currentValue) => accumulator * currentValue)

      row.weight = (sum * 7.85 * 0.000001 * row.amount).toFixed(2)
      this.$set(this.tableData, index, row)
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
