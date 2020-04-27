<template>
    <div class="home">
        <el-container>
            <!-- 左右布局 -->
            <el-aside class="aside">左侧</el-aside>
            <el-container>
                <!-- 上下布局 -->
                <el-header class="header">头部</el-header>
                <el-main class="main">主要区域</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .home {
        .aside {
            background-color: pink;
            height: 100vh;
        }

        .header {
            background-color: yellow;
        }

        .main {
            background-color: green;
        }
    }
</style>
