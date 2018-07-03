import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'

import store from '@/store'
// getToken from cookie
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: _import('login/index') },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: _import('dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  }
]

// 根据权限不同动态生成的路由
export const asyncRouterMap = []

const router = new Router({
  routes: constantRouterMap
})

// 拦截器权限控制
router.beforeEach((
  to, from, next
) => {
  // start progress bar
  NProgress.start()

  // 判断cookie中是否有token
  if (getToken()) {
    if (to.path === '/login') {
      next('/dashboard')
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done()
    } else {
      // 判断是否需要拉取用户信息
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          store.dispatch('GenerateRoutes').then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('Logout').then(() => {
            Message.error('身份信息验证失败，请重新登录')
            next('/login')
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (to.path === '/login') {
      // 如果要访问的页面为登录页面，继续
      next()
    } else {
      // 否则，重定向到登录页面
      next('/login')
      // if current page is login will not trigger afterEach hook, so manually handle it
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
