<template>
  <div id="app">
    <header>
      <div>
        <span class="title">组件仓库-VUE</span>
        <input type="text" placeholder="输入关键词搜索..." class="inp-search">
      </div>
      <div class="login-btn">登录</div>
    </header>
    <router-view/>
    <footer>
      版权所有All Rights Reserved 
      <a href="https://github.com/woshidaxian" target="blank">
        https://github.com/woshidaxian
      </a>
      <!-- <span>请联系wghuangzj@sina.com</span> -->
    </footer>
  </div>
</template>

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
  .login-btn{
    width: 60px;
    height: 25px;
    line-height: 25px;
    border-radius: 13px;
    background: #fff;
    color: #005bb6;
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
</style>
