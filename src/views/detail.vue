<template>
  <div class="detail-box" v-if="detail">
    <div class="detail-left">
      <div class="detail-top">
        <el-page-header @back="$router.go(-1)" content="组件详情">
        </el-page-header>
      </div>
      <div class="flex-row-between">
        <div class="detail-img">
          <img :src="detail.img" alt="" v-if="detail.img">
          <img v-else src="./../assets/image/noimg.png" alt="">
        </div>
        <div class="detail-info">
          <div class="detail-name ellipsis2">{{detail.name}}</div>
          <div class="form-item">
            <div class="label">著作人：</div>
            <div class="value">{{detail.realName}}{{detail.isAdmin?'（管理员）':''}}</div>
          </div>
          <div class="form-item">
            <div class="label">收入时间：</div>
            <div class="value">{{new Date(detail.created_at).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <div class="form-item">
            <div class="label">类别：</div>
            <div class="value">{{detail.typeName}}</div>
          </div>
          <div class="form-item">
            <div class="label">下载量：</div>
            <div class="value">{{detail.downloadNum}}</div>
          </div>
          <div class="form-item" style="margin-top: 30px">
            <el-button type="primary" class="btn" size="default" @click="down">下载源文件</el-button>
          </div>
        </div>
      </div>
      <div class="detail-use">
        <div class="title">使用方法：</div>
        <!-- <div v-html="detail.useContent"></div> -->
        <mavon-editor style="height: 500px" :subfield="false" :toolbarsFlag="false" :editable="false" :defaultOpen="'preview'" v-model="detail.useContent" @change="handleMarkDownChange"></mavon-editor>
      </div>
    </div>
    <div class="hot-list">
      <div class="title"> <img src="./../assets/image/good.png" alt=""> 相关推荐：</div>
      <div class="list-box">
        <div class="empty-data">暂无推荐</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as getData from './../api/server';
import { Encryption } from './../config/crypto';
const AES = new Encryption('AES', {key: 'hwgcomponentdown', iv: '1011110100111010'})
import download from 'downloadjs'
export default {
  name: '',
  components: {},
  data () {
    return {
      id: null,
      detail: null
    }
  },

  mounted() {
    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.init()
    }else{
      this.$message.warning('缺少参数')
    }
  },

  methods: {
    init(){
      getData.getComponentDetail({id: this.id}).then(res=>{
        if(res.data.code == 1){
          this.detail = res.data.data
        }
      })
    },
    down(){
      getData.downUrl({id: this.detail.id}).then(res=>{
        if(res.data.code == 1){
          download(AES.deCrypto(res.data.data))
          this.detail.downloadNum ++
        }
      })
    },
    handleMarkDownChange(v, r){
      console.log(v ,r);
    }
  }
}

</script>
<style lang='scss' scoped>
.detail-box{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding-top: 75px;
  padding-bottom: 60px;
  .detail-left{
    flex: 1;
    margin-right: 20px;
    .detail-top{
      margin-bottom: 8px;
    }
    .detail-img{
      width: 56%;
      height: 300px;
      background: #fff;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: rgb(245, 245, 245);
      }
    }
    .detail-info{
      flex: 1;
      background: #fff;
      height: 300px;
      text-align: left;
    }
    .detail-use{
      width: calc(100% - 80px);
      min-height: 200px;
      background: #fff;
      margin-top: 20px;
      text-align: left;
      padding: 40px;
      &>div{
        z-index: 100;
      }
      .title{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgb(223, 223, 223);
      }
    }
    .detail-name{
      padding: 0 20px;
      margin-top: 15px;
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 25px;
      height: 48px;
    }
  }
  .hot-list{
    width: 250px;
    height: auto;
    .title{
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      display: flex;
      align-items: center;
      img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .list-box{
      width: 100%;
      height: 500px;
      background: #fff;
      margin-top: 11px;
    }
  }
}
.empty-data{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.form-item{
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  margin-top: 12px;
  .label{
    font-size: 15px;
    color: rgb(139, 139, 139);
  }
  .value{
    font-size: 15px;
    flex: 1;
    text-align: left;
  }
}

</style>
