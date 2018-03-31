import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', hidden: true },
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
