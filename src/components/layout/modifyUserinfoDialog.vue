<!--修改个人信息-->
<template>
  <el-dialog title="修改个人信息"
    :visible.sync="show"
    width="600px">
    <el-form :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      hide-required-asterisk>
      <el-form-item label="用户名"
        prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权限"
        prop="role">
        <el-radio-group v-model="form.role">
          <el-radio label="admin">超级管理员</el-radio>
          <el-radio label="edit">管理员</el-radio>
        </el-radio-group>
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
        role: 'admin'
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
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
