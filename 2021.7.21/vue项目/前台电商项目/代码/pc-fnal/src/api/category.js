import request from '../utils/request'

export const reqGetCategoryList = () => {
  return request({
    method: 'GET',
    url: '/product/getBaseCategoryList'
  })
}