<!--打印预览-->
<template>
  <div class="print-preview"
    v-show="show">
    <div class="text">111</div>
  </div>
  <!-- <el-dialog title="打印预览"
    :visible.sync="show"
    width="1000px"
    :opened="dialogOpen">

    <span slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="onPrintClick">打 印</el-button>
    </span>
  </el-dialog> -->
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
.print-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: pink;
  z-index: 99;
  color: red;
}
@media print {
  @page {
    // size: 1, 2;
    margin: 0;
    background-color: black;
    // margin: 3.7cm 2.6cm 3.5cm;
  }
  body {
    background: red;
    margin: 2cm; /* this affects the margin on the content before sending to printer */
  }
  .print-preview {
    background-color: black;
  }
  .text {
    font-size: 50px;
  }
}
</style>
