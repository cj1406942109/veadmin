import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'

import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie
import { Message } from 'element-ui'

// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

// 固定路由
export const constantRouterMap = [
  { path: '/login', component: _import('login/index') },
  { path: '/login/sub-system', component: _import('login/subSystem') },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: _import('dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

// 根据权限不同动态生成的路由
export const asyncRouterMap = [
  {
    path: '/emrs',
    component: Layout,
    redirect: '/emrs/index',
    name: 'emrs',
    meta: {
      title: '电子病历',
      icon: 'medical-record'
    },
    children: [{
      path: 'index',
      name: 'list',
      meta: {
        title: '病历列表',
        icon: 'list'
      }
    }, {
      path: 'add',
      name: 'edit',
      meta: {
        title: '添加病历',
        icon: 'add'
      }
    }]
  },
  {
    path: '/bd-query',
    component: Layout,
    redirect: '/bd-query/index',
    children: [{
      path: 'index',
      name: 'bd-query',
      meta: {
        title: '大数据查询',
        icon: 'query'
      }
    }]
  },
  {
    path: '/health-edu',
    component: Layout,
    redirect: '/health-edu/index',
    children: [{
      path: 'index',
      name: 'health-edu',
      meta: {
        title: '健康教育',
        icon: 'education'
      }
    }]
  },
  {
    path: '/interactive-sys',
    component: Layout,
    redirect: '/interactive-sys/index',
    children: [{
      path: 'index',
      name: 'interactive-sys',
      meta: {
        title: '交互系统',
        icon: 'interactive'
      }
    }]
  }
]

const router = new Router({
  routes: constantRouterMap
})

// 拦截器权限控制

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // 判断cookie中是否有token
  if (getToken()) {
    // 如果有token
    if (to.path === '/login') {
      next({ path: '/login/sub-system' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // 判断是否需要拉取用户信息
      if (store.getters.email === '') {
        store.dispatch('GetUserInfo').then(res => {
          store.dispatch('GenerateRoutes').then(() => {
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
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
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
