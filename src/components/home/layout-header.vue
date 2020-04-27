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
            <img src="../../assets/img/avatar.jpg" alt="">
            <!-- 下拉菜单 -->
            <!-- 点击激活，设置trigger="click"，默认为hover激活 -->
            <el-dropdown trigger="click">
                <span>
                    昵称666666
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {

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
