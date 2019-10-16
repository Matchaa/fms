import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      // redirect: { name: 'deliverGoods' },
      component: () => import('../components/layout.vue'),
      children: [
        {
          path: 'delivergoods',
          name: 'deliverGoods',
          component: () => import('../views/deliverGoods')
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('../views/statistics')
        }
      ]
    }
  ]
})
