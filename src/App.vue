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
        <div class="login-btn">登录</div>
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
  </div>
</template>
<script>
import * as getData from './api/server'
export default {
  data() {
    return {
      typeList: [],
      typeId: '',
      key: ''
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
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  background: rgb(236, 236, 236);
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
    width: 70px;
    border-radius: 15px;
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
