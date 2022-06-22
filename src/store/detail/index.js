import { reqGetGoodInfo, reqAddCart } from '@/api'

const state = {
  goodInfo: {}
};
const actions = {
  async getGoodInfo({ commit }, id) {
    let res = await reqGetGoodInfo(id);
    if (res.code === 200) {
      commit('GETGOODINFO', res.data)
    }
  },
  // 添加购物车
  async addShopCart({ commit }, params) {
    let res = await reqAddCart(params);
    if (res.code === 200) {
      return Promise.resolve(res.code)
    } else {
      return Promise.reject(new Error('添加购物车失败'))
    }
  }
};
const mutations = {
  GETGOODINFO(state, data) {
    state.goodInfo = data;
  }
};
const getters = {
  categoryView: (state) => state.goodInfo.categoryView || {},
  skuInfo: (state) => state.goodInfo.skuInfo || {},
  spuSaleAttrList: (state) => state.goodInfo.spuSaleAttrList || []
};

export default {
  state,
  mutations,
  actions,
  getters
}