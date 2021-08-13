import {
  reqGetCategory1List,
  reqGetCategory2List,
  reqGetCategory3List
} from '@api/category'

const state = {
  category1Id: '',
  category2Id: '',
  category3Id: '',
  category1List: [],
  category2List: [],
  category3List: []
}

const mutations = {
  GET_CATEGORY_1LIST: (state, category1List) => {
    state.category1List = category1List
  },
  GET_CATEGORY_2LIST: (state, { category2List, category1Id }) => {
    state.category2List = category2List
    state.category1Id = category1Id
    // 清空三级分类数据
    state.category3List = []
  },
  GET_CATEGORY_3LIST: (state, { category3List, category2Id }) => {
    state.category3List = category3List
    state.category2Id = category2Id
  },
  SET_CATEGORY_3ID(state, category3Id) {
    state.category3Id = category3Id
  }
}

const actions = {
  async getCategory1List({ commit }) {
    const res = await reqGetCategory1List()
    commit('GET_CATEGORY_1LIST', res.data)
  },
  async getCategory2List({ commit }, category1Id) {
    const res = await reqGetCategory2List(category1Id)
    commit('GET_CATEGORY_2LIST', { category2List: res.data, category1Id })
  },
  async getCategory3List({ commit }, category2Id) {
    const res = await reqGetCategory3List(category2Id)
    commit('GET_CATEGORY_3LIST', { category3List: res.data, category2Id })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
