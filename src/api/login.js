import request from '@/utils/request'

export function login (userInfo) {
  return request({
    url: '/user/checkLogin',
    method: 'post',

    /*
     * `data` is the data to be sent as the request body
     * Only applicable for request methods 'PUT', 'POST', and 'PATCH'
     */
    data: {
      phoneOrEmail: userInfo.username,
      password: userInfo.password
    }
  })
}
