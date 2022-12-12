<template>
  <div class="main-box">
    <div class="head flex-row-between">
      <div class="search-box">
        <el-input size="small" v-model="filters.realName" placeholder="用户搜索" style="margin-right: 10px"></el-input>
        <el-button type="primary" size="small" style="margin-left: 10px" plain @click="search">搜索</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table :data="list" border stripe height="100%" size="small">
        <template slot="empty">
          <el-button v-if="isLoading" type="text" :loading="true">加载中</el-button>
          <span v-if="!isLoading">暂无数据</span>
        </template>
        <el-table-column label="ID" prop="id" width="50px"></el-table-column>
        <el-table-column label="账号" prop="account" show-overflow-tooltip></el-table-column>
        <el-table-column label="姓名" prop="realName" show-overflow-tooltip></el-table-column>
        <el-table-column label="注册时间" prop="created_at" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{new Date(scope.row.created_at).format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="组件数量" prop="componentNum"></el-table-column>
        <el-table-column label="是否管理员" prop="isAdmin" width="100px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isAdmin" style="color: green">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">
            {{scope.row.state|userState}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.realName == '系统管理员'" size="mini" type="warning" plain v-if="scope.row.state==1" @click="state(scope.row.id, 2)">账号冻结</el-button>
            <el-button :disabled="scope.row.realName == '系统管理员'" size="mini" type="success" plain v-if="scope.row.state==2" @click="state(scope.row.id, 1)">解锁账号</el-button>
            <el-button :disabled="scope.row.realName == '系统管理员'" size="mini" type="primary" plain v-if="!scope.row.isAdmin" @click="admin(scope.row.id, true)">设为管理员</el-button>
            <el-button :disabled="scope.row.realName == '系统管理员'" size="mini" type="primary" plain v-if="scope.row.isAdmin" @click="admin(scope.row.id, false)">取消管理员</el-button>
            <el-button :disabled="scope.row.realName == '系统管理员'" size="mini" type="danger" @click="del(scope.row.id)" plain>删除</el-button>
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
        realName: '',
        total: 100
      },
      isLoading: false
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList(){
      this.isLoading = true
      getData.userList(this.filters).then(res=>{
        this.isLoading = false
        if(res.data.code === 1){
          this.list = res.data.data.list
          this.filters.total = res.data.data.total
        }
      })
    },
    admin(id, flag){
      let t = ''
      if(flag) {
        t = '确认要将该用户设为管理员吗？'
      }else{
        t = '确认要取消该用户的管理员身份吗？'
      }
      this.$confirm(t, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.changeUser({userId: id, isAdmin: flag}).then(res=>{
          if(res.data.code == 1){
            this.$message.success('操作成功')
            this.getList()
          }
        })
      }).catch(()=>{
        this.$message.info('操作取消')
      })
    },
    state(id, flag){
      let t = ''
      if(flag == 1) {
        t = '确认要解除该账号的锁定状态吗？'
      }else{
        t = '确认要锁定该账号吗？'
      }
      this.$confirm(t, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.changeUser({userId: id, state: flag}).then(res=>{
          if(res.data.code == 1){
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
    del(id){
      this.$confirm('是否确认删除该用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.userDel({userId: id}).then(res=>{
          if(res.data.code === 1){
            this.$message.success('操作成功')
            this.getList()
          }
        })
      }).catch(()=>{
        this.$message.info('操作取消')
      })
    }
  },
  filters: {
    userState(val){
      switch(val){
        case 1: return '正常使用';
        case 2: return '账号锁定';
        default: return '-';
      }
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
