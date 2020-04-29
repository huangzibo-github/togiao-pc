// 对axios进行一个封装
import axios from 'axios'
import router from '../router' // 引入路由实例对象
import { Message } from 'element-ui' // 引入提示对象
import JSONBig from 'json-bigint' // 引入第三方包
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 赋值给默认地址
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 第一个参数 请求成功时执行
  // config是axios的所有配置
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 返回的config就会作为新的请求选项去进行请求
}, function () {
  // 第二个参数 请求失败时执行
})
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) // 用JSONBig.parse(data)替换之前的JSON.parse(data)
}]
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据进行处理
  // 第一个参数，响应成功之后执行
  // 如果直接return respones.data 在删除接口时,可能会返回一个null或undefined,
  // 所以需要判断一下，如果成功之后则返回response.data , 失败则返回一个空对象
  return response.data ? response.data : {} // 解决当data不存在时 then中读取数据报错问题
}, function (error) {
  // 第二个参数，响应失败之后执行。 回调函数  所有的失败都会进入
  // 根据状态码进行响应的提示或操作
  const status = error.response.status // 获取状态码 根据状况进行提示
  //   const configurl = error.config.url // 请求地址
  let message = '' // 提示信息
  switch (status) {
    case 400:
      message = '手机号或验证码错误'
      break
    case 401:
      // token过期，强制跳转到登录页 this.$router => 路由实例对象
      message = '登录过期'
      router.push('/login')
      break
    case 403:
      // resfehtoken过期，强制跳转到登录页
      message = '登录过期'
      router.push('/login')
      //   如果是同样的状态码，需要通过请求地址来判断是哪个响应，请求状态和状态码 一起来判断如何处理
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号错误'
      break
    default:
      break
  }
  // 提示消息
  Message({ type: 'warning', message })
  // 想让错误拦截器的内容继续进入到以后的catch中，而不是进入then
  return Promise.reject(error)
})

export default axios // 导出封装好的axios
