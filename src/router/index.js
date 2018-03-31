import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

export default new Router({
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
