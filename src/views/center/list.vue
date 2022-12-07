<!--  -->
<template>
  <div class="c-list-box">
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
    <div class="list-box" v-loading="isLoading">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="c-item"
      >
        <div class="detail-1">
          <div :class="`state-label state-label-${item.state}`">{{item.state|state}}</div>
          <img :src="item.img" alt="">
          <div style="text-align: left">
            <el-button type="text" icon="el-icon-edit" @click="$router.push(`/edit?id=${item.id}`)">编辑</el-button>
            <el-button type="text" style="color: red" icon="el-icon-delete" @click="del(item.id)">删除</el-button>
          </div>
        </div>
        <div class="detail-2" @click="$router.push(`/detail?id=${item.id}`)">
          <div class="form-item">
            <div class="label">名称：</div>
            <div class="value" :title="item.name">{{item.name}}</div>
          </div>
          <div class="form-item">
            <div class="label">创建时间：</div>
            <div class="value" :title="new Date(item.created_at).format('yyyy-MM-dd hh:mm:ss')">{{new Date(item.created_at).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <div class="form-item">
            <div class="label">类型：</div>
            <div class="value">{{item.typeName}}</div>
          </div>
          <div class="form-item">
            <div class="label">下载量：</div>
            <div class="value">{{item.downloadNum}}</div>
          </div>
        </div>
      </div>
      <div class="empty-data" v-if="list.length == 0">
        暂无数据
      </div>
    </div>
    <div class="page-box">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-size="filters.pageSize"
        :current-page="filters.pageIndex"
        layout="total, sizes, prev, pager, next"
        :total="filters.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as getData from './../../api/server'
export default {
  components: {},

  data () {
    return {
      filters: {
        pageIndex: 1,
        pageSize: 20,
        keyWord: '',
        total: 100,
        state: '',
        userId: ''
      },
      isLoading: false,
      list: [],
      typeList: [],
      stateOptions: [
        { label: '已上线', value: 1 },
        { label: '待通过', value: 2 },
        { label: '已驳回', value: 3 },
        { label: '未使用', value: 4 },
      ],
    }
  },

  computed: {},

  mounted() {
    this.filters.userId = sessionStorage.getItem('userId') || this.$store.state.userId || null
    if(!this.filters.userId){
      this.$message.warning('未登录')
      return
    }
    this.getList()
    this.getTypeList()
  },

  methods: {
    getList(){
      this.isLoading = true
      getData.getComponentList(this.filters).then(res=>{
        this.isLoading = false
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
  },
  beforeDestroy() {}
}

</script>
<style lang='scss' scoped>
.c-list-box{
  width: 100%;
  height: calc(100% - 35px);
  display: flex;
  flex-direction: column;
  .list-box{
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: 15px;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0;
    }
    .c-item{
      width: 200px;
      margin-right: 20px;
      margin-bottom: 15px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover{
        .detail-2{
          right: 0;
        }
        .detail-1 img{
          transform: translateX(-200px)
        }
      }
      .detail-1{
        position: relative;
        .state-label{
          position: absolute;
          left: 0;
          color: #fff;
          padding: 1px 5px;
        }
        .state-label-1{
          background: rgb(0, 179, 0);
        }
        .state-label-2{
          background: rgb(241, 137, 0);
        }
        .state-label-3{
          background: rgb(255, 114, 114);
        }
        .state-label-4{
          background: rgb(75, 75, 75);
        }
        img{
          width: 200px;
          height: 130px;
          background: rgb(245, 245, 245);
          transition: all .5s;
          object-fit: contain;
        }
      }
      .detail-2{
        position: absolute;
        width: 200px;
        height: 130px;
        background: rgb(248, 248, 248);
        top: 0;
        right: -200px;
        transition: all .5s;
      }
      .form-item{
        display: flex;
        padding: 0 15px;
        margin-top: 13px;
        .label{
          word-break: keep-all;
          color: rgb(177, 177, 177);
        }
        .value{
          word-break: break-all;
          flex: 1;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgb(87, 87, 87);
        }
      }
    }
    .c-item:nth-child(4n){
      margin-right: 0;
    }
  }
  .page-box{
    height: 40px;
    text-align: right;
  }
  .search-box{
    text-align: left;
  }
  .empty-data{
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
}
</style>
