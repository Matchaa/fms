<!--添加送货单-->
<template>
  <el-dialog title="新增送货单"
    :visible.sync="show"
    width="1200px"
    @open="dialogOpen">
    <el-form class="form"
      :model="form"
      :rules="rules"
      ref="form"
      :inline="true">
      <el-form-item label="送货单号"
        prop="num">
        <el-input v-model="form.num"
          disabled
          placeholder="系统自动输入送货单号"></el-input>
      </el-form-item>
      <el-form-item label="状态"
        prop="state">
        <el-select v-model="form.state"
          placeholder="请选择状态">
          <el-option label="未打印"
            value="未打印"></el-option>
          <el-option label="未发货"
            value="未发货"></el-option>
          <el-option label="已发货"
            value="已发货"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称"
        prop="customer">
        <el-select v-model="form.customer"
          filterable
          placeholder="请选择客户"
          @change="customerChange">
          <el-option v-for="customer in customerList"
            :key="customer.id"
            :label="customer.name"
            :value="customer.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户地址"
        prop="address">
        <el-input v-model="form.address"
          disabled
          placeholder="请输入客户地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话"
        prop="phone">
        <el-input v-model="form.phone"
          disabled
          placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="送货时间"
        prop="date">
        <el-date-picker v-model="form.date"
          type="date"
          placeholder="请选择送货日期"
          @change="dateChange">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary"
      @click="addRow">添加</el-button>
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
            size="small"
            @change="headerChange(header,scope)">
            <el-option v-for="item in header.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
          <el-input v-if="header.type==='input'"
            v-model="scope.row[key]"
            :disabled="isHeaderDisabled(header,scope)||scope.row.productType===''||false"
            :placeholder="'请输入'+header.title"
            size="small"
            @change="headerChange(header,scope)"></el-input>
          <el-input-number v-else-if="header.type==='inputNumber'"
            v-model="scope.row[key]"
            :disabled="isHeaderDisabled(header,scope)||scope.row.productType===''||false"
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
          <el-button @click.native.prevent="deleteRow(scope.$index)"
            size="small"
            type="danger">
            <i class="el-icon-delete table__delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="meta">备注：净尺寸和毛尺寸规格参考格式：100*100*100（方板长*宽*高），100*100（圆板直径*长度）。</div>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="onCancel">重 置</el-button>
      <el-button type="primary"
        @click="onCertain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import tableHeader from './goodsUtils.js'
export default {
  data() {
    return {
      show: false,
      detail: {},
      form: {
        state: '未打印',
        num: '',
        customer: '',
        address: '',
        phone: '',
        date: ''
      },
      rules: {
        customer: [{ required: true, message: '请选择客户', trigger: 'blur' }],
        date: [{ required: true, message: '请选择日期', trigger: 'blur' }]
      },
      customerList: [],
      tableData: []
    }
  },

  computed: {
    tableHeader() {
      return tableHeader
    }
  },

  mounted() {},

  methods: {
    dialogOpen() {
      this.reFindCustomerList().then(() => {
        if (!Object.keys(this.detail).length) {
          this.onCancel()
        } else {
          for (let key in this.form) {
            this.form[key] = this.detail[key] || ''
          }
          this.tableData = this.detail.productData
        }
      })
    },
    isHeaderDisabled(header, scope) {
      const { disabled } = header
      switch (typeof disabled) {
        case 'boolean':
          return header.disabled
        case 'function':
          return header.disabled(scope.row)
      }
    },
    headerChange(header, scope) {
      if (header.change) {
        header.change(this, scope)
      }
    },
    reFindCustomerList() {
      return this.$db.getData('CUSTOMER_DATA').then(res => {
        this.customerList = res.data
      })
    },

    customerChange(value) {
      const selected = this.customerList.find(item => item.id === value)
      this.form.address = selected.address
      this.form.phone = selected.phone
    },
    dateChange(value) {
      this.form.date = moment(value).format('YYYY-MM-DD')
    },
    addRow() {
      this.tableData.unshift({
        product: '',
        productName: '',
        productType: '',
        generalStandards: '',
        additionalStandards: '',
        size: '',
        amount: 1,
        weight: '',
        unitPrice: 1,
        price: '',
        material: 0,
        machining: 0,
        flashSide: 0,
        gasCut: 0,
        saw: 0,
        totalPrice: '',
        remarks: ''
      })
    },
    deleteRow(index) {
      this.tableData.splice(index, 1)
    },
    onCertain() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const tableData = this.tableData.filter(data => {
            return data.product !== '' && data.size !== ''
          })
          if (tableData.length) {
            const param = {
              id: this.detail.id || new Date().getTime(),
              customerName: this.customerList.find(
                customer => customer.id === this.form.customer
              ).name
            }
            for (let key in this.form) {
              param[key] = this.form[key]
            }
            param.num =
              this.detail.num || moment(new Date()).format('YYYYMMDDHHmmss')
            param.productData = this.tableData
            this.$db.putData('DELIVERYNOTE_DATA', param).then(() => {
              this.$emit('success')
              if (this.detail.id) {
                this.$message.success('修改送货单成功！')
              } else {
                this.$message.success('新增送货单成功！')
              }

              this.show = false
            })
          } else {
            this.$message.warning('规格完整的产品数量不足一条！')
          }
        }
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
      this.tableData = []
      this.addRow()
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
