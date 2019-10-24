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
      <el-table-column prop="name"
        label="产品名称"
        width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.name"
            filterable
            placeholder="请选择钢种">
            <el-option v-for="product in productList"
              :key="product.id"
              :label="product.name"
              :value="product.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>

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
      tableHeader: [
        {
          title: '产品名称',
          name: 'name'
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
      tableData: []
    }
  },

  computed: {},

  mounted() {},

  methods: {
    addGoods() {
      this.tableData.unshift({
        name: '',
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
      this.$db.getData('PRODUCT_DATA').then(res => {
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
}
</style>
