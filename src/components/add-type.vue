<template>
  <div class="add-box">
    <el-form :model="form" :rules="rules" label-width="140px" ref="form">
      <el-form-item label="类型名称：" prop="typeName" style="width: 400px">
        <el-input v-model="form.typeName" placeholder="输入类型名称"></el-input>
      </el-form-item>
      <el-form-item label="类型排序：" prop="orderNo" style="width: 400px">
        <el-input v-model="form.orderNo" placeholder="输入类型排序"></el-input>
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
// eslint-disable-next-line no-unused-vars
const checkTypeName = (valid,value,callback) => {
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

  data () {
    return {
      form: {
        typeName: '',
        orderNo: ''
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

  mounted() {},

  methods: {
    saveType(){
      this.$refs['form'].validate((valid)=>{
        if(valid){
          getData.addType({typeName: this.form.typeName, orderNo: this.form.orderNo}).then(res=>{
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
