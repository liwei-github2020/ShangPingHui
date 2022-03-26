import axios from 'axios';

// 进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const request = axios.create({
  baseUrl: '/api',
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(config => {
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