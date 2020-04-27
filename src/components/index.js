import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
// 所有自定义组件的插件
export default {
  install (Vue) { // 调用该对象的install方法
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
