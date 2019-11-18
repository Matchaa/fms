<!--echarts-->
<template>
  <el-dialog title="统计图"
    :visible.sync="show"
    width="1000px"
    @opened="dialogOpen">
    <div id="echarts"
      style="width:1000px;height:400px;"></div>
    <span slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="show = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'
export default {
  data() {
    return {
      show: false,
      tableData: []
    }
  },

  computed: {},

  mounted() {},

  methods: {
    reFindProductList() {
      return this.$db.getData('PRODUCT_DATA').then(res => {
        return res.data.map(item => {
          return item.name
        })
      })
    },
    reFindTableData() {
      this.tableData = []
      return this.$db.getData('DELIVERYNOTE_DATA').then(res => {
        res.data.forEach(note => {
          note.productData.forEach(goods => {
            this.tableData.push({ ...note, ...goods })
          })
        })
      })
    },
    getXAxis() {
      const month = moment().get('month')
      const arr = [...Array(12)]
      return arr.map((item, index) => {
        return moment()
          .month(month - index)
          .format('YYYY-MM')
      })
    },
    getLineData(name) {
      const data = this.tableData.filter(item => item.productName === name)
      const dateList = this.getXAxis()
      return dateList.map(date => {
        return data
          .filter(item => moment(date).isSame(item.date, 'month'))
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue.weight,
            0
          )
      })
    },
    async dialogOpen() {
      const legend = await this.reFindProductList()
      await this.reFindTableData()
      const data = legend.map(item => {
        console.log(this.getLineData(item))

        return {
          name: item,
          type: 'line',
          smooth: true,
          data: this.getLineData(item)
        }
      })
      var myChart = echarts.init(document.getElementById('echarts'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '15%',
          containLabel: false
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 50
          },
          {
            start: 0,
            end: 50,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.getXAxis()
        },
        yAxis: {
          type: 'value'
        },
        series: data
      }
      myChart.setOption(option)
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
</style>
