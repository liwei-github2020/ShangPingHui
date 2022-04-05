import { reqGetSearchInfo } from '@/api'

// Search模块
const state = () => {
  searchInfo: { }
}

const mutations = {
  GETSEARCHINFO(state, data) {
    state.searchInfo = data
  }
}

const actions = {
  async getSearchInfo({ commit }, queryOptions) {
    let res = await reqGetSearchInfo(queryOptions)
    if (res.code === 200) {
      commit("GETSEARCHINFO", res.data)
    }
  }
}

const getters = {
  goodsList: (state) => state.searchInfo.goodsList || [],
  attrsList: (state) => state.searchInfo.attrsList || [],
  trademarkList: (state) => state.searchInfo.trademarkList || [],
  total: (state) => state.searchInfo.total || 0
}

export default {
  state,
  mutations,
  actions,
  getters
}