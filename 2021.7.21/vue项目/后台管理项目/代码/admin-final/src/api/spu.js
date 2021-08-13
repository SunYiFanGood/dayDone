import request from '@/utils/request'

// 获取SPU分页列表
export function reqGetSpuList({ page, limit, category3Id }) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: {
      category3Id
    }
  })
}

// 获取基础销售属性列表
export function reqGetBaseSaleAttrList() {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'GET'
  })
}

// 保存SPU数据
export function reqSaveSpuInfo({
  category3Id,
  description,
  spuImageList,
  spuName,
  spuSaleAttrList,
  tmId
}) {
  return request({
    url: `/admin/product/saveSpuInfo`,
    method: 'POST',
    data: {
      category3Id,
      description,
      spuImageList,
      spuName,
      spuSaleAttrList,
      tmId
    }
  })
}

// 更新SPU数据
export function reqUpdateSpuInfo({
  id,
  category3Id,
  description,
  spuImageList,
  spuName,
  spuSaleAttrList,
  tmId
}) {
  return request({
    url: `/admin/product/updateSpuInfo`,
    method: 'POST',
    data: {
      id,
      category3Id,
      description,
      spuImageList,
      spuName,
      spuSaleAttrList,
      tmId
    }
  })
}

// 获取SPU图片列表
export function reqGetSpuImageList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
  })
}
// 获取SPU销售属性列表
export function reqGetSpuSaleAttrList(spuId) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'GET'
  })
}

// 保存SKU
export function reqSaveSkuInfo({
  category3Id,
  price,
  skuAttrValueList,
  skuDefaultImg,
  skuDesc,
  skuImageList,
  skuName,
  skuSaleAttrValueList,
  spuId,
  tmId,
  weight
}) {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'POST',
    data: {
      category3Id,
      price,
      skuAttrValueList,
      skuDefaultImg,
      skuDesc,
      skuImageList,
      skuName,
      skuSaleAttrValueList,
      spuId,
      tmId,
      weight
    }
  })
}
