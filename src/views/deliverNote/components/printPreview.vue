<!--打印预览-->
<template>
  <el-dialog title="打印预览"
    :visible.sync="show"
    width="600px"
    @opened="dialogOpen">
    <div id="print">
      <h2>{{companyInfo.name}}</h2>
      <div>地址:{{companyInfo.address}}</div>
      <span class="tel">电话:{{companyInfo.tel}}</span><span>传真:{{companyInfo.fax}}</span>
      <div class="title">
        <h2>1 2 3</h2>
        <span class="title__odd-numbers">No.{{detail.num}}</span>
      </div>
      <div class="customer">
        <span>客户姓名:{{detail.customerName}}</span>
        <span class="customer__address">客户地址:{{detail.address}}</span>
        <span>客户电话:{{detail.phone}}</span>
        <span>送货时间:{{detail.date}}</span>
        <span>制单人:{{$store.state.userInfo.name}}</span>
      </div>
      <el-table class="table"
        :data="tableData"
        border
        :span-method="arraySpanMethod"
        style="width: 100%">
        <el-table-column v-for="header in tableHeader"
          :key="header.name"
          :prop="header.name"
          :label="header.title"
          :width="header.width||''">
          <!-- <template slot-scope="scope">
            <span>{{scope.row[header.name]||'--'}}</span>
          </template> -->
        </el-table-column>
      </el-table>
      <h5>注：以上货品请核对重量，如有质量问题，请在收货后三天内通知本公司，逾期恕不负责</h5>
      <div class="print-footer">
        <span>送货单位及经手人(盖章)：</span>
        <span>收货单位及经手人(盖章)：</span>
      </div>
    </div>
    <span slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="onPrintClick">打 印</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      detail: {},
      companyInfo: {},
      tableData: [],
      tableHeader: [
        {
          title: '序号',
          name: 'sort',
          width: 50
        },
        {
          title: '产品名称',
          name: 'name',
          width: 150
        },
        {
          title: '规格',
          name: 'standards',
          width: 150
        },
        {
          title: '重量',
          name: 'weight'
        },
        {
          title: '单价',
          name: 'unitPrice'
        },
        // {
        //   title: '材料费',
        //   name: 'material'
        // },
        // {
        //   title: '加工费',
        //   name: 'machinPrice'
        // },
        {
          title: '总金额',
          name: 'totalPrice'
        },
        {
          title: '备注',
          name: 'remarks',
          width: 150
        }
      ]
    }
  },

  computed: {},

  mounted() {},

  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === this.tableData.length - 1) {
        if (columnIndex === 0) {
          return [1, 5]
        } else if (columnIndex === 5) {
          return [1, 2]
        } else {
          return [0, 0]
        }
      }
    },
    reFindCompanyInfo() {
      this.$db.getData('COMPANY_INFO').then(res => {
        if (res.total) {
          this.companyInfo = res.data[0]
        }
      })
    },
    dialogOpen() {
      this.reFindCompanyInfo()
      console.log(this.detail)
      this.tableData = this.detail.productData.map((item, index) => {
        return {
          sort: index + 1,
          name: item.productName,
          standards: item.generalStandards,
          weight: item.weight,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          remarks: item.remarks
        }
      })
      for (let i = this.tableData.length; i < 7; i++) {
        this.tableData.push({})
      }
      const price = this.detail.productData
        .reduce((acc, cur) => acc + cur.totalPrice, 0)
        .toFixed(2)
      console.log(price, this.digitUppercase(price))

      this.tableData.push({
        sort: `合计金额(大写)：${this.digitUppercase(price)}`,
        totalPrice: `(小写)：¥${price}`
      })
    },
    onPrintClick() {
      this.printPartial(document.querySelector('#print'))
    },
    printPartial(dom) {
      if (!dom) return
      let copyDom = document.createElement('span')
      const styleDom = document.querySelectorAll('style, link, meta')
      const titleDom = document.createElement('title')
      titleDom.innerText = '送货单'
      copyDom.appendChild(titleDom)
      Array.from(styleDom).forEach(item => {
        copyDom.appendChild(item.cloneNode(true))
      })
      copyDom.appendChild(dom.cloneNode(true))
      const htmlTemp = copyDom.innerHTML
      copyDom = null
      const iframeDom = document.createElement('iframe')
      const attrObj = {
        height: 0,
        width: 0,
        border: 0,
        wmode: 'Opaque'
      }
      const styleObj = {
        position: 'absolute',
        top: '-999px',
        left: '-999px'
      }
      Object.entries(attrObj).forEach(([key, value]) =>
        iframeDom.setAttribute(key, value)
      )
      Object.entries(styleObj).forEach(
        ([key, value]) => (iframeDom.style[key] = value)
      )
      document.body.insertBefore(iframeDom, document.body.children[0])
      const iframeWin = iframeDom.contentWindow
      const iframeDocs = iframeWin.document
      iframeDocs.write(`<!doctype html>`)
      iframeDocs.write(htmlTemp)
      iframeWin.focus()
      iframeWin.print()
      document.body.removeChild(iframeDom)
    },
    digitUppercase(price) {
      const fraction = ['角', '分']
      const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
      let n = Number(price)
      if (typeof n === 'number') {
        const head = n < 0 ? '-' : ''
        n = Math.abs(n)
        let s = ''
        for (let i = 0; i < fraction.length; i++) {
          s += (
            digit[Math.floor(((n * 100) / 10) * Math.pow(10, i)) % 10] +
            fraction[i]
          ).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n)
        for (let i = 0; i < unit[0].length && n > 0; i++) {
          let p = ''
          for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return (
          head +
          s
            .replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整')
        )
      } else {
        return ''
      }
    }
  },

  components: {}
}
</script>
<style lang='scss' scoped>
#print {
  text-align: center;
}
h2 {
  margin: 0;
}
.tel {
  margin-right: 10px;
}
.title {
  position: relative;
  h2 {
    display: inline-block;
  }
  &__odd-numbers {
    position: absolute;
    right: 5px;
    top: 6px;
    color: red;
    font-weight: bold;
    font-size: 12px;
  }
}
.customer {
  display: grid;
  grid-template-columns: repeat(3, auto);
  // grid-template-rows: repeat(3, 1fr);
  grid-gap: 5px;
  grid-auto-flow: row;
  justify-items: start;
  justify-content: space-between;
  margin-bottom: 5px;
  &__address {
    grid-column-start: 2;
    grid-column-end: 4;
  }
}
/deep/ .el-table td,
/deep/ .el-table th {
  padding: 0 !important;
  height: 23px;
}
h5 {
  text-align: left;
  margin: 5px 0;
}
.print-footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: left;
}
// 2分之一 A4 210厘米宽 140厘米高,A4纸的宽高比为 297 : 210
@media print {
  @page {
    size: 21cm 14cm;
    margin: 0;
  }
  #print {
    margin: 1cm;
  }
}
</style>
