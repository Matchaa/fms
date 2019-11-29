import indexedDB from '@/utils/indexDB.js'

indexedDB.getData('PRODUCT_DATA').then(res => {
  tableHeader.product.list = res.data
})
const clearValue = (self, scope, param, value) => {
  const { $index: index, row } = scope
  row[param] = value || ''
  row.size = ''
  self.$set(self.tableData, index, row)
}
const setValue = (self, scope, param, value) => {
  const { $index: index, row } = scope
  row[param] = value
  self.$set(self.tableData, index, row)
}
const setWeight = (self, scope) => {
  const { row } = scope
  if (row.size === '') return
  const weight = row.size * row.amount
  setValue(self, scope, 'weight', weight)
  setPrice(self, scope)
  setTotalPrice(self, scope)
}
const setPrice = (self, scope) => {
  const { row } = scope
  const price = row.weight * row.unitPrice
  setValue(self, scope, 'price', price)
  setTotalPrice(self, scope)
}
const setTotalPrice = (self, scope) => {
  const { row } = scope
  const totalprice =
    row.price +
    row.material +
    (row.productType === 'rect' ? row.roughMachin + row.fineMachin : 0) +
    row.unloadingMachin
  setValue(self, scope, 'totalPrice', totalprice)
}
const tableHeader = {
  product: {
    title: '产品名称',
    type: 'select',
    list: [],
    change: (self, scope) => {
      let { $index: index, row } = scope
      const product = tableHeader.product.list.find(item => {
        return item.id === row.product
      })
      const { typeId: productType, name: productName } = product
      if (row.productType !== productType) {
        row = {
          product: row.product,
          productName: productName,
          productType: productType,
          generalStandards: '',
          additionalStandards: '',
          size: '',
          amount: 1,
          weight: '',
          unitPrice: 1,
          price: '',
          material: 0,
          roughMachin: 0,
          fineMachin: 0,
          unloadingMachin: 0,
          // saw: 0,
          totalPrice: '',
          remarks: ''
        }
      }
      self.$set(self.tableData, index, row)
    }
  },
  generalStandards: {
    title: '净尺寸规格',
    type: 'input',
    change: (self, scope) => {
      // standardsChange(self, scope, 'generalStandards')
      const { row } = scope
      let sum
      const general = row.generalStandards.split('*')
      let isAccord = general.every(item => {
        return item >= 0
      })
      if (!isAccord) {
        clearValue(self, scope, 'generalStandards')
        self.$message.warning(`净尺寸规格只能为大于等于0的数字！`)
        return
      }
      if (row.productType === 'rect') {
        if (general.length !== 3) {
          clearValue(self, scope, 'generalStandards')
          self.$message.warning(`请按照方板参考格式输入净尺寸规格！`)
          return
        }
        if (row.additionalStandards === '') return
        const other = row.additionalStandards.split('*')
        sum = general
          .map((item, index) => {
            return Number(item) + Number(other[index])
          })
          .reduce((accumulator, currentValue) => accumulator * currentValue)
      } else if (row.productType === 'round') {
        if (general.length !== 2) {
          clearValue(self, scope, 'generalStandards')
          self.$message.warning(`请按照圆板参考格式输入净尺寸规格！`)
          return
        }
        const [diameter, length] = general
        sum = Math.pow(diameter / 2, 2) * length * 3.14
      }
      const size = (sum * 7.85 * 0.000001).toFixed(2)
      setValue(self, scope, 'size', size)
      setWeight(self, scope)
    }
  },
  additionalStandards: {
    title: '毛尺寸规格',
    type: 'input',
    disabled: row => {
      const { productType } = row
      return productType !== 'rect'
    },
    change: (self, scope) => {
      const { row } = scope
      const additional = row.generalStandards.split('*')
      let isAccord = additional.every(item => {
        return item >= 0
      })
      if (!isAccord) {
        clearValue(self, scope, 'generalStandards')
        self.$message.warning(`毛尺寸规格只能为大于等于0的数字！`)
        return
      }
      if (additional.length !== 3) {
        clearValue(self, scope, 'generalStandards')
        self.$message.warning(`请按照方板参考格式输入毛尺寸规格！`)
        return
      }
      if (row.generalStandards === '') return
      const other = row.generalStandards.split('*')
      const sum = additional
        .map((item, index) => {
          return Number(item) + Number(other[index])
        })
        .reduce((accumulator, currentValue) => accumulator * currentValue)
      const size = (sum * 7.85 * 0.000001).toFixed(2)
      setValue(self, scope, 'size', size)
      setWeight(self, scope)
    }
  },
  amount: {
    title: '件数',
    type: 'inputNumber',
    min: 1,
    change: (self, scope) => {
      setWeight(self, scope)
    }
  },
  weight: {
    title: '重量',
    name: 'weight',
    type: 'input',
    disabled: true,
    change: (self, scope) => {
      setPrice(self, scope)
    }
  },
  unitPrice: {
    title: '单价',
    name: 'unitPrice',
    precision: 2,
    type: 'inputNumber',
    change: (self, scope) => {
      setPrice(self, scope)
    }
  },
  price: {
    title: '金额',
    name: 'price',
    type: 'input',
    disabled: true
  },
  material: {
    title: '材料费',
    name: 'material',
    precision: 2,
    type: 'inputNumber',
    change: (self, scope) => {
      setTotalPrice(self, scope)
    }
  },
  roughMachin: {
    title: '粗加工',
    name: 'roughMachin',
    precision: 2,
    type: 'inputNumber',
    disabled: row => {
      const { productType } = row
      return productType !== 'rect'
    },
    change: (self, scope) => {
      setTotalPrice(self, scope)
    }
  },
  fineMachin: {
    title: '精加工',
    name: 'flashSide',
    precision: 2,
    type: 'inputNumber',
    disabled: row => {
      const { productType } = row
      return productType !== 'rect'
    },
    change: (self, scope) => {
      setTotalPrice(self, scope)
    }
  },
  unloadingMachin: {
    title: '下料加工费',
    name: 'gasCut',
    precision: 2,
    type: 'inputNumber',
    // disabled: row => {
    //   const { productType } = row
    //   return productType !== 'rect'
    // },
    change: (self, scope) => {
      setTotalPrice(self, scope)
    }
  },
  // saw: {
  //   title: '锯费',
  //   name: 'saw',
  //   precision: 2,
  //   type: 'inputNumber',
  //   disabled: row => {
  //     const { productType } = row
  //     return productType !== 'round'
  //   },
  //   change: (self, scope) => {
  //     setTotalPrice(self, scope)
  //   }
  // },
  totalPrice: {
    title: '总金额',
    name: 'totalPrice',
    type: 'input',
    disabled: true
  },
  remarks: {
    title: '备注',
    name: 'remarks',
    type: 'input',
    width: 200
  }
}
export default tableHeader
