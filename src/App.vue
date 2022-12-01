<template>
  <div id="app">
    <header>
      <div>
        <span class="title">组件仓库-VUE</span>
        <input type="text" v-model="key" placeholder="输入关键词搜索..." class="inp-search">
        <el-select v-model="typeId" placeholder="请选择组件类型" size="small" filterable clearable @change="search">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="btn-search" @click="search">搜&nbsp;&nbsp;索</span>
      </div>
      <div style="display: flex">
        <div class="btn-subscrible">使用说明</div>
        <div class="login-btn" @click="showLogin=true" v-if="!$store.state.isLogin">登录</div>
        <div class="register-btn" v-if="!$store.state.isLogin">注册</div>
        <div class="user-info" v-else>
          <i class="el-icon-user"></i>
          <span>{{$store.state.userAccount}}</span>
          <div>个人中心</div>
        </div>
      </div>
    </header>
    <router-view ref="page"/>
    <footer>
      版权所有All Rights Reserved http://component.wghuang.fun&nbsp;|&nbsp;
      <a href="https://beian.miit.gov.cn/" target="blank">
        浙ICP备2021016384号-3
      </a>&nbsp;|&nbsp;
      <a href="http://find.wghuang.fun" target="blank">
        搜分支
      </a>&nbsp;|&nbsp;
      <span class="back-btn" @click="goBack">后台管理</span>
    </footer>
    <h-login v-if="showLogin"></h-login>
  </div>
</template>
<script>
import * as getData from './api/server'
export default {
  data() {
    return {
      typeList: [],
      typeId: '',
      key: '',
      showLogin: false
    }
  },
  mounted() {
    this.getTypeList()
  },
  methods: {
    goBack() {
      this.$router.push('/back')
    },
    getTypeList(){
      getData.typeList({pageSize: 100}).then(res=>{
        if(res.data.code == 1){
          this.typeList = res.data.data.list
        }
      })
    },
    search(){
      this.$refs['page'].search(this.typeId, this.key)
    }
  },
}
</script>
<style lang="scss">
html,body{
  height: 100%;
  overflow: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  background: rgb(236, 236, 236);
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*{
  padding: 0;
  margin: 0;
}
header{
  width: calc(100% - 30px);
  padding: 0 15px;
  height: 55px;
  background: #005bb6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  .title{
    font-size: 15px;
    color: #fff;
    font-weight: bold;
  }
  .inp-search{
    width: 300px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    outline: none;
    border: none;
    margin-left: 20px;
    text-indent: 1em;
    margin-right: 25px;
  }
  .btn-search{
    display: inline-block;
    color: #fff;
    margin-left: 20px;
    font-weight: bold;
    cursor: pointer;
    background: #00458b;
    text-align: center;
    line-height: 30px;
    width: 100px;
    border-radius: 15px;
    transition: all .3s;
    &:hover{
      background: #fff;
      color: #005bb6;
    }
  }
  .login-btn{
    width: 60px;
    height: 25px;
    line-height: 25px;
    border-radius: 13px;
    background: #fff;
    color: #005bb6;
    cursor: pointer;
  }
  .register-btn{
    background: #00458b;
    color: #fff;
    width: 60px;
    height: 25px;
    line-height: 25px;
    border-radius: 13px;
    cursor: pointer;
    margin-left: 10px;
  }
  .user-info{
    display: flex;
    align-items: center;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    div{
      margin-left: 20px;
      &:hover{
        text-decoration: underline;
      }
    }
    i{
      margin-right: 5px;
      color: #fff;
      font-size: 15px;
    }
  }
  .btn-subscrible{
    color: rgba(255, 255, 255, 0.767);
    font-weight: bold;
    margin-right: 30px;
    line-height: 25px;
    cursor: pointer;
  }
}
footer{
  border-top: 1px solid rgb(218, 218, 218);
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  width: 100%;
  color: #8f8f8f;
  font-size: 12px;
  background: rgb(236, 236, 236);
  a{
    text-decoration: none;
    color: #005bb699;
  }
}
.back-btn{
  cursor: pointer;
  text-decoration: underline;
}
</style>
