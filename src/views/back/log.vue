<template>
  <div class="main-box">
    <div class="head flex-row-between">
      <div class="search-box"></div>
      <el-button type="danger" plain size="small" @click="delLogs">批量删除</el-button>
    </div>
    <div class="table-box">
      <el-table :data="list" border stripe height="100%" size="small" @selection-change="handleSelectionChange">
        <template slot="empty">
          <el-button v-if="isLoading" type="text" :loading="true">加载中</el-button>
          <span v-if="!isLoading">暂无数据</span>
        </template>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="ID" prop="id" width="50px"></el-table-column>
        <el-table-column label="操作" prop="what" width="250px" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作人" prop="realName" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作人账号" prop="account" show-overflow-tooltip></el-table-column>
        <el-table-column label="时间" prop="time" show-overflow-tooltip>
          <template slot-scope="scope">
            {{new Date(scope.row.time).format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="IP" prop="ip"></el-table-column>
        <el-table-column label="是否管理员" prop="isAdmin" width="100px" align="center">
          <template slot-scope="scope">
            {{scope.row.isAdmin?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
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
        total: 100
      },
      isLoading: false,
      checkList: []
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList(){
      this.isLoading = true
      getData.logList(this.filters).then(res=>{
        this.isLoading = false
        if(res.data.code === 1){
          this.list = res.data.data.list
          this.filters.total = res.data.data.total
        }
      })
    },
    del(id){
      this.$confirm('确认要删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.delLog({ids: `${id}`}).then(res=>{
          if(res.data.code === 1){
            this.$message.success('操作成功')
            this.getList()
          }
        })
      }).catch(()=>{
        this.$message.info('操作取消')
      })
      
    },
    sizeChange(val){
      this.filters.pageSize = val
      this.filters.pageIndex = 1
      this.search()
    },
    currentChange(val){
      this.filters.pageIndex = val
      this.search()
    },
    search(){
      this.getList()
    },
    handleSelectionChange(val){
      this.checkList = val.map(item=>item.id)
    },
    delLogs(){
      if(this.checkList.length==0){
        this.$message.warning('您还未选中任何记录')
        return
      }
      this.$confirm('确认要删除这些记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.delLog({ids: this.checkList.join(',')}).then(res=>{
          if(res.data.code === 1){
            this.$message.success('操作成功')
            this.checkList = []
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
