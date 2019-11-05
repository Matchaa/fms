<!--统计-->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="产品名称">
        <el-select v-model="form.product"
          filterable
          placeholder="请选择产品"
          @change="searchTableData">
          <el-option v-for="product in productList"
            :key="product.id"
            :label="product.name"
            :value="product.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-select v-model="form.customer"
          filterable
          placeholder="请选择客户"
          @change="searchTableData">
          <el-option v-for="customer in customerList"
            :key="customer.id"
            :label="customer.name"
            :value="customer.id"></el-option>
        </el-select>
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
          @click="checkEcharts">查看统计图</el-button>
      </el-form-item>
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
    <echarts ref="echarts"></echarts>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      form: {
        customer: '',
        product: '',
        date: ''
      },
      productList: [],
      customerList: [],
      tableHeader: [
        {
          title: '序号',
          name: 'sort'
        },
        {
          title: '产品名称',
          name: 'productName'
        },
        // {
        //   title: '产品类型',
        //   name: 'productType'
        // },
        {
          title: '客户名称',
          name: 'customerName'
        },
        {
          title: '客户地址',
          name: 'address'
        },
        {
          title: '客户电话',
          name: 'phone'
        },
        {
          title: '时间',
          name: 'date'
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 50,
      total: 0
    }
  },

  computed: {},

  mounted() {
    this.reFindCustomerList()
    this.reFindProductList()
    this.reFindTableData()
  },

  methods: {
    checkEcharts() {
      this.$refs.echarts.show = true
    },
    reFindCustomerList() {
      return this.$db.getData('CUSTOMER_DATA').then(res => {
        this.customerList = res.data
      })
    },
    reFindProductList() {
      return this.$db.getData('PRODUCT_DATA').then(res => {
        this.productList = res.data
      })
    },
    reFindTableData() {
      this.tableData = []
      const {
        pageSize,
        currentPage,
        form: { customer, product, date }
      } = this
      this.$db.getData('DELIVERYNOTE_DATA').then(res => {
        res.data.forEach(note => {
          note.productData.forEach(goods => {
            this.tableData.push({ ...note, ...goods })
          })
        })
        this.tableData = this.tableData

          .filter(
            (item, index) =>
              index >= pageSize * (currentPage - 1) &&
              index < pageSize * currentPage &&
              (customer === '' || customer === item.customer) &&
              (product === '' || product === item.product) &&
              (date === '' || moment(date).format('YYYY-MM-DD') === item.date)
          )
          .map((item, index) => {
            item.sort = pageSize * (currentPage - 1) + index + 1
            return item
          })
        console.log(this.tableData)
      })
    },
    searchTableData() {
      this.currentPage = 1
      this.reFindTableData()
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
    echarts: () => import('./components/echarts.vue')
  }
}
</script>
<style lang='scss' scoped>
</style>
