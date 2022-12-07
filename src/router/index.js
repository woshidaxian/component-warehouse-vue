import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/detail',
    name: '组件详情',
    component: () => import('./../views/detail.vue')
  },
  {
    path: '/add',
    name: '新增组件',
    component: () => import('./../views/add.vue')
  },
  {
    path: '/back',
    name: '后台管理',
    component: () => import('./../views/back.vue'),
    children: [
      {
        path: '/back/user',
        name: '用户管理',
        component: () => import('./../views/back/user.vue')
      },
      {
        path: '/back/component',
        name: '组件管理',
        component: () => import('./../views/back/component.vue')
      },
      {
        path: '/back/log',
        name: '操作日志',
        component: () => import('./../views/back/log.vue')
      },
      {
        path: '/back/type',
        name: '组件类型',
        component: () => import('./../views/back/type.vue')
      },
      {
        path: '/back/code',
        name: '注册码管理',
        component: () => import('./../views/back/invite.vue')
      }
    ],
    redirect: '/back/component'
  },
  {
    path: '/personal',
    name: '个人中心',
    component: () => import('./../views/personalCenter.vue'),
    children: [
      {
        path: '/personal/list',
        name: '我的组件',
        component: () => import('./../views/center/list.vue')
      }
    ],
    redirect: '/personal/list'
  },
  {
    path: '/edit',
    name: '编辑组件',
    component: () => import('./../views/edit.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
