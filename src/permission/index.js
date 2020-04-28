// 权限拦截 导航守卫
import router from '../router'

// 全局的前置守卫
router.beforeEach(function (to, from, next) {
  // 判断拦截地址   startWith()  以。。。为开头
  if (to.path.startsWith('/home')) {
    //   进行权限判断 判断有无token，如果有token就放过，如果没有就回到登录页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 有token直接放过
      next()
    } else {
      // 没有token强制跳转回登录页
      next('/login')
    }
  } else {
    next()
  } // 直接放行
})
