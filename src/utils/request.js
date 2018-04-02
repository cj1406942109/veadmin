import axios from 'axios'
import { Message } from 'element-ui'
import config from '@/config'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  // api的base_url
  baseURL: config.base_api_url,
  // request timeout
  timeout: 5000
})

service.interceptors.request.use(config => {
  // 在请求发出之前进行操作
  if (store.getters.token) {
    config.headers['VEAdmin-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    console.log('error' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
