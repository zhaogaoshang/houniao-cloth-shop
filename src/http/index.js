import axios from 'axios'
// import api from './api'
import Qs from 'qs'

import store from '../store'

const axiosWrap = axios.create({
  // baseURL: api.host,
  // baseURL: '/api',
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  }
})

// 添加请求拦截器
axiosWrap.interceptors.request.use(function (config) {
  config.headers.token = store.state.user.token

  if (config.headers['Content-Type'] === 'multipart/form-data') {
    console.log(config)
  } else {
    if (config.method === 'get') {
      config.params = {
        ...store.state.user.userInfo,
        ...config.params
      }
    } else {
      config.data = {
        ...store.state.user.userInfo,
        ...config.data
      }
    }
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axiosWrap.interceptors.response.use(function (response) {
  // console.log(response)
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // alert('服务器忙')
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axiosWrap
