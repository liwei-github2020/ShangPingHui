// Home模块

import { getcategory } from '@/api'

const state = () => {
  categoryList: []
}
const mutations = {
  CATEGORYLIST(state, data) {
    state.categoryList = data
  }
}
const actions = {
  async categoryList({ commit }) {
    let res = await getcategory();
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data);
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}