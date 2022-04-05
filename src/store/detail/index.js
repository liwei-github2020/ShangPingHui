import { reqGetGoodInfo } from '@/api'

const state = () => {
  goodInfo: { }
};
const actions = {
  async getGoodInfo({ commit }, id) {
    let res = await reqGetGoodInfo(id);
    if (res.code === 200) {
      commit('GETGOODINFO', res.data)
    }
  }
};
const mutations = {
  GETGOODINFO(state, data) {
    state.goodInfo = data;
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}