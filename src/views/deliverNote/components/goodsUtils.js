import indexedDB from '@/utils/indexDB.js'

indexedDB.getData('PRODUCT_DATA').then(res => {
  tableHeader.productName.list = res
})
// const productList = () => {
//   return indexedDB.getData('PRODUCT_DATA').then(res => res)
// }
const setValue = (self, scope, param, value) => {
  const { $index: index, row } = scope
  row[param] = value || ''
  self.$set(self.tableData, index, row)
}
function standardsChange(self, scope, param) {
  const obj = { generalStandards: '净尺寸', additionalStandards: '毛尺寸' }
  const { $index: index, row } = scope
  const standard = row[param].split('*')
  if (standard.length !== 3) {
    setValue(self, scope, param)
    self.$message.warning(`请按照参考格式输入${obj[param]}规格！`)
    return
  }
  let isAccord = standard.every(item => {
    return item >= 0
  })
  if (!isAccord) {
    setValue(self, scope, param)
    self.$message.warning(`${obj[param]}规格只能为大于等于0的数字！`)
    return
  }
  const otherParam = param.includes('general')
    ? 'additionalStandards'
    : 'generalStandards'
  if (row[otherParam] === '') return
  const other = row[otherParam].split('*')
  const sum = standard
    .map((item, index) => {
      return Number(item) + Number(other[index])
    })
    .reduce((accumulator, currentValue) => accumulator * currentValue)
  const size = (sum * 7.85 * 0.000001).toFixed(2)
  const weight = size * row.amount
  const price = weight * row.unitPrice
  setValue(self, scope, 'size', size)
  setValue(self, scope, 'weight', weight)
  setValue(self, scope, 'price', price)
  setValue(self, scope, 'totalPrice', price)
}
const tableHeader = {
  productName: {
    title: '产品名称',
    type: 'select',
    list: [],
    change: (self, scope) => {
      const { $index: index, row } = scope
      row.productType = tableHeader.productName.list.find(item => {
        return item.id === row.productName
      }).typeId
      self.$set(self.tableData, index, row)
    }
  },
  generalStandards: {
    title: '净尺寸规格',
    type: 'input',
    change: (self, scope) => {
      standardsChange(self, scope, 'generalStandards')
    }
  },
  additionalStandards: {
    title: '毛尺寸规格',
    type: 'input',
    change: (self, scope) => {
      standardsChange(self, scope, 'additionalStandards')
    }
  },
  amount: {
    title: '件数',
    type: 'inputNumber',
    precision: 0,
    change: (self, scope) => {
      const { row } = scope
      if (row.size === '') return
      setValue(self, scope, 'weight', row.size * row.amount)
    }
  },
  weight: {
    title: '重量',
    name: 'weight',
    type: 'input',
    disabled: true,
    change: (self, scope) => {
      const { row } = scope
      setValue(self, scope, 'price', row.unitPrice * row.weight.toFixed(2))
    }
  },
  unitPrice: {
    title: '单价',
    name: 'unitPrice',
    precision: 2,
    type: 'inputNumber',
    change: (self, scope) => {
      const { row } = scope
      setValue(self, scope, 'price', row.unitPrice * row.weight.toFixed(2))
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
    type: 'inputNumber'
  },
  machining: {
    title: '精加工',
    name: 'machining',
    precision: 2,
    type: 'inputNumber'
  },
  flashSide: {
    title: '飞边',
    name: 'flashSide',
    precision: 2,
    type: 'inputNumber'
  },
  gasCut: {
    title: '气割费',
    name: 'gasCut',
    precision: 2,
    type: 'inputNumber'
  },
  saw: {
    title: '锯费',
    name: 'saw',
    precision: 2,
    type: 'inputNumber'
  },
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
