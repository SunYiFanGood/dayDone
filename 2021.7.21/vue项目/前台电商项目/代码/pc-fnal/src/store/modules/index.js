// 汇总所有vuex的模块
import search from './search'
import detail from './detail'
import user from './user'

// 统一暴露出去
export default {
  search,
  detail,
  user
}