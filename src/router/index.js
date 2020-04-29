import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Home2 from '../views/Home/home'

Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    component: Home,
    // 二级路由表
    children: [{
      path: '', // 二级路由什么都不写，就会作为一级路由的默认显示组件
      component: Home2
    }, {
      path: 'comment',
      component: () => import('../views/comment')// 按需加载
    }]
  }, {
    // 登录页
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
