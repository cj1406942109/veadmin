import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import mr from './modules/mr'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    mr
  }
})

export default store
