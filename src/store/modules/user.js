import { login, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: {
      nickname: '',
      username: '',
      gender: 0,
      userType: {},
      email: '',
      phone: '',
      avatar: '',
      roles: [],
      userStatus: 0
    },
    token: getToken()
  },
  getters: {
    nickname: state => state.user.nickname,
    username: state => state.user.username,
    gender: state => state.user.gender,
    userType: state => state.user.userType,
    email: state => state.user.email,
    phone: state => state.user.phone,
    avatar: state => state.user.avatar,
    userStatus: state => state.user.userStatus,
    roles: state => state.user.roles,
    token: state => state.token
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICKNAME: (state, nickname) => {
      state.user.nickname = nickname
    },
    SET_USERNAME: (state, username) => {
      state.user.username = username
    },
    SET_GENDER: (state, gender) => {
      state.user.gender = gender
    },
    SET_USER_TYPE: (state, userType) => {
      state.user.userType = userType
    },
    SET_EMAIL: (state, email) => {
      state.user.email = email
    },
    SET_PHONE: (state, phone) => {
      state.user.phone = phone
    },
    SET_AVATAR: (state, avatar) => {
      state.user.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.user.roles = roles
    },
    SET_USER_STATUS: (state, userStatus) => {
      state.user.userStatus = userStatus
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_NICKNAME', data.nickname)
          commit('SET_USERNAME', data.username)
          commit('SET_GENDER', data.gender)
          commit('SET_USER_TYPE', data.userType)
          commit('SET_EMAIL', data.email)
          commit('SET_PHONE', data.phone)
          commit('SET_AVATAR', data.avatar)
          commit('SET_ROLES', data.roles)
          commit('SET_USER_STATUS', data.userStatus)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }, state) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
