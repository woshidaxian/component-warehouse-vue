<!--  -->
<template>
  <div class="page">
    <el-row class="list" :gutter="15">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :xs="12" :sm="8" :md="6" :lg="6" :xl="4"
      >
        <div class="list-item">
          <div class="info-img">
            <img :src="item.img" alt="">
            <div class="img-mask">
              <div class="btn-look">查看详情</div>
            </div>
          </div>
          <div class="info-box">
            <div class="info-title ellipsis">{{item.title}}</div>
            <div class="info-author"><span>贡献人：</span>{{item.author}}</div>
            <div class="info-time"><span>收录时间：</span>{{item.time}}</div>
            <div class="flex-row-between" style="margin-top: 5px;">
              <div class="info-download"><span>下载量：</span>{{item.download}}次</div>
              <div class="info-file ellipsis">{{item.fileName}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="page-box">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="filters.total"
        :page-size="filters.pageSize"
        :current-page="filters.pageIndex"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
      list: [
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: require('./../assets/image/chaar.png'),
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        }
      ],
      isLoading: false,
      filters: {
        pageSize: 10,
        pageIndex: 1,
        total: 1000,
        keyWord: ''
      }
    }
  },

  computed: {},

  mounted() {},

  methods: {
    getList(){

    },
    handleSizeChange(val){
      this.filters.pageSize = val
    },
    handleCurrentChange(val){
      this.filters.pageIndex = val
    },
    search(){
      this.filters.keyWord = this.$store.state.searchKey
      this.filters.pageIndex = 1
      this.getList()
    }
  },

  beforeDestroy() {}
}

</script>
<style lang='scss' scoped>
.ellipsis{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.ellipsis1{
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.flex-row-between{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.page{
  padding-bottom: 40px;
  padding-top: 70px;
  padding-left: 15px;
  height: 100%;
  .list{
    width: 100%;
    .list-item{
      height: 350px;
      background: #fff;
      border-radius: 16px;
      margin-bottom: 20px;
      overflow: hidden;
      transition: all .5s;
      &:hover{
        box-shadow: 0 0 20px 5px rgba(128, 128, 128, 0.448);
      }
      .info-img{
        width: 100%;
        border-radius: 16px;
        height: 60%;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow: hidden;
        transition: all .5s;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all .5s;
        }
        &:hover img{
          transform: scale(1.4);
        }
        &:hover .img-mask{
          background: rgba(0,0,0,.6);
        }
        .img-mask{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transition: all .5s;
        }
        &:hover .btn-look{
          opacity: 1;
        }
        .btn-look{
          opacity: 0;
          transition: all .5s;
          color: #fff;
          text-align: center;
          line-height: 250px;
          font-size: 16px;
        }
      }
      .info-box{
        padding: 15px;
        text-align: left;
      }
      .info-title{
        width: 100%;
        text-align: left;
        font-family: 黑体;
        font-weight: bold;
        line-height: 20px;
        overflow: hidden;
        font-size: 15px;
        border-bottom: 1px solid rgb(231, 231, 231);
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
      .info-time{
        color: rgb(168, 168, 168);
        margin-top: 5px;
      }
      .info-author{
        font-size: 14px;
        font-weight: bold;
        font-family: 楷体;
      }
      .info-download{
        color: rgb(168, 168, 168);
        font-size: 13px;
      }
      .info-file{
        flex: 1;
        text-align: right;
        color: rgb(0, 158, 231);
        font-weight: bold;
        font-family: 楷体;
        font-size: 15px;
        cursor: pointer;
        padding-left: 5px;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
  .page-box{
    padding: 10px 0;
    height: 35px;
  }
}
</style>
