<!--  -->
<template>
  <div class="personal-box">
    <div class="left">
      <div class="left-top">
        <div class="head">
          <img src="./../assets/image/head.png" alt="">
        </div>
        <div class="account">{{$store.state.userAccount}}</div>
        <div class="btn-box">
          <el-button type="primary" size="small" style="width: 240px" @click="dataBlock">数据看板</el-button><br/><br/>
          <el-button size="small" style="width: 240px" @click="loginOut">退出登录</el-button>
        </div>
      </div>
      <div class="left-bottom">
        <div
          v-for="(item, index) in navList"
          :key="index"
          class="nav-item"
          :class="{'nav-active': activeNav == item.path}"
          @click="changeNav(item)"
        >
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="flex-row-between">
        <el-page-header @back="goBack" :content="$route.name"></el-page-header>
        <div>
          <el-button v-if="$route.path == '/personal/list'" type="primary" size="small" @click="$router.push('/add')">新增</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      navList: [
        { icon: 'el-icon-s-fold', path: '/personal/list', name: '我的组件', disable: false },
        { icon: 'el-icon-chat-line-round', path: '/personal/message',name: '我的消息', disable: true },
        { icon: 'el-icon-s-tools', path: '/personal/info',name: '个人信息', disable: true },
      ],
      activeNav: ''
    }
  },

  computed: {},

  mounted() {
    this.activeNav = this.$route.path
  },

  methods: {
    dataBlock(){
      this.$message.info('暂未规划')
    },
    changeNav(row){
      if(row.disable){
        this.$message.info('啥也没有，没规划')
      }else{
        if(this.activeNav == row.path) return
        this.$router.push(row.path)
        this.activeNav = row.path
      }
    },
    goBack(){
      this.$router.push('/')
    },
    loginOut(){
      this.$store.commit('loginOut')
      sessionStorage.clear()
      this.$message.success('退出成功')
      setTimeout(()=>{
        this.goBack()
      }, 300)
    }
  },

  beforeDestroy() {}
}

</script>
<style lang='scss' scoped>
.personal-box{
  width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 70px;
  padding-bottom: 80px;
  /deep/ .el-divider--horizontal{
    margin: 10px 0;
  }
  .left{
    width: 280px;
    &-top{
      width: 100%;
      background: #fff;
      height: 200px;
      margin-top: 90px;
      position: relative;
      .head{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        top: -220px;
        border-bottom: 1px solid rgb(209, 209, 209);
        img{
          width: 70px;
          height: 70px;
          object-fit: cover;
        }
      }
      .account{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        top: 60px;
        font-weight: bold;
        color: rgb(0, 124, 146);
        font-size: 18px;
      }
      .btn-box{
        position: absolute;
        height: 100px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        bottom: -100px;
      }
    }
    &-bottom{
      width: 100%;
      height: 300px;
      margin-top: 20px;
      background: #fff;
      .nav-item{
        height: 50px;
        line-height: 50px;
        display: flex;
        padding-left: 40px;
        align-items: center;
        margin-bottom: 2px;
        cursor: pointer;
        &:hover{
          background: rgb(243, 243, 243);
          color: rgb(0, 162, 255);
        }
        i{
          font-size: 16px;
        }
        span{
          flex: 1;
          padding-left: 12px;
          text-align: left;
          font-size: 16px;
          letter-spacing: 1px;
        }
      }
      .nav-active{
        background: rgb(243, 243, 243);
        color: rgb(0, 162, 255);
      }
    }
  }
  .right{
    width: 860px;
    min-height: 700px;
    background: #fff;
    padding: 20px;
    padding-top: 15px;
    max-height: 1500px;
  }
}
</style>
