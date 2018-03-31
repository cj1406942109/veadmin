import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      // +"1" => 1
      // +"0" => 0
      // "0" => false
      // "1" => false
      opened: +Cookies.get('sidebarOpenStatus'),
      minimized: +Cookies.get('sidebarMinStatus')
    },
    backTop: {
      hidden: true
    },
    screen: {
      size: Cookies.get('screenSize')
    }
  },
  getters: {
    sidebar: state => state.sidebar,
    screen: state => state.screen,
    backTop: state => state.backTop
  },
  mutations: {
    SIDEBAR_TOGGLE_OPEN: state => {
      state.sidebar.opened = !state.sidebar.opened
      if (state.sidebar.opened) {
        Cookies.set('sidebarOpenStatus', 1)
      } else {
        Cookies.set('sidebarOpenStatus', 0)
      }
    },
    SIDEBAR_TOGGLE_MIN: state => {
      state.sidebar.minimized = !state.sidebar.minimized
      if (state.sidebar.minimized) {
        Cookies.set('sidebarMinStatus', 1)
      } else {
        Cookies.set('sidebarMinStatus', 0)
      }
    },
    SET_SCREEN_SIZE: (state, screenSize) => {
      state.screen.size = screenSize
      Cookies.set('screenSize', screenSize)
    },
    SET_BACK_TOP_STATUS: (state, backTopStatus) => {
      state.backTop.hidden = backTopStatus === 'hidden'
    }
  },
  actions: {
    sidebarToggleOpen ({ commit }) {
      commit('SIDEBAR_TOGGLE_OPEN')
    },
    sidebarToggleMin ({ commit }) {
      commit('SIDEBAR_TOGGLE_MIN')
    },
    setScreenSize ({ commit }, screenSize) {
      commit('SET_SCREEN_SIZE', screenSize)
    },
    setBackTopStatus ({ commit }, backTopStatus) {
      commit('SET_BACK_TOP_STATUS', backTopStatus)
    }
  }
}

export default app
