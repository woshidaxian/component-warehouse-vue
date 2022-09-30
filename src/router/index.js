import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/back',
    name: '后台管理',
    children: [
      {
        path: '/back/users',
        name: '用户管理',
        component: () => import('./../views/back/user.vue')
      },
      {
        path: '/back/component',
        name: '组件管理',
        component: () => import('./../views/back/component.vue')
      }
    ],
    redirect: '/back/component'
  }
]

const router = new VueRouter({
  routes
})

export default router
