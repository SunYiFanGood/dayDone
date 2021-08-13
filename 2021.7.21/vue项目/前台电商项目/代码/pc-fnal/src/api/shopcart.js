import request from '../utils/request'

// 加入购物车 / 修改商品数量
export const reqAddCart = (skuId, skuNum) => {
  return request({
    method: 'POST',
    url: `/cart/addToCart/${skuId}/${skuNum}`
  })
}

// 获取购物车列表
export const reqGetCartList = () => {
  return request({
    method: 'GET',
    url: `/cart/cartList`
  })
}

// 更新商品isChecked状态
export const reqUpdateCartChecked = (skuId, isChecked) => {
  return request({
    method: 'GET',
    url: `/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 删除商品
export const reqDelCart = (skuId) => {
  return request({
    method: 'DELETE',
    url: `/cart/deleteCart/${skuId}`
  })
}

