import { reqShopCartList, delShopCartList, reqUpdateShopCartListChecked } from "@/api";
import getUuid from '@/utils/uuid_token'

const state = {
  cartInfoList: [],
  uuid_token: getUuid()
}
const actions = {
  async getShopCartList({ commit }) {
    const res = await reqShopCartList();
    if (res.code === 200) {
      commit("GETSHOPCARTLIST", res.data);
    } else {
      return Promise(new Error('获取购物车失败'));
    }
  },
  async deleteShopCartList({ commit }, { skuId }) {
    const res = await delShopCartList(skuId);
    if (res.code === 200) { } else {
      return Promise.reject(new Error('删除购物车失败'));
    }
  },
  async updateShopCartList({ commit }, { skuId, checked }) {
    let res = await reqUpdateShopCartListChecked(skuId, checked);
    if (res.code === 200) {
      return Promise.resolve(res.message)
    } else {
      return Promise.reject(new Error('更新购物车失败'))
    }
  },
  deleteAllCheckedCart({ getters, dispatch }) {
    let promistAll = [];
    getters.cartInfoList.forEach(item => {
      if (item.isChecked === 1) {
        let p = dispatch('deleteShopCartList', { skuId: item.skuId })
        promistAll.push(p);
      }
    })
    return Promise.all(promistAll);
  },
  checkAll({ getters, dispatch }, isChecked) {
    let promistAll = [];
    getters.cartInfoList.forEach(item => {
      let p = dispatch('updateShopCartList', { skuId: item.skuId, checked: isChecked })
      promistAll.push(p);
    })
    return Promise.all(promistAll);
  }
}
const mutations = {
  GETSHOPCARTLIST(state, data) {
    data.length > 0 ? state.cartInfoList = data[0].cartInfoList : state.cartInfoList = [];
  }
}
const getters = {
  cartInfoList: state => state.cartInfoList ?? [],
}

export default {
  state,
  actions,
  getters,
  mutations
}