import { getMr, getDoctorList, getStaticIndex } from '@/api/mr'

const mr = {
  state: {
    doctorList: '',
    staticIndex: '',
    emptyMr: ''
  },
  getters: {
    doctorList: state => state.doctorList,
    staticIndex: state => state.staticIndex,
    emptyMr: state => state.emptyMr
  },
  mutations: {
    SET_DOCTOR_LIST: (state, doctorList) => {
      state.doctorList = doctorList
    },
    SET_STATIC_INDEX: (state, staticIndex) => {
      state.staticIndex = staticIndex
    },
    SET_EMPTY_MR: (state, emptyMr) => {
      state.emptyMr = emptyMr
    }
  },
  actions: {
    GetDoctorList ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDoctorList().then(response => {
          const data = response.data
          commit('SET_DOCTOR_LIST', data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetStaticIndex ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getStaticIndex().then(response => {
          const data = response.data
          commit('SET_STATIC_INDEX', data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetEmptyMr ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMr().then(response => {
          const data = response.data
          commit('SET_EMPTY_MR', data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default mr
