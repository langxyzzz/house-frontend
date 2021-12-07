const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i,
    areaName: 'areaName' + i,
    streetName: 'streetName' + i,
    communityName: 'communityName' + i,
    updateUser: 'updateUser' + i,
    updateTime: 'updateTime' + i
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/area/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, sort } = config.query

      let mockList = List

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
