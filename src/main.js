import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入包
import 'element-ui/lib/theme-chalk/index.css' // 引入ElementUI样式
import './style/index.less' // 引入初始化样式
import axios from 'axios'
import components from './components' // 引入全局组件
import './permission' // 直接引入导航守卫
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 赋值给默认地址
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(components) // 注册全局组件 ，=>调用该对象的install方法
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
