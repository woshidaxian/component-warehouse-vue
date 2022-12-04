<template>
  <div class="back-box">
    <div class="left-nav">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="nav-normal"
        :class="{'active-nav': activePath == item.url}"
        @click="$router.push(item.url)"
      >
        <i :class="item.icon"></i>
        <div>{{item.name}}</div>
      </div>
    </div>
    <div class="right-contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as getData from './../api/server'
export default {
  components: {},

  data () {
    return {
      navList: [
        // { name: '数据看板', url: '/back/data', icon: '' },
        { name: '组件管理', url: '/back/component', icon: 'el-icon-menu' },
        { name: '组件类型', url: '/back/type', icon: 'el-icon-paperclip' },
        { name: '注册码管理', url: '/back/code', icon: 'el-icon-connection' },
        { name: '用户管理', url: '/back/user', icon: 'el-icon-user' },
        { name: '操作日志', url: '/back/log', icon: 'el-icon-collection-tag' }
      ],
      activePath: ''
    }
  },

  computed: {},

  mounted() {
    this.activePath = this.$route.path
    getData.checkUser().then(res=>{
      if(res.data.code === 1){
        if(res.data.data){
          return
        }else{
          this.$message.warning('权限不足')
          this.$router.push('/index')
        }
      }
    })
  },

  methods: {},

  beforeDestroy() {},
  watch: {
    '$route.path':{
      handler(val){
        this.activePath = val
      },
      deep: true
    }
  }
}

</script>
<style lang='scss' scoped>
.back-box{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  background: rgb(220, 220, 220);
  .left-nav{
    width: 18%;
    padding-top: 55px;
    height: calc(100% - 55px);
    background: rgb(20, 49, 71);
    min-width: 200px;
    .nav-normal{
      display: flex;
      padding: 15px 20px;
      align-items: center;
      color: #fff;
      transition: all .4s;
      cursor: pointer;
      font-size: 14px;
      &:hover{
        background: rgba(255, 255, 255, 0.55);
        color: rgb(20, 49, 71);
      }
      div{
        flex: 1;
        text-align: left;
        text-indent: 10px;
      }
    }
    .active-nav{
      background: rgba(255, 255, 255, 0.902);
      color: rgb(20, 49, 71);
    }
  }
  .right-contain{
    flex: 1;
    padding-top: 55px;
    height: calc(100% - 55px);
    overflow: hidden;
  }
}
</style>
