<template>
    <div class="layout-aside">
        <div class="title">
            <img :src="collaspse ? smallImg : bigImg" alt="">
        </div>
        <!-- 直接在标签内写router 代表:router=true  即开启路由模式 -->
        <!-- 动态折叠，折叠之后图标就没了，需要加图标 -->
        <el-menu
        :collapse='collaspse'
        router
        :style="{width:collaspse ? '60px' : '230px'}"
        background-color='#353b4e'
        text-color="#adafb5"
        active-text-color="#ffd04b">
            <!-- 左侧导航栏 -->
            <!-- index作为跳转的地址 类似于 router-link to  -->
            <el-menu-item index="/home" >
                <i class="el-icon-s-home"></i>
                <span>首页</span>
            </el-menu-item>
            <!-- 二级导航 -->
            <!-- 使用 index="1" index="2" 防止两个导航列表同时打开 -->
            <el-submenu index="1">
                <!-- 具名插槽 -->
                <template slot='title'>
                    <i class="el-icon-s-order"></i>
                    <span>内容管理</span>
                </template>
                <el-menu-item index="/home/publish">发布内容</el-menu-item>
                <el-menu-item index="/home/articles">内容列表</el-menu-item>
                <el-menu-item index="/home/comment">评论列表</el-menu-item>
                <el-menu-item index="/home/material">素材管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot='title'>
                    <i class="el-icon-s-flag"></i>
                    <span>粉丝管理</span>
                </template>
                <el-menu-item index="/home/picture">图文数据</el-menu-item>
                <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
                <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
                <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/account">
                <i class="el-icon-s-custom"></i>
                <span>账户信息</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>

<script>
export default {
  props: ['collaspse'], // 接收传递过来的折叠值
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
    .layout-aside {
        overflow: hidden;
        .el-menu {
            border-right: none;
        }
        .title {
            text-align: center;
            background-color: #2e2f32;
            padding: 10px 0;
            img {
                height: 35px;
            }
        }

    }
</style>
