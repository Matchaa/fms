import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      // redirect: { name: 'deliverGoods' },
      component: () => import('views/login/index.vue')
    },
    {
      path: '/',
      name: 'layout',
      // redirect: { name: 'deliverGoods' },
      component: () => import('components/layout/index.vue'),
      children: [
        {
          path: 'delivergoods',
          name: 'deliverGoods',
          component: () => import('views/deliverGoods')
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('views/statistics')
        },
        {
          path: 'customerinfo',
          name: 'customerInfo',
          component: () => import('views/basicConfig/customerInfo')
        },
        {
          path: 'productconfig',
          name: 'productConfig',
          component: () => import('views/basicConfig/productConfig')
        }
      ]
    }
  ]
})
