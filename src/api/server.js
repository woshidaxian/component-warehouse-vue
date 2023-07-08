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
    config.headers.userId = sessionStorage.getItem('userId')||store.state.userId||''
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers.token = sessionStorage.getItem('token')||store.state.token||''
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
        setTimeout(()=>{
          location.href = location.origin
        }, 500)
        store.state.isLogin = false
        store.state.userId = null
        store.state.userAccount = null
        store.state.token = null
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
// 账号注册
export const register = (data) => service.post('/api/user/register', JSON.stringify(data))

// 账号登录
export const login = (data) => service.post('/api/user/login', JSON.stringify(data))

// 校验是否管理员
export const checkUser = () => service.post('/api/user/checkUser')

// 组件类型列表
export const typeList = (params) => service.get('/api/component/typeList', {params: params})

// 组件列表
export const getComponentList = (params) => service.get('/api/component/list',{params:params})

// 组件详情
export const getComponentDetail = (params) => service.get('/api/component/detail', {params:params})

// 获取组件下载地址
export const downUrl = (params) => service.get('/api/component/download', {params: params})

// 操作日志列表
export const logList = (params) => service.get('/api/log/list', {params:params})

// 操作日志删除
export const delLog = (data) => service.post('/api/log/del', JSON.stringify(data))

// 用户列表
export const userList = (params) => service.get('/api/user/list', {params:params})

// 用户删除
export const userDel = (data) => service.post('/api/user/del', JSON.stringify(data))

// 改变用户状态
export const changeUser = (data) => service.post('/api/user/change', JSON.stringify(data))

// 注册码列表
export const codeList = (params) => service.get('/api/invite/list', {params:params})

// 新增注册码
export const buildCode = (data) => service.post('/api/invite/build', JSON.stringify(data))

// 删除邀请码
export const delCode = (data) => service.post('/api/invite/del', JSON.stringify(data))

// 添加组件类型
export const addType = (data) => service.post('/api/component/addType', JSON.stringify(data))

// 组件类型名重复校验
export const checkTypeName = (data) => service.post('/api/component/typeCheck', JSON.stringify(data))

// 类型标签重命名
export const resetTypeName = (data) => service.post('/api/component/resetType', JSON.stringify(data))

// 获取上传文件的token
export const getToken = () => service.get('/api/component/oss')

// 添加组件
export const addComponent = (data) => service.post('/api/component/add', JSON.stringify(data))

// 组件删除
export const delComponenet = (data) => service.post('/api/component/del', JSON.stringify(data))

// 改变组件状态
export const changeComponentState = (data) => service.post('/api/component/changeState', JSON.stringify(data))

// 组件更新
export const updateComponent = (data) => service.post('/api/component/update', JSON.stringify(data))

// 退出登录
export const loginOut = () => service.post('/api/user/out')