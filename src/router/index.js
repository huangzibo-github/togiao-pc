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
  }, {
    // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
    path: '*',
    component: () => import('../views/404') // 匹配不到组件时，就默认匹配到404页面
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
    }, {
      path: 'material', // 素材列表
      component: () => import('../views/material')
    }, {
      path: 'articles',
      component: () => import('../views/articles')
    }, {
      // 定义动态路由参数 此规则只匹配 修改文章
      path: 'publish/:articleId',
      component: () => import('../views/publish')
    }, {
      // 此规则匹配发布文章
      path: 'publish',
      component: () => import('../views/publish')
    }, {
      path: 'account', // 账户信息
      component: () => import('../views/account')
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
