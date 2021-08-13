import { reqLogin, reqLogout } from '../../api/user'

// 初始化数据从 localStorage 中读取
const state = JSON.parse(localStorage.getItem('user'))
  || JSON.parse(sessionStorage.getItem('user'))
  || {
  name: '',
  nickName: '',
  token: ''
}

const getters = {}

const actions = {
  async login({ commit }, { phone, password }) {
    try {
      const res = await reqLogin({ phone, password })
      commit('LOGIN', res);
      // action 函数的返回值
      // 外面调用 action 函数,返回值是一个 promise 对象(原因是当前 action 函数是 async 函数)
      // 而这个 promsie 对象内部返回值就是 return 的 res
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  async logout({ commit }) {
    try {
      await reqLogout()
      commit('LOGOUT');
    } catch (e) {
      console.log(e);
    }
  },
}
const mutations = {
  LOGIN(state, res) {
    state.name = res.name
    state.nickName = res.nickName
    state.token = res.token
  },
  LOGOUT(state) {
    state.name = '';
    state.nickName = '';
    state.token = '';
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}