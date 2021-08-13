import request from '../utils/request'

// 搜索商品
export const reqSearchGoodsList = (
  data
) => {
  return request({
    method: 'POST',
    url: '/list',
    data
  })
}