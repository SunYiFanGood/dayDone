import { reqGetUsers } from "../../api/users";

const state = {
  users: [],
  total: 0,
};

const getters = {};

const actions = {
  // 外面传递参数，只能传递一个
  async getUsers({ commit }, { page, limit }) {
    // 发送请求
    const res = await reqGetUsers(page, limit);
    console.log(res); // total 总数  data 用户列表
    commit("GET_USERS", res);
  },
};

const mutations = {
  GET_USERS(state, res) {
    state.users = res.data;
    state.total = +res.headers['x-total-count'];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
