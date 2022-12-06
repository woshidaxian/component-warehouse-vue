<template>
  <div class="main-box">
    <div class="head flex-row-between">
      <div class="search-box">
        <el-input size="small" placeholder="名称关键词" v-model="filters.keyWord" style="margin-right: 10px;width: 200px"></el-input>
        <el-select size="small" placeholder="组件类型" v-model="filters.type" @change="search" clearable>
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select size="small" v-model="filters.state" style="margin-left: 10px" placeholder="组件状态" @change="search" clearable>
          <el-option
            v-for="(item, index) in stateOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" style="margin-left: 10px" plain @click="search">搜索</el-button>
      </div>
      <el-button type="primary" size="small" @click="$router.push('/add')">新增组件</el-button>
    </div>
    <div class="table-box">
      <el-table :data="list" border stripe height="100%" size="small">
        <template slot="empty">
          <el-button v-if="isLoading" type="text" :loading="true">加载中</el-button>
          <span v-if="!isLoading">暂无数据</span>
        </template>
        <el-table-column label="ID" prop="id" width="50px"></el-table-column>
        <el-table-column label="名称" prop="name" width="250px" show-overflow-tooltip></el-table-column>
        <el-table-column label="著作人" prop="realName" show-overflow-tooltip></el-table-column>
        <el-table-column label="收录时间" prop="created_at" width="160px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{new Date(scope.row.created_at).format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="下载量" prop="downloadNum"></el-table-column>
        <el-table-column label="类型" prop="typeName"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">
            <span :style="getColor(scope.row.state)">{{scope.row.state|state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="$router.push(`/detail?id=${scope.row.id}`)">查看</el-button>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
            <el-button size="mini" type="danger" plain v-if="scope.row.state == 1" @click="changeState(scope.row.id, 4)">暂停使用</el-button>
            <el-button size="mini" type="success" plain v-if="scope.row.state == 4" @click="changeState(scope.row.id, 1)">恢复使用</el-button>
            <el-button size="mini" type="primary" plain v-if="scope.row.state == 2" @click="changeState(scope.row.id, 1)">通过</el-button>
            <el-button size="mini" type="warning" plain v-if="scope.row.state == 2" @click="changeState(scope.row.id, 3)">驳回</el-button>
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
        keyWord: '',
        total: 100,
        state: ''
      },
      stateOptions: [
        { label: '已上线', value: 1 },
        { label: '待通过', value: 2 },
        { label: '已驳回', value: 3 },
        { label: '未使用', value: 4 },
      ],
      isLoading: false,
      typeList: []
    }
  },

  mounted() {
    this.getList()
    this.getTypeList()
  },

  methods: {
    getColor(s){
      if(s == 1){
        return 'color: green'
      }else if(s == 2){
        return 'color: orange'
      }else if(s == 3){
        return 'color: red'
      }else if(s == 4){
        return 'color: black'
      }
    },
    getList(){
      this.isLoading = true;
      getData.getComponentList(this.filters).then(res=>{
        this.isLoading = false;
        if(res.data.code === 1){
          this.list = res.data.data.list
          this.filters.total = res.data.data.total
        }
      })
    },
    getTypeList(){
      getData.typeList({pageSize: 100}).then(res=>{
        if(res.data.code == 1){
          this.typeList = res.data.data.list
        }
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
      this.filters.pageIndex = 1
      this.getList()
    },
    del(id){
      this.$confirm('确定要删除该组件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.delComponenet({ids: `${id}`}).then(res=>{
          if(res.data.code === 1){
            this.$message.success('删除成功')
            this.getList()
          }
        })
      }).catch(()=>{
        this.$message.info('操作取消')
      })
    },
    changeState(id, state){
      this.$confirm('是否确认继续操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        getData.changeComponentState({id: id, state: state}).then(res=>{
          if(res.data.code == 1){
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
    state(val){
      switch (val) {
        // 1-已上线;2-待通过;3-驳回;4-未使用
        case 1: return '已上线';
        case 2: return '待通过';
        case 3: return '已驳回';
        case 4: return '未使用';
        default: return '-'
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
