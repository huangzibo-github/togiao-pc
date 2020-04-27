<template>
    <div class="home">
        <el-container>
            <!-- 左右布局 -->
            <el-aside style="background-color:#353b4e;height:100vh;width:230px">
                <layout-aside></layout-aside>
            </el-aside>
            <el-container>
                <!-- 上下布局 -->
                <el-header class="header">
                    <!-- 头部组件 -->
                    <layout-header></layout-header>
                </el-header>
                <el-main class="main">
                    <!-- 放置二级路由容器 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style lang="less" scoped>
    .home {
        .main {
            background-color: green;
        }
    }
</style>
