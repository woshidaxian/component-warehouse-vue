<!--  -->
<template>
  <div class="page">
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list-item"
      >
        <div class="info-img">
          <img :src="item.img" alt="">
          <div class="img-mask">
            <div class="btn-look">查看详情</div>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">{{item.title}}</div>
        </div>
      </div>
    </div>
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
.page{
  padding-bottom: 40px;
  padding-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 100%;
  .list{
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item{
      width: 24%;
      height: 400px;
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
      }
      .info-title{
        width: 100%;
        text-align: left;
        font-family: 黑体;
        font-weight: bold;
        height: 40px;
        overflow: hidden;
      }
    }
  }
  .page-box{
    padding: 10px 0;
  }
}
</style>
