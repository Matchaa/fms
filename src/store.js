import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeTable: [
      {
        name: 'CUSTOMER_DATA',
        key: 'id',
        indexes: [
          {
            name: 'name',
            key: 'name',
            unique: false
          },
          {
            name: 'phone',
            key: 'phone',
            unique: false
          }
        ]
      },
      {
        name: 'PRODUCT_DATA',
        key: 'id',
        indexes: [
          {
            name: 'name',
            key: 'name',
            unique: true
          }
        ]
      },
      {
        name: 'DELIVERYNOTE_DATA',
        key: 'id',
        indexes: [
          {
            name: 'number', // 送货单号
            key: 'number',
            unique: true
          },
          {
            name: 'name', // 客户名称
            key: 'name',
            unique: false
          },
          {
            name: 'date',
            key: 'date',
            unique: false
          }
        ]
      }
      // {
      //   name: 'STATISTICS_DATA',
      //   key: 'id',
      //   indexes: [
      //     {
      //       name: 'number', // 送货单号
      //       key: 'number',
      //       unique: true
      //     },
      //     {
      //       name: 'name',
      //       key: 'customerName',
      //       unique: false
      //     },
      //     {
      //       name: 'date',
      //       key: 'date',
      //       unique: false
      //     }
      //   ]
      // }
    ],
    userInfo: {}
  },
  getters: {
    indexDBVersion(state) {
      return state.storeTable.length
    }
  },
  mutations: {
    changeUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {}
})
