import axios from 'axios';

// 进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(config => {
  if (store.state.ShopCart.uuid_token) {
    config.headers.userTempId = store.state.ShopCart.uuid_token;
  }
  if (store.state.User.token) {
    config.headers.token = store.state.User.token;
  }
  nprogress.start()
  return config;
})

// 响应拦截器
request.interceptors.response.use(res => {
  nprogress.done()
  return res.data
}, err => {
  nprogress.done()
  return Promise.reject(new Error(err.message))
})


export default request