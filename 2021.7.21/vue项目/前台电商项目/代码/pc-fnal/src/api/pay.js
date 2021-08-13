import request from '../utils/request'

// 获取订单页面的信息
export const reqGetTradeInfo = () => {
  return request({
    method: 'GET',
    url: `/order/auth/trade`
  })
}

// 提交订单
export const reqSubmitOrder = ({
  tradeNo, // 注意接口文档参数有问题
  consignee,
  consigneeTel,
  deliveryAddress,
  paymentWay,
  orderComment,
  orderDetailList
}) => {
  return request({
    method: 'POST',
    url: `/order/auth/submitOrder`,
    params: {
      tradeNo
    },
    data: {
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList
    }
  })
}

export const reqWeixinPay = (orderId) => {
  return request({
    method: 'GET',
    url: `/payment/weixin/createNative/${orderId}`
  })
}

export const reqQueryPayStatus = (orderId) => {
  return request({
    method: 'GET',
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}
