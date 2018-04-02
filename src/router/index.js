import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import Login from '@/views/Login'

import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    // 后期修改为 lazy-loading 方式
    // detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
    { path: '/login', component: Login },
    {
      path: '',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {path: 'dashboard', name: 'Dashboard', component: Dashboard, meta: { title: 'Dashboard', icon: 'dashboard' }}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // 判断cookie中是否有token
  if (getToken()) {
    console.log(getToken())
    // 如果有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // 判断是否需要拉取用户信息
      if (store.getters.email === '') {
        store.dispatch('GetUserInfo').then(res => {
          next()
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
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
