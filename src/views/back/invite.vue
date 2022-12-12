<template>
  <div class="main-box">
    <div class="head flex-row-between">
      <div class="search-box">
        <el-input size="small" v-model="filters.userName" placeholder="姓名" style="margin-right: 10px"></el-input>
        <el-select size="small" v-model="filters.useState" placeholder="使用状态" clearable @change="search">
          <el-option label="已使用" :value="1"></el-option>
          <el-option label="未使用" :value="0"></el-option>
        </el-select>
        <el-button type="primary" size="small" style="margin-left: 10px" plain @click="search">搜索</el-button>
      </div>
      <el-button type="primary" size="small" @click="showAdd = true">新增注册码</el-button>
    </div>
    <div class="table-box">
      <el-table :data="list" border stripe height="100%" size="small">
        <template slot="empty">
          <el-button v-if="isLoading" type="text" :loading="true">加载中</el-button>
          <span v-if="!isLoading">暂无数据</span>
        </template>
        <el-table-column label="ID" prop="id" width="50px"></el-table-column>
        <el-table-column label="注册码" prop="code" width="250px" show-overflow-tooltip></el-table-column>
        <el-table-column label="姓名" prop="userName" show-overflow-tooltip></el-table-column>
        <el-table-column label="有效时间" width="160px" prop="validTime" show-overflow-tooltip>
          <template slot-scope="scope">
            {{new Date(scope.row.validTime).format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="是否使用" prop="isUse" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.isUse?'已使用':'未使用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.row.id, scope.row.code)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-size="filters.pageSize"
        :current-page="filters.pageIndex"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filters.total" background>
      </el-pagination>
      
    </div>
    <el-dialog :visible.sync="showAdd" title="新增注册码" width="500px" :close-on-click-modal="false">
      <h-add-code v-if="showAdd" @close="showAdd = false" @init="getList(), showAdd = false"></h-add-code>
    </el-dialog>
  </div>
</template>

<script>
import * as getData from './../../api/server'
export default {
  name: '',
  components: {},
  data () {
    return {
      list: [],
      filters: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        useState: '',
        total: 100
      },
      isLoading: false,
      showAdd: false
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList(){
      this.isLoading = true
      getData.codeList(this.filters).then(res=>{
        this.isLoading = false
        if(res.data.code === 1){
          this.list = res.data.data.list
          this.filters.total = res.data.data.total
        }
      })
    },
    sizeChange(val){
      this.filters.pageSize = val
      this.filters.pageIndex = 1
      this.getList()
    },
    currentChange(val){
      this.filters.pageIndex = val
      this.getList()
    },
    search(){
      this.filters.pageIndex = 1
      this.getList()
    },
    del(id, code){
      this.$confirm('确认要删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.delCode({ids: `${id}`, code: code}).then(res=>{
          if(res.data.code === 1){
            this.$message.success('操作成功')
            this.getList()
          }
        })
      }).catch(()=>{
        this.$message.info('操作取消')
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.main-box{
  padding: 10px;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  background: #fff;
  .head{
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .page-title{
      color: grey;
      font-size: 15px;
    }
    .search-box{
      display: flex;
    }
  }
  .table-box{
    flex: 1;
    margin: 0 10px;
    overflow: auto;
    margin-bottom: 10px;
    overflow-x: auto;
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
  }
  .page-box{
    padding-bottom: 5px;
    padding-right: 10px;
    text-align: right;
  }
}
</style>
