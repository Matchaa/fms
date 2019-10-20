<!--添加送货单-->
<template>
  <el-dialog title="新增送货单" :visible.sync="show" width="1000px">
    <div class="form">
      <el-form :inline="true">
        <el-form-item label="状态">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="未打印" :value="0"></el-option>
            <el-option label="未发货" :value="1"></el-option>
            <el-option label="已发货" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="form.name" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="form.address" placeholder="请输入客户地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="送货时间">
          <el-date-picker v-model="form.date" type="date" placeholder="请选择送货日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="header in tableHeader" :key="header.name" :prop="header.name" :label="header.title" :width="header.width||''">
          <template slot-scope="scope">
            <span>{{scope.row[header.name]||'--'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="onCertain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
      ]
    }
  },

  computed: {},

  mounted() {},

  methods: {
    onCertain() {}
  },

  components: {}
}
</script>
<style lang='scss' scoped>
</style>
