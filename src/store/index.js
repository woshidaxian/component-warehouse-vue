import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchKey: '',
    isLogin: false,
    token: '',
    userAccount: 'HWG',
    userId: ''
  },
  mutations: {
    loginOut(){
      this.state.token = null
      this.state.userAccount = ''
      this.state.userId = ''
      this.state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
