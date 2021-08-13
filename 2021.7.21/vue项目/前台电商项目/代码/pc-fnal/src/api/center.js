import request from '../utils/request'

export const reqGetOrderList = (page, limit) => {
  return request({
    method: "GET",
    url: `/order/auth/${page}/${limit}`
  })
}