import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 重写路由的push，解决多次点击跳转控制台报错问题
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

// 重写replace
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      isFooterShow: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      isFooterShow: false
    }
  },
  {
    name: 'search',
    path: '/search/:keywords?',
    component: () => import('@/views/Search'),
    meta: {
      isFooterShow: true
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      isFooterShow: false
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
