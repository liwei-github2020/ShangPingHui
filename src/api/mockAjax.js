import axios from 'axios';
// 进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const mockreq = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})

// 请求拦截器
mockreq.interceptors.request.use(config => {
  nprogress.start()
  return config;
})

// 响应拦截器
mockreq.interceptors.response.use(res => {
  nprogress.done()
  return res.data;
}, err => {
  nprogress.done()
  return Promise.reject(new Error(err.message))
})


export default mockreq