import Mock from 'mockjs'

import loginAPI from './login'

// 登录
Mock.mock(
  /\/user\/login/, 'post', loginAPI.login
)
Mock.mock(
  /\/user\/getUserInfo/, 'get', loginAPI.getUserInfo
)

export default Mock
