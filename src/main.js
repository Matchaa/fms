import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vlf from 'vlf'
import indexedDB from '@/utils/indexDB.js'
import './assets/icons' // icon
Vue.config.productionTip = false
Vue.use(Vlf)
Vue.use(indexedDB)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
