<!--打印预览-->
<template>
  <el-dialog title="打印预览"
    :visible.sync="show"
    width="1000px"
    :open="dialogOpen">

    <span slot="footer"
      class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary"
        @click="onPrintClick">打 印</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },

  computed: {},

  mounted() {},

  methods: {
    dialogOpen() {},
    onPrintClick() {}
  },

  components: {}
}
</script>
<style lang='scss' scoped>
</style>
