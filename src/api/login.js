import request from '@/utils/request'

export function login (userInfo) {
  return request({
    url: '/user/login',
    method: 'post',

    /*
     * `data` is the data to be sent as the request body
     * Only applicable for request methods 'PUT', 'POST', and 'PATCH'
     */
    data: userInfo
  })
}

export function getUserInfo (token) {
  return request({
    url: '/user/getUserInfo',
    methods: 'get',

    /*
     * `params` are the URL parameters to be sent with the request
     * Must be a plain object or a URLSearchParams object
     */
    params: { token }
  })
}
