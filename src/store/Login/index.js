import { reqRegisterCode, reqRegister, reqLogin, reqGetUserInfo, reqLogOut } from '@/api'

// Search模块
const state = {
  code: '',
  token: localStorage.getItem('token'),
  userInfo: {}
}
const mutations = {
  GETREGISTERCODE(state, data) {
    state.code = data
  },
  LOGIN(state, data) {
    state.token = data
  },
  GETUSERINFO(state, data) {
    state.userInfo = data
  },
  LOGOUT(state) {
    state.token = '';
    localStorage.removeItem('token')
    state.userInfo = {}
  }
}

const actions = {
  // 获取验证码
  async getRegisterCode({ commit }, phone) {
    let res = await reqRegisterCode(phone);
    if (res.code === 200) {
      // console.log(res);
      commit('GETREGISTERCODE', res.data)
    }
  },
  // 注册
  async registerAccount({ commit }, data) {
    let res = await reqRegister(data);
    if (res.code === 200) {
      return 'ok'
    } else {
      alert(res.message)
      return 'error'
    }
  },
  async login({ commit }, data) {
    let res = await reqLogin(data)
    if (res.code === 200) {
      commit("LOGIN", res.data.token)
      localStorage.setItem("token", res.data.token)
      return 'ok'
    }
    return Promise.reject(new Error(res.message))
  },
  async getUserInfo({ commit }) {
    let res = await reqGetUserInfo();
    if (res.code === 200) {
      commit('GETUSERINFO', res.data)
      return 'ok'
    }
    return Promise.reject(new Error(res.message))
  },
  // 登出
  async logout({ commit }) {
    let res = await reqLogOut();
    if (res.code === 200) { commit('LOGOUT'); return 'ok' }
    return Promise(new Error(res.message))
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}