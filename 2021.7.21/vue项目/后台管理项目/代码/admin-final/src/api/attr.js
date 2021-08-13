import request from '@/utils/request'

// 获取属性列表
export function reqGetAttrList({ category1Id, category2Id, category3Id }) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
  })
}

// 添加、更新属性值
export function reqSaveAttrInfo({
  id,
  attrName,
  attrValueList,
  categoryId,
  categoryLevel
}) {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'POST',
    data: {
      id,
      attrName,
      attrValueList,
      categoryId,
      categoryLevel
    }
  })
}
