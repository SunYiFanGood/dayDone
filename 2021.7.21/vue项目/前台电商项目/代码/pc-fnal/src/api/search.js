import request from '../utils/request'

// ๆ็ดขๅๅ
export const reqSearchGoodsList = (
  data
) => {
  return request({
    method: 'POST',
    url: '/list',
    data
  })
}