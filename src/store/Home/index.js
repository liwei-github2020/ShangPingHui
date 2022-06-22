// Home模块

import { getcategory, reqGetBannerList, reqGetFloorList } from '@/api'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, data) {
    state.categoryList = data
  },
  GETBANNERLIST(state, data) {
    state.bannerList = data
  },
  GETFLOORLIST(state, data) {
    state.floorList = data
  }
}
const actions = {
  async categoryList({ commit }) {
    let res = await getcategory();
    if (res.code === 200) {
      commit('CATEGORYLIST', res.data);
    }
  },
  async getBannerList({ commit }) {
    let res = await reqGetBannerList();
    if (res.code === 200) {
      commit('GETBANNERLIST', res.data);
    }
  },
  async getFloorList({ commit }) {
    let res = await reqGetFloorList();
    if (res.code === 200) {
      commit('GETFLOORLIST', res.data)
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