import Mock from 'mockjs'

// 返回病历列表
const mrList = []
for (let i = 0; i < 10; i++) {
  mrList.push(Mock.mock({
    name: '@cname()',
    gender: /0|1/,
    age: /[2-9][0-9]/,
    contactInfo: /1[1-9]\d{9}/,
    IdCardNo: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
    medicalCardNo: /[0-9]{10}/,
    admissionNo: /[0-9]{10}/,
    bedNo: /[0-9]{3}/,
    doctor: '郭小梅'
  }))
}

export default {
  getMrList: () => {
    return mrList
  }
}
