<template>
  <div class="login">
      <!-- 放置一个卡片组件，登录窗口 -->
      <el-card class="logincard">
          <div class="title">
              <!-- 图片 -->
              <img src="../../assets/img/logo_index.png" alt="" >
          </div>
          <!-- 登录表单容器  el-form中需要绑定model属性,rules属性绑定验证规则对象 -->
          <el-form ref="myForm" style="margin-top:20px" :model="loginForm" :rules="loginRules">
              <!-- <el-form-item> 代表一行内显示 需要校验prop=>要校验的名字，prop只是一个字段名-->
              <el-form-item prop="mobile">
                  <!-- 放置具体的组件 用v-model 双向绑定数据对象-->
                  <el-input v-model="loginForm.mobile" placeHolder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <!-- 表单域 -->
                  <el-input v-model="loginForm.code" style="width:60%" placeHolder="请输入验证码"></el-input>
                  <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="submitLogin" style="width:100%" type="primary">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  // 第一步，在data中定义表单数据对象
  data () {
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 校验规则
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }],
        check: [{
          validator: function (rule, value, callback) {
          // 自定义函数
          // rule当前规则
          // value指要校验的字段的值
            if (value) {
            // 认为校验通过
              callback()
            } else {
            // 认为校验不通过 要提示信息
              callback(new Error('您必须无条件被我们坑'))
            }
          }
        }]
      }
    }
  },
  methods: {
    //   提交登录表单
    submitLogin () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          //   认为前端校验登录表单成功
          console.log('前端校验成功，发送用户名和密码到后台')
          this.$axios({
            // 地址参数、查询参数 放在params对象里
            // body参数  放在对象里
            url: '/authorizations', // 请求地址
            method: 'post',
            data: this.loginForm
          }).then(result => {
            console.log(result)
            window.localStorage.setItem('user-token', result.data.data.token)
            // 调用localStorage的setItem方法，将token保存在本地
            this.$router.push('/home')
            // 登陆成功的提示
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
          }).catch(error => {
            console.log(error)
            // 登陆失败的提示
            this.$message({
              message: '手机号或验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login {
        background-image: url('../../assets/img/login_bg.jpg');
        background-size:cover; //自适应高度
        height: 100vh; //页面高度默认为100vh
        display: flex;
        justify-content: center;
        align-items: center;
        .logincard {
            width: 420px;
            height: 350px;
            display: flex; //弹性布局
            justify-content: center; //水平居中
            .title {
                text-align: center; //垂直居中
                img {
                    height: 40px; //图片自适应
                }
            }
        }
    }
</style>
