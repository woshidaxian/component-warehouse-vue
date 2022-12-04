<template>
  <div class="add-box">
    <el-form :model="form" :rules="rules" label-width="140px" ref="form">
      <el-form-item label="类型名称：" prop="typeName" style="width: 400px">
        <el-input v-model="form.typeName" placeholder="输入类型名称"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="small" @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="saveType">确认</el-button>
    </div>
  </div>
</template>

<script>
import * as getData from './../api/server'
export default {
  components: {},

  data () {
    return {
      form: {
        typeName: ''
      },
      rules: {
        typeName: [
          { required: true, message: '类型名称不能为空', trigger: ['blue', 'change'] }
        ]
      }
    }
  },

  computed: {},

  mounted() {},

  methods: {
    saveType(){
      this.$refs['form'].validate((valid)=>{
        if(valid){
          getData.addType({typeName: this.form.typeName}).then(res=>{
            if(res.data.code == 1){
              this.$message.success('添加成功')
              this.$emit('init')
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
.btn-box{
  margin-top: 30px;
}
</style>
