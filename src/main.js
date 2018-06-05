/*
 * The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */
import Vue from 'vue'
import App from './App'
import router from './router'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

// global css
import '@/styles/index.scss'

import '@/icons'
import store from '@/store'

// simulation data
import '@/mock'

// import Element entirely
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
