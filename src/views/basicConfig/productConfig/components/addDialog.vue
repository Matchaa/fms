<!--添加客户信息-->
<template>
  <el-dialog title="新增产品"
    :visible.sync="show"
    width="600px"
    @open="openDialog">
    <el-form label-width="100px"
      :model="form"
      :rules="rules"
      ref="form">
      <el-form-item label="产品名称"
        prop="name">
        <el-input v-model="form.name"
          placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品种类"
        prop="unit">
        <el-select v-model="form.typeId"
          placeholder="请选择">
          <el-option label="方钢"
            value="rect">
          </el-option>
          <el-option label="圆钢"
            value="round">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位"
        prop="unit">
        <el-select v-model="form.unit"
          placeholder="请选择">
          <el-option v-for="unit in unitList"
            :key="unit.value"
            :label="unit.label"
            :value="unit.value">
          </el-option>
        </el-select>
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
export default {
  data() {
    return {
      show: false,
      detail: {},
      form: {
        name: '',
        typeId: 'rect',
        unit: 'Kg'
      },
      unitList: [
        {
          label: 'Kg',
          value: 'Kg'
        },
        {
          label: 'g',
          value: 'g'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }]
      }
    }
  },

  computed: {},
  mounted() {},

  methods: {
    openDialog() {
      for (let key in this.form) {
        if (key === 'unit') {
          this.form[key] = this.detail[key] || 'Kg'
          return
        }
        if (key === 'typeId') {
          this.form[key] = this.detail[key] || 'rect'
          return
        }
        this.form[key] = this.detail[key] || ''
      }
    },
    onCertain() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const param = {
            id: this.detail.id || new Date().getTime(),
            type: this.form.typeId === 'rect' ? '方钢' : '圆钢'
          }
          for (let key in this.form) {
            param[key] = this.form[key]
          }
          this.$db.putData('PRODUCT_DATA', param).then(() => {
            this.$emit('success')
            this.show = false
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
