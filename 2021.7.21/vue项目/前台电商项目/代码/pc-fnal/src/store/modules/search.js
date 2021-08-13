import { reqSearchGoodsList } from '../../api/search'
// 存储数据
const state = {
  // 三个列表：为了给组件展示
  goodsList: [], // 商品列表
  trademarkList: [], // 品牌列表
  attrsList: [], // 属性列表
  // 给分页器使用
  total: 0, // 总数
}

// 存储只读的计算属性数据
const getters = {};

// 间接更新的方法（往往发送请求）
const actions = {
  async searchGoodsList({ commit }, options) {
    // options就是搜索条件，由外面使用时传入
    try {
      const res = await reqSearchGoodsList(options)
      commit('SEARCH_GOODS_LIST', res)
    } catch (e) {
      console.log(e);
    }
  }
}

// 直接更新的方法
const mutations = {
  SEARCH_GOODS_LIST(state, res) {
    state.total = res.total;
    state.goodsList = res.goodsList;
    state.trademarkList = res.trademarkList;
    state.attrsList = res.attrsList;
  }
}

export default {
  namespaced: true, // 启用命名空间
  state,
  getters,
  actions,
  mutations
}