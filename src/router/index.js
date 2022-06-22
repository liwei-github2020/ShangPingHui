import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

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
    path: '/search/:keyword?',
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
  {
    name: 'detail',
    path: '/detail/:id?',
    component: () => import('@/views/Detail'),
    meta: {
      isFooterShow: true
    }
  },
  {
    name: 'addcart',
    path: '/addcart',
    component: () => import('@/views/AddCartSuccess'),
    meta: {
      isFooterShow: true
    }
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: () => import('@/views/ShopCart'),
    meta: {
      isFooterShow: true
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savePosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem('token');
  let name = store.state.User.userInfo.name;
  if (token) {
    if (to.path == '/login') {
      next('/home');
    } else {
      // 有用户信息放行，没有则获取用户信息，若获取不到，证明token过期，需重新登录
      if (name) {
        next();
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (err) {
          await store.dispatch('logout');
          next('/login')
        }
      }
    }
  } else {
    next();
  }
})
export default router
