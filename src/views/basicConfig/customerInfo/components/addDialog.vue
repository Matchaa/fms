<!--添加客户信息-->
<template>
  <el-dialog title="新增客户"
    :visible.sync="show"
    width="600px">
    <el-form label-width="100px"
      :model="form"
      :rules="rules"
      ref="form">
      <el-form-item label="客户名称"
        prop="name">
        <el-input v-model="form.name"
          placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="客户地址"
        prop="address">
        <el-input v-model="form.address"
          placeholder="请输入客户地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话"
        prop="phone">
        <el-input v-model="form.phone"
          placeholder="请输入联系电话"
          :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="传真"
        prop="fax">
        <el-input v-model="form.fax"
          placeholder="请输入传真"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="onReset">重 置</el-button>
      <el-button type="primary"
        @click="onCertain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isPhone } from '@/utils/validate.js'
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error('请输入正确格式的电话号码'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      form: {
        name: '',
        address: '',
        phone: '',
        fax: ''
      },
      rules: {
        name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入客户地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  mounted() {},

  methods: {
    getCustomerData() {
      return new Promise(resolve => {
        this.$vlf.getItem('CUSTOMER_DATA').then(res => {
          resolve(res || [])
        })
      })
    },
    onCertain() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let tableData = await this.getCustomerData()
          const param = {}
          for (let key in this.form) {
            param[key] = this.form[key]
          }
          tableData.unshift(param)
          this.$vlf.setItem('CUSTOMER_DATA', tableData).then(() => {
            this.show = false
            this.$emit('success')
          })
        }
      })
    },
    onReset() {
      this.$refs.form.resetFields()
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
/deep/ input {
  width: 400px;
}
</style>
