<template>
  <div class="main-box">
    <div class="head flex-row-between">
      <div class="search-box">
        <el-input size="small" v-model="filters.keyWord" style="margin-right: 10px"></el-input>
        <el-select size="small" v-model="filters.type"></el-select>
        <el-button type="primary" size="small" style="margin-left: 10px" plain>搜索</el-button>
      </div>
      <el-button type="primary" size="small">新增组件</el-button>
    </div>
    <div class="table-box">
      <el-table :data="list" border stripe height="100%" size="small">
        <template slot="empty">
          <el-button v-if="isLoading" type="text" :loading="true">加载中</el-button>
          <span v-if="!isLoading">暂无数据</span>
        </template>
        <el-table-column label="ID" prop="id" width="50px"></el-table-column>
        <el-table-column label="名称" prop="name" width="250px" show-overflow-tooltip></el-table-column>
        <el-table-column label="著作人" prop="id" show-overflow-tooltip></el-table-column>
        <el-table-column label="收录时间" prop="id" width="160px" show-overflow-tooltip></el-table-column>
        <el-table-column label="下载量" prop="id"></el-table-column>
        <el-table-column label="类型" prop="id"></el-table-column>
        <el-table-column label="状态" prop="id" align="center"></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">编辑{{scope.row.id}}</el-button>
            <el-button size="mini" type="danger">删除</el-button>
            <!-- <el-button size="mini" type="danger">通过</el-button> -->
            <!-- <el-button size="mini" type="danger">驳回</el-button> -->
            <!-- <el-button size="mini" type="danger">暂停使用</el-button> -->
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
export default {
  name: '',
  components: {},
  data () {
    return {
      list: [
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 2 }
      ],
      filters: {
        pageIndex: 1,
        pageSize: 10,
        keyWord: '',
        total: 100
      },
      isLoading: false
    }
  },

  mounted() {},

  methods: {
    getList(){
      
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
