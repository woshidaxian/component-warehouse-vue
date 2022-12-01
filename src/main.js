import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import components from './components/'
import './config/utils'

Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  console.log(name);
  Vue.component(`h${name}`, components[key])
});

let token = sessionStorage.getItem('token')
if(token){
  store.state.isLogin = true
  store.state.token = token
  store.state.userAccount = sessionStorage.getItem('account')
}

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
