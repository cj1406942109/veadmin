import request from '@/utils/request'

export function getMrList (pageNum, pageSize) {
  return request({
    url: '/record/getPartOfAllRecords',
    method: 'get',
    params: {
      sort: '',
      page: pageNum,
      per_page: pageSize
    }
  })
}

export function getMr (recordId) {
  return request({
    // baseURL: 'http://116.62.148.24:8008',
    url: '/record/getRecord',
    method: 'post',
    data: {
      recordId
    }
  })
}

export function getDoctorList () {
  return request({
    url: '/user/getAllDoctorIdAndName',
    method: 'post'
  })
}

export function getStaticIndex () {
  return request({
    // baseURL: 'http://116.62.148.24:3000',
    url: '/index/getIndex',
    method: 'post'
  })
}
