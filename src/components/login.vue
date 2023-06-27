<template>
  <div class="mask">
    <div class="title">H - WAREHOUSE</div>
    <div class="inp-box">
      <i class="el-icon-user"></i>
      <input v-model="account" class="inp">
    </div>
    <div class="inp-box">
      <i class="el-icon-key"></i>
      <input type="password" v-model="password" name="" value="" class="inp">
    </div>
    <div class="login-btn" @click="login">Login</div>
    <i class="el-icon-circle-close close-btn" @click="cancel"></i>
  </div>
</template>

<script>
import * as getData from './../api/server'
import * as utils from './../config/utils'
export default {
  name: '',
  components: {},
  data () {
    return {
      account: '',
      password: ''
    }
  },

  mounted() {
    document.body.style.overflow = 'hidden'
  },

  methods: {
    login(){
      if(!this.account){
        this.$message.warning('账号不能为空！')
        return
      }
      if(!this.password){
        this.$message.warning('密码不能为空！')
        return
      }
      getData.login({
        account: this.account,
        password: utils.SHACrypto(this.password)
      }).then(res =>{
        if(res.data.code == 1){
          this.$message.success('登录成功')
          this.$store.state.userId = res.data.data.userId
          this.$store.state.token = res.data.data.token
          this.$store.state.userAccount = res.data.data.account
          sessionStorage.setItem('userId', this.$store.state.userId)
          sessionStorage.setItem('token', this.$store.state.token)
          sessionStorage.setItem('userAccount', this.$store.state.userAccount)
          this.$store.state.isLogin = true
          setTimeout(() => {
            this.$emit('close')
            document.body.style.overflow = 'auto'
          }, 500);
        }
      })
    },
    cancel(){
      this.$emit('close')
      document.body.style.overflow = 'auto'
    }
  }
}

</script>
<style lang='scss' scoped>
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn forwards .5s;
  overflow: hidden;
  .title{
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 30px;
  }
  .inp-box{
    width: 300px;
    height: 46px;
    margin-bottom: 20px;
    border-radius: 23px;
    background: rgba(0,0,0,.2);
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border: 1px solid rgba(236, 236, 236, 0.253);
    i{
      font-size: 18px;
      font-weight: bold;
    }
  }
  .inp{
    margin-left: 10px;
    flex: 1;
    height: 40px;
    outline: none;
    border: none;
    background: none;
    color: #fff;
    font-size: 15px;
  }
  .login-btn{
    margin-top: 10px;
    width: 340px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #005bb6;
    border-radius: 20px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    &:hover{
      background: #00468b;
    }
  }
}
.close-btn{
  position: absolute;
  cursor: pointer;
  font-size: 25px;
  color: rgb(187, 187, 187);
  top: 40px;
  right: 40px;
}
@keyframes fadeIn {
  from{
    opacity: 0;
    transform: scale(1.5)
  }
  to{
    opacity: 1;
    transform: scale(1);
  }
}
</style>
