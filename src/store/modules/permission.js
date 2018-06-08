import { constantRouterMap } from '@/router'

const permission = {
  state: {
    routerMap: ''
  },
  getters: {
    routerMap: state => state.routerMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routerMap = routers
    }
  },
  actions: {
    setRouters ({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', constantRouterMap)
        resolve()
      })
    }
  }
}

export default permission
