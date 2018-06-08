import { login } from '@/api/login'
import { removeAppStatus } from '@/utils/appStatus'

import { getUserId, setUserId, getUsername, setUsername, removeUserInfo } from '@/utils/auth'

const user = {
  state: {
    user: {
      name: getUsername(),
      id: getUserId()
    }
  },
  getters: {
    name: state => state.user.name,
    email: state => state.user.email,
    id: state => state.user.id
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.user.name = name
    },
    SET_EMAIL: (state, email) => {
      state.user.email = email
    },
    SET_ID: (state, id) => {
      state.user.id = id
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          if (data.status) {
            commit('SET_NAME', data.data.name)
            commit('SET_ID', data.data._id)
            setUserId(data.data._id)
            setUsername(data.data.name)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }, state) {
      return new Promise((resolve, reject) => {
        commit('SET_NAME', '')
        commit('SET_EMAIL', '')
        commit('SET_ID', '')
        removeAppStatus()
        removeUserInfo()
        resolve()
      })
    }
  }
}

export default user
