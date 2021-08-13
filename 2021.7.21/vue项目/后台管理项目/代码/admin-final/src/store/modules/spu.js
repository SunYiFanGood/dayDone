const state = {
  isShow: 1, // 1:显示SpuList 2:显示AddOrUpdateSpu 3:显示AddSku
  spu: {} // 更新时的spu数据
}

const mutations = {
  SET_IS_SHOW(state, isShow) {
    state.isShow = isShow
  },
  SET_SPU(state, spu) {
    state.spu = spu
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
