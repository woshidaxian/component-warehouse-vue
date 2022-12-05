<template>
  <div id="app">
    <header class="header">
      <div>
        <span class="title">组件仓库-VUE</span>
        <input type="text" v-model="key" placeholder="输入关键词搜索..." class="inp-search" v-if="showSearch">
        <el-select v-if="showSearch" v-model="typeId" placeholder="请选择组件类型" size="small" filterable clearable @change="search">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>
        <span v-if="showSearch" class="btn-search" @click="search">搜&nbsp;&nbsp;索</span>
      </div>
      <div style="display: flex">
        <div class="btn-subscrible">使用说明</div>
        <div class="login-btn" @click="showLogin=true" v-if="!$store.state.isLogin">登录</div>
        <div class="register-btn" v-if="!$store.state.isLogin" @click="showRegister = true">注册</div>
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
        浙ICP备2021016384号-2
      </a>&nbsp;|&nbsp;
      <a href="http://find.wghuang.fun" target="blank">
        搜分支
      </a>&nbsp;|&nbsp;
      <span class="back-btn" @click="goBack">后台管理</span>
    </footer>
    <h-login v-if="showLogin" @close="showLogin=false"></h-login>
    <el-drawer
      :visible.sync="showRegister"
      direction="rtl"
      :wrapperClosable="false"
      :before-close="handleClose">
      <div class="register-box">
        <div class="step-box" v-if="!showNext">
          <div class="step-title">第一步</div>
          <div class="step-sub-title">
            CODE验证
              <el-tooltip class="item" effect="dark" content="注册请确认您是否拥有4位注册码？可向管理员获取" placement="right">
                <i class="el-icon-question"></i>
              </el-tooltip>
          </div>
          <input class="inp-code" placeholder="请输入四位注册码" v-model="code">
          <div class="next-btn" @click="checkCode">下一步</div>
        </div>
        <div class="step-box" v-if="showNext">
          <div class="flex-row-between">
            <div>
              <div class="step-title">第二步</div>
              <div class="step-sub-title">填写注册信息</div>
            </div>
            <div class="prev-ben" @click="showNext = false">
              <i class="el-icon-back"></i>
            </div>
          </div>
          <div class="inp-box" style="margin-top: 40px">
            <i class="el-icon-user"></i>
            <input v-model="account" class="inp" placeholder="用于登录的账号">
          </div>
          <div class="inp-box">
            <i class="el-icon-key"></i>
            <input type="password" v-model="password" name="" value="" class="inp" placeholder="请输入登录密码">
          </div>
          <div class="next-btn" @click="register">注 册</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import * as getData from './api/server'
import * as utils from './config/utils'
export default {
  data() {
    return {
      typeList: [],
      typeId: '',
      key: '',
      showLogin: false,
      showRegister: false,
      code: '',
      showNext: false,
      account: '',
      password: '',
    }
  },
  computed: {
    showSearch(){
      let path = ['/index']
      return path.indexOf(this.$route.path) == -1 ? false : true
    }
  },
  mounted() {
    this.getTypeList()
  },
  methods: {
    goBack() {
      if(this.$route.path.indexOf('back')!=-1) return
      if(!this.$store.state.isLogin){
        this.$message.info('请先登录!')
        return
      }
      getData.checkUser().then(res=>{
        if(res.data.code === 1){
          if(res.data.data){
            this.$router.push('/back')
          }else{
            this.$message.warning('权限不足')
          }
        }
      })
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
    },
    handleClose(){
      this.$confirm('确定要退出注册吗？','提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.showRegister = false
        this.code = ''
        this.showNext = false
      }).catch(()=>{
        return
      })
    },
    checkCode(){
      if(!this.code){
        this.$message.warning('请输入注册码')
        return
      }
      if(!utils.number.test(this.code)||this.code.length!=4){
        this.$message.warning('请检查注册码是否是4位数字')
        return
      }
      this.showNext = true
    },
    register(){
      if(this.account&&this.password){
        getData.register({
          account: this.account,
          password: utils.SHACrypto(this.password),
          inviteCode: this.code
        }).then(res=>{
          if(res.data.code === 1){
            this.$message.success('注册成功')
            this.showNext = false
            this.code = ''
            this.password = ''
            this.account = ''
            this.showRegister = false
          }
        })
      }
    }
  },
}
</script>
<style lang="scss">
@import './assets/css/base';
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
.header{
  width: calc(100% - 30px);
  padding: 0 15px;
  height: 55px;
  background: #005bb6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 9999;
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
  z-index: 9999;
  a{
    text-decoration: none;
    color: #005bb699;
  }
}
.back-btn{
  cursor: pointer;
  color: #005bb699;
}
.flex-row-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.register-box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
  .step-box{
    width: 70%;
  }
  .step-title{
    font-size: 24px;
    font-weight: bold;
    text-align: left;
  }
  .step-sub-title{
    text-align: left;
    margin-top: 15px;
    font-size: 15px;
  }
  .inp-code{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    outline: none;
    margin-top: 50px;
    text-indent: 15px;
    font-size: 16px;
    &::placeholder{
      color: rgb(90, 90, 90);
    }
  }
  .prev-ben{
    width: 80px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #005bb6;
    border-radius: 23px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  .next-btn{
    width: 100%;
    height: 40px;
    background: #00458b;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 15px;
    margin-top: 30px;
    cursor: pointer;
    &:hover{
      background: #005bb6;
    }
  }
  .inp-box{
    width: 88%;
    height: 46px;
    margin-bottom: 20px;
    border-radius: 23px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border: 1px solid rgb(16, 122, 172);
    i{
      font-size: 18px;
      font-weight: bold;
      color: rgb(16, 122, 172);
    }
  }
  .inp{
    margin-left: 10px;
    flex: 1;
    height: 40px;
    outline: none;
    border: none;
    background: none;
    color: rgb(0, 0, 0);
    font-size: 15px;
  }
}
</style>
