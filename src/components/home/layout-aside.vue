<template>
    <div class="layout-aside">
        <div class="title">
            <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- 直接在标签内写router 代表:router=true  即开启路由模式 -->
        <el-menu router style="width:231px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
            <!-- 左侧导航栏 -->
            <!-- index作为跳转的地址 类似于 router-link to  -->
            <el-menu-item index="/home" >首页</el-menu-item>
            <!-- 二级导航 -->
            <!-- 使用 index="1" index="2" 防止两个导航列表同时打开 -->
            <el-submenu index="1">
                <!-- 具名插槽 -->
                <span slot='title'>内容管理</span>
                <el-menu-item index="/home/publish">发布内容</el-menu-item>
                <el-menu-item index="/home/">内容列表</el-menu-item>
                <el-menu-item index="/home/comment">评论列表</el-menu-item>
                <el-menu-item index="/home/material">素材管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <span slot='title'>粉丝管理</span>
                <el-menu-item index="/home/picture">图文数据</el-menu-item>
                <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
                <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
                <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
            </el-submenu>
            <el-menu-item>账户信息</el-menu-item>
        </el-menu>
    </div>

</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-aside {
        width: 230px;
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
