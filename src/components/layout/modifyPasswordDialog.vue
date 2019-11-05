<!--修改密码弹框-->
<template>
  <el-dialog title="修改密码"
    :visible.sync="show"
    width="600px">
    <el-form :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="80px"
      hide-required-asterisk>
      <el-form-item label="旧密码"
        prop="oldPassword">
        <el-input type="password"
          v-model="form.oldPassword"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
        prop="newPassword">
        <el-input type="password"
          v-model="form.newPassword"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
        prop="checkPassword">
        <el-input type="password"
          v-model="form.checkPassword"
          autocomplete="off"></el-input>
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
    var validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }]
      }
    }
  },

  computed: {},

  mounted() {},

  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
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
