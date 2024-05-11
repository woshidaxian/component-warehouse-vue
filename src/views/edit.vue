<template>
  <div class="add-box">
    <div class="top-bar flex-row-between">
      <el-page-header @back="$router.go(-1)" content="组件编辑">
      </el-page-header>
      <div class="btn-box">
        <el-button size="small" type="primary" @click="upForm" :loading="upLoading">提 交</el-button>
      </div>
    </div>
    <div class="form-box">
      <el-form ref="form" :rules="rules" :model="form" label-width="180px">
        <el-form-item prop="img" label="组件图样：">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.img" :src="form.img" class="avatar" style="width: 100%; height: 100%">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="img-demo-tip">
            注：仅支持jpg/png/gif格式，且不能大于2M
          </div>
        </el-form-item>
        <el-form-item prop="componentName" label="源文件：">
          <el-upload
            class="upload-demo"
            action=""
            :show-file-list="false"
            :before-upload="beforeFileUpload"
          >
            <span class="file-name" v-if="form.componentName">{{form.componentName}}</span>
            <el-button size="small" v-else type="primary">点击上传</el-button>
          </el-upload>
          <div class="img-demo-tip">
            <p>注：1、文件不能大于2M</p>
            <p>2、文件内不要包含静态文件，如有其它依赖请在使用方法中说明</p>
            <p>3、其它可能影响本组件正常运行的全局class、变量等</p>
          </div>
        </el-form-item>
        <el-form-item prop="type" label="组件类型：" style="text-align: left">
          <el-select size="small" placeholder="组件类型" v-model="form.type">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="组件名称：" style="text-align: left">
          <el-input size="small" placeholder="名称" v-model="form.name" style="width: 400px"></el-input>
          <el-tooltip class="item" effect="dark" content="尽可能描述详细，便于检索" placement="right" style="margin-left: 20px">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">使用方法：</div>
    <div class="use-box">
      <mavon-editor style="height: 600px" v-model="form.useContent"></mavon-editor>
      <div class="tips" style="text-align:left; margin-top: 20px;padding-left: 20px">
        <p>注：1、请在使用方法中说明组件的详细使用方法</p>
        <p>2、组件上传后还可通过个人中心-我的组件进入到编辑页</p>
        <p>3、使用方法的编辑器支持MarkDown语法</p>
        <p>4、不具有详细使用说明的组件将被设置为仅提交人可见（通过个人中心-我的组件）</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as getData from './../api/server'
import { upFile } from './../config/utils'
export default {
  name: '',
  components: {},
  data () {
    return {
      rules: {
        img: [
          { required: true, message: '请上传组件图样', trigger: ['blue', 'change']}
        ],
        componentName: [
          { required: true, message: '请上传组件源文件', trigger: ['blue', 'change']}
        ],
        name: [
          { required: true, message: '请输入组件名称', trigger: ['blue', 'change']}
        ],
        type: [
          { required: true, message: '请选择组件类型', trigger: ['blue', 'change']}
        ],
      },
      form: {
        id: '',
        img: null, // 组件图样
        fileUrl: '', // 组件url，也是个文件名，上传后返回值，因为七牛云文件链接格式统一，储存时统一存文件名
        componentName: '',  // 组件文件名，上传时的文件名
        name: '', // 组件名称，用于检索
        type: '', // 组件类别
        useContent: '', // 使用方法，markdown语法
      },
      state: null,
      typeList: [],
      useContent: '## props\n\n## methods\n\n## event',
      upLoading: false,
      id: ''
    }
  },

  mounted() {
    this.getTypeList()
    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.form.id = this.id
      this.init()
    }else{
      this.$message.warning('缺少参数')
    }
  },

  methods: {
    init(){
      getData.getComponentDetail({id: this.id}).then(res=>{
        if(res.data.code == 1){
          // this.detail = res.data.data
          let data = res.data.data
          this.form.img = data.img
          this.form.componentName = data.componentName
          this.form.type = data.type
          this.form.name = data.name
          this.form.useContent = data.useContent
          this.state = data.state
        }
      })
    },
    // 上传图样
    beforeAvatarUpload(file){
      const that = this
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isImg){
        this.$message.warning('仅支持上传jpg/png/gif格式')
        return false
      }
      if(!isLt2M){
        this.$message.warning('文件大小需小于2M')
        return false
      }
      upFile('componentImage/',file, o=>{
        that.form.img = 'http://file.wghuang.icu/' + o.key
        this.$message.success('上传成功')
      })
    },
    // 上传源文件
    beforeFileUpload(file){
      const that = this
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isLt2M){
        this.$message.warning('文件大小需小于2M')
        return false
      }
      upFile('components/',file, f=>{
        that.form.fileUrl = f.key
        that.form.componentName = file.name
        this.$message.success('上传成功')
      })
    },
    getTypeList(){
      getData.typeList({pageSize: 100}).then(res=>{
        if(res.data.code == 1){
          this.typeList = res.data.data.list
        }
      })
    },
    // eslint-disable-next-line no-unused-vars
    // handleMarkDownChange(v, r){
    //   this.form.useContent = r
    // },
    upForm(){
      this.$refs['form'].validate((valid)=>{
        if(valid){
          getData.updateComponent(this.form).then(res=>{
            if(res.data.code == 1){
              this.$message.success('提交成功')
              this.updateState()
              setTimeout(() => {
                this.$router.go(-1)
              }, 500);
            }
          })
        }
      })
    },
    updateState(){
      if(this.state == 3){
        getData.changeComponentState({id: this.id, state: 2}).then(res=>{
          if(res.data.code == 1){
            this.$message.success('操作成功')
          }
        })
      }else{
        return
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.add-box{
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 65px;
  padding-bottom: 60px;
  .top-bar{
    margin-bottom: 10px;
  }
  .form-box{
    background: #fff;
    width: 100%;
    padding-top: 20px;
  }
  .avatar-uploader{
    width: 150px;
    height: 150px;
    border: 1px solid rgb(211, 211, 211);
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .upload-demo{
    text-align: left;
  }
  .file-name{
    color: rgb(0, 142, 224);
    font-weight: bold;
  }
  .img-demo-tip{
    text-align: left;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    position: relative;
    text-align: left;
  }
  .use-box{
    width: 100%;
    height: 800px;
    background: #fff;
    margin-top: 20px;
    &>div{
      z-index: 100;
    }
  }
  .tips{
    p{
      line-height: 26px;
    }
  }
}
</style>
