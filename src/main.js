import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Pagination, Button } from 'element-ui';
Vue.use(Pagination)

Vue.config.productionTip = false

// 注册全局组件
import TypeNav from '@/views/Home/TypeNav'
Vue.component(TypeNav.name, TypeNav)

// 引入mock
import '@/mock/mockServe'


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
