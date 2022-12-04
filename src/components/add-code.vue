<template>
  <div class="add-box">
    <el-form :model="form" label-width="140px" :rules="rules" ref="form">
      <el-form-item label="注册人姓名：" style="width: 400px" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入注册用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="有效期时间：" prop="validTime">
        <el-date-picker
          v-model="form.validTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="small" @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="upCode">确认</el-button>
    </div>

    <el-dialog :visible.sync="showCode" title="注册码" :close-on-click-modal="false" width="500px" @close="$emit('init')" append-to-body>
      <div class="code">
        &nbsp;{{code}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as getData from './../api/server'
export default {
  components: {},

  data () {
    return {
      form: {
        validTime: '',
        userName: ''
      },
      rules: {
        validTime: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
        ],
        userName: [
          { required: true, message: '请输入用户姓名', trigger: ['blur', 'change'] }
        ]
      },
      showCode: false,
      code: ''
    }
  },

  computed: {},

  mounted() {},

  methods: {
    upCode(){
      this.$refs['form'].validate((valid)=>{
        if(valid){
          getData.buildCode(this.form).then(res=>{
            if(res.data.code === 1){
              this.$message.success('生成成功')
              this.code = res.data.data
              this.showCode = true
            }
          })
        }
      })
    }
  },

  beforeDestroy() {}
}

</script>
<style lang='scss' scoped>
.add-box{
  /deep/ .el-form-item__content{
    text-align: left;
  }
  .btn-box{
    margin-top: 30px;
  }
}
.code{
  font-size: 45px;
  font-weight: bold;
  letter-spacing: 40px;
  text-align: center;
}
</style>
