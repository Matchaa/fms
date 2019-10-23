import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexDBVersion: 1
  },
  mutations: {
    changeIndexDBVersion(state) {
      state.indexDBVersion += 1
    }
  },
  actions: {}
})
