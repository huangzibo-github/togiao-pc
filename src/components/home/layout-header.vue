<template>
  <el-row class="layout-header" type='flex' justify='space-between' align='middle'>
      <!-- 左侧 -->
      <el-col class="left" :span='6'>
          <i class="el-icon-s-unfold"></i>
          <span class="title">江苏弱智博客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col class="right" :span='4'>
          <el-row type='flex' justify='end' align='middle'>
            <!-- 使用三元表达式，如果没有头像则使用默认头像 -->
            <img :src="userInfo.photo ? userInfo.photo : defaultImg " alt="">
            <!-- 下拉菜单 -->
            <!-- 点击激活，设置trigger="click"，默认为hover激活 -->
            <el-dropdown @command="handleCommand" trigger="click">
                <span>
                    <!-- 更改昵称 -->
                    {{userInfo.name}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 个人信息
      defaultImg: require('../../assets/img/avatar.jpg') // 先把地址转换成变量，再进行三元表达式判断
    }
  },
  created () {
    const token = window.localStorage.getItem('user-token') // 获取令牌
    // 直接通过axios查询个人信息
    this.$axios({
      url: '/user/profile',
      // header参数
      headers: {
        Authorization: `Bearer ${token}`// Bearer后面要加空格
      }
    }).then(result => {
      // console.log(result.data)
      this.userInfo = result.data.data // 获取用户个人信息
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'exit') {
        window.localStorage.removeItem('user-token') // 删除令牌
        this.$router.push('/login') // 跳转回登录页
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/89heimatoutiao'
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 60px;
        .left {
            font-size: 18px;
            .title {
                margin-left: 5px;
                color: #2c3e50;
                font-size: 16px;
            }
        }
        .right {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }
    }
</style>
