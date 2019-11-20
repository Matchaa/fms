import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import store from '../store'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      // redirect: { name: 'deliverNote' },
      component: () => import('views/login/index.vue')
    },
    {
      path: '/',
      name: 'layout',
      // redirect: { name: 'deliverNote' },
      component: () => import('components/layout/index.vue'),
      children: [
        {
          path: 'delivernote',
          name: 'deliverNote',
          component: () => import('views/deliverNote')
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
router.beforeEach((to, from, next) => {
  if (['login', 'layout'].includes(to.name)) {
    next()
    return
  }
  if (store.state.userInfo.name) {
    next()
  } else {
    if (Cookies.get('token')) {
      store.commit('changeUserInfo', {
        name: '管理员'
      })
      next()
    } else {
      router.push({ name: 'login' })
      Message.error({ showClose: true, message: '登录已过期，请重新登录' })
    }
  }
})
export default router
