<template>
  <div class="add-box">
    <el-form :model="form" :rules="rules" label-width="140px" ref="form">
      <el-form-item label="类型名称：" prop="typeName" style="width: 400px">
        <el-input v-model="form.typeName" placeholder="输入类型名称"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="small" @click="$emit('close')">取消</el-button>
      <el-button size="small" type="primary" @click="resetType">确认</el-button>
    </div>
  </div>
</template>

<script>
import * as getData from './../api/server'
// eslint-disable-next-line no-unused-vars
let typeName = null
const checkTypeName = (valid,value,callback) => {
  if(value == typeName){
    callback()
    return
  }
  getData.checkTypeName({typeName: value}).then(res=>{
    if(res.data.code == 4){
      callback('类型名称不能重复')
    }else{
      callback()
    }
  })
}
export default {
  components: {},
  props: ['typeInfo'],
  data () {
    return {
      form: {
        id: '',
        typeName: ''
      },
      rules: {
        typeName: [
          { required: true, message: '类型名称不能为空', trigger: ['blue', 'change'] },
          { validator: checkTypeName, trigger: ['change'] }
        ]
      }
    }
  },

  computed: {},

  mounted() {
    this.form.id = this.typeInfo.id
    this.form.typeName = this.typeInfo.typeName
    typeName = this.typeInfo.typeName
  },

  methods: {
    resetType(){
      if(this.form.typeName == this.typeInfo.typeName){
        this.$emit('close')
        return
      }
      this.$refs['form'].validate((valid)=>{
        if(valid){
          getData.resetTypeName({typeName: this.form.typeName, id: this.form.id}).then(res=>{
            if(res.data.code == 1){
              this.$message.success('修改成功')
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
