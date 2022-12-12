<template>
  <div class="main-box">
    <div class="head flex-row-between">
      <div class="search-box"></div>
      <el-button type="primary" size="small" @click="showAdd = true">新增组件类型</el-button>
    </div>
    <div class="table-box">
      <el-table :data="list" border stripe height="100%" size="small">
        <template slot="empty">
          <el-button v-if="isLoading" type="text" :loading="true">加载中</el-button>
          <span v-if="!isLoading">暂无数据</span>
        </template>
        <el-table-column label="ID" prop="id" width="50px"></el-table-column>
        <el-table-column label="类型名称" prop="typeName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="id" show-overflow-tooltip>
          <template slot-scope="scope">
            {{new Date(scope.row.created_at).format('yyyy-MM-dd hh:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="resetName(scope.row)">重命名</el-button>
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

    <el-dialog :visible.sync="showAdd" :close-on-click-modal="false" title="新增组件类型" width="500px">
      <h-add-type v-if="showAdd" @close="showAdd = false" @init="search(), showAdd = false"></h-add-type>
    </el-dialog>

    <el-dialog :visible.sync="showReset" :close-on-click-modal="false" title="组件类型重命名" width="500px">
      <h-reset-type v-if="showReset" @close="showReset = false" @init="getList(), showReset = false" :typeInfo="activeInfo"></h-reset-type>
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
        total: 100
      },
      showAdd: false,
      isLoading: false,
      showReset: false,
      activeInfo: {
        id: null,
        typeName: ''
      }
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList(){
      this.isLoading = true
      getData.typeList(this.filters).then(res=>{
        this.isLoading = false
        if(res.data.code === 1){
          this.list = res.data.data.list
          this.filters.total = res.data.data.total
        }
      })
    },
    sizeChange(val){
      this.filters.pageSize = val
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
    resetName(row){
      this.showReset = true
      this.activeInfo = {
        id: row.id,
        typeName: row.typeName
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
