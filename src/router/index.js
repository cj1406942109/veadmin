import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'

import { getUserId } from '@/utils/auth'

// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

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
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/mr',
    component: Layout,
    redirect: '/mr/index',
    name: 'mr',
    meta: {
      title: '电子病历',
      icon: 'medical-record'
    },
    children: [{
      path: 'index',
      name: 'mr-list',
      component: _import('mr/index'),
      meta: {
        title: '病历列表',
        icon: 'list'
      }
    }, {
      path: 'add',
      name: 'mr-add',
      component: _import('mr/edit'),
      meta: {
        title: '添加病历',
        icon: 'add'
      }
    }, {
      path: 'edit/:id',
      name: 'mr-edit',
      component: _import('mr/edit'),
      hidden: true,
      meta: {
        title: '编辑病历'
      }
    }]
  }
]

const router = new Router({
  routes: constantRouterMap
})

// 拦截器权限控制
router.beforeEach((
  to, from, next
) => {
  // start progress bar
  NProgress.start()

  // 判断cookie中是否有用户id
  if (getUserId()) {
    if (to.path === '/login') {
      next('/login/sub-system')
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done()
    } else {
      next()
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
