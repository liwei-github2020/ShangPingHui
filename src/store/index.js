import Vue from 'vue'
import Vuex from 'vuex'
import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import ShopCart from './ShopCart'
import User from './Login'

// 防止刷新vuex初始化页面无数据问题
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home,
    Search,
    Detail,
    ShopCart,
    User
  },
  // plugins: [vuexLocal.plugin]
})
