import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import Login from '@/views/Login'

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
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

export default router
