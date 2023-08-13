import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import components from './components/'
import './config/utils'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  console.log(name);
  Vue.component(`h${name}`, components[key])
});

let token = sessionStorage.getItem('token')
if(token){
  store.state.isLogin = true
  store.state.token = token
  store.state.userAccount = sessionStorage.getItem('userAccount')
  store.state.userId = sessionStorage.getItem('userId')
}

Vue.prototype.$showImage = function(url){
  return url.replace('http://file.wghuang.fun', process.env.VUE_APP_FILE_ROOT)
}

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
