import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor' // 引入quill组件
import 'quill/dist/quill.core.css' // 引入富文本编辑器样式
import 'quill/dist/quill.snow.css' // 引入富文本编辑器样式
import 'quill/dist/quill.bubble.css' // 引入富文本编辑器样式
// 所有自定义组件的插件
export default {
  install (Vue) { // 调用该对象的install方法
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb) // 全局注册一个面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
  }
}
