import requestMock from '../utils/requesMock'

export const reqGetBanners = () => {
  return requestMock({
    method: 'GET',
    url: '/banners'
  })
}

export const reqGetFloors = () => {
  return requestMock({
    method: 'GET',
    url: '/floors'
  })
}