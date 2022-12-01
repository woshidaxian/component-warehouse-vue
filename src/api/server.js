import axios from 'axios'
import { Message } from 'element-ui'
import store from './../store'

// 创建axios实例
const service = axios.create({
  timeout: 1000 * 15,
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.userId = sessionStorage.getItem('userId')
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers.token = sessionStorage.getItem('token')||store.state.token
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const { code, message } = response.data
      if (code === 1) {
        return response
      } else if (code === 0) {
        Message.warning(JSON.stringify(message))
        sessionStorage.clear()
        location.href = location.origin
        return response
      } else {
        Message.error(JSON.stringify(message))
        return response
      }
    } else {
      Message.error(response.status + response.statusText)
      return response
    }
  },
  error => {
    Message.error(error.message)
  }
)

// 组件类型列表
export const typeList = (params) => service.get('/api/component/typeList', {params: params})

// 组件列表
export const getComponentList = (params) => service.get('/api/component/list',{params:params})