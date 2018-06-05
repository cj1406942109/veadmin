import Mock from 'mockjs'

import loginAPI from './login'
import mrAPI from './mr'

// 登录
Mock.mock(
  /\/user\/login/, 'post', loginAPI.login
)
Mock.mock(
  /\/user\/getUserInfo/, 'get', loginAPI.getUserInfo
)

// 病历
Mock.mock(
  /\/mr\/getMrList/, 'get', mrAPI.getMrList
)

export default Mock
