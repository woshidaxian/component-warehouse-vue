<template>
  <div id="app">
    <header>
      <div>
        <span class="title">组件仓库-VUE</span>
        <input type="text" placeholder="输入关键词搜索（作者、组件关键词）..." class="inp-search">
        <span class="btn-search">搜索</span>
      </div>
      <div style="display: flex">
        <div class="btn-subscrible">使用说明</div>
        <div class="login-btn">登录</div>
      </div>
    </header>
    <router-view/>
    <footer>
      版权所有All Rights Reserved http://component.wghuang.fun
      <a href="https://github.com/woshidaxian" target="blank">
        （https://github.com/woshidaxian）
      </a>
      <span class="back-btn" @click="goBack">后台管理</span>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    goBack() {
      this.$router.push('/back')
    }
  },
}
</script>
<style lang="scss">
html,body{
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
  height: 50px;
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
    font-family: 黑体;
    font-weight: bold;
  }
  .inp-search{
    width: 250px;
    height: 25px;
    border-radius: 13px;
    outline: none;
    border: none;
    margin-left: 20px;
    text-indent: 1em;
  }
  .btn-search{
    display: inline-block;
    color: #fff;
    margin-left: 20px;
    font-weight: bold;
    cursor: pointer;
    background: #00458b;
    padding: 4px 18px;
    border-radius: 10px;
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
}
</style>
