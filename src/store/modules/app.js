import {
  getSidebarOpenStatus,
  getSidebarMinStatus,
  getScreenSize,
  setSidebarOpenStatus,
  setSidebarMinStatus,
  setScreenSize
} from '@/utils/appStatus'

const app = {
  state: {
    sidebar: {
      // +"1" => 1
      // +"0" => 0
      // "0" => false
      // "1" => false
      opened: getSidebarOpenStatus(),
      minimized: getSidebarMinStatus()
    },
    backTop: {
      hidden: true
    },
    screen: {
      size: getScreenSize()
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
        setSidebarOpenStatus(1)
      } else {
        setSidebarOpenStatus(0)
      }
    },
    SIDEBAR_OPEN: state => {
      state.sidebar.opened = 1
      setSidebarOpenStatus(1)
    },
    SIDEBAR_CLOSE: state => {
      state.sidebar.opened = 0
      setSidebarOpenStatus(0)
    },
    SIDEBAR_TOGGLE_MIN: state => {
      state.sidebar.minimized = !state.sidebar.minimized
      if (state.sidebar.minimized) {
        setSidebarMinStatus(1)
      } else {
        setSidebarMinStatus(0)
      }
    },
    SET_SCREEN_SIZE: (state, screenSize) => {
      state.screen.size = screenSize
      setScreenSize(screenSize)
    },
    SET_BACK_TOP_STATUS: (state, backTopStatus) => {
      state.backTop.hidden = backTopStatus === 'hidden'
    }
  },
  actions: {
    sidebarToggleOpen ({ commit }) {
      commit('SIDEBAR_TOGGLE_OPEN')
    },
    sidebarOpen ({ commit }) {
      commit('SIDEBAR_OPEN')
    },
    sidebarClose ({ commit }) {
      commit('SIDEBAR_CLOSE')
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
