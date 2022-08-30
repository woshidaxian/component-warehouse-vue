<!--  -->
<template>
  <div class="page">
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list-item"
      ></div>
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
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        },
        {
          id: 1,
          title: '物联弹窗-能耗管理',
          img: '',
          time: '2022-08-08 12:12:12',
          author: 'hwg',
          download: 100,
          fileName: 'energy-control.vue',
          fileUrl: ''
        }
      ],
      isLoading: false
    }
  },

  computed: {},

  mounted() {},

  methods: {},

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
    }
  }
}
</style>
