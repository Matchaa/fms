<!--修改公司信息-->
<template>
  <el-dialog title="修改公司信息"
    :visible.sync="show"
    width="600px"
    @open="dialogOpen">
    <el-form :model="form"
      :rules="rules"
      ref="form"
      label-width="60px">
      <el-form-item label="名称"
        prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="地址"
        prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="电话"
        prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="传真"
        prop="fax">
        <el-input v-model="form.fax"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="reset">重 置</el-button>
      <el-button type="primary"
        @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      form: {
        name: '',
        address: '',
        tel: '',
        fax: ''
      },
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ],
        tel: [{ required: true, message: '请输入公司电话', trigger: 'blur' }],
        fax: [{ required: true, message: '请输入公司传真', trigger: 'blur' }]
      }
    }
  },

  computed: {},

  mounted() {},

  methods: {
    dialogOpen() {
      this.$db.getData('COMPANY_INFO').then(res => {
        if (res.total) {
          for (let key in this.form) {
            this.form[key] = res.data[0][key]
          }
        }
      })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = { id: 1 }
          for (let key in this.form) {
            param[key] = this.form[key]
          }
          this.$db.putData('COMPANY_INFO', param).then(() => {
            this.$message.success('修改公司信息成功')
            this.show = false
          })
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
</style>
