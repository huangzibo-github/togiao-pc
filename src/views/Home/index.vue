<template>
    <div class="home">
        <el-container>
            <!-- 左右布局 -->
            <el-aside style="background-color:#353b4e;height:100vh;width:230px">
                <layout-aside></layout-aside>
            </el-aside>
            <el-container>
                <!-- 上下布局 -->
                <el-header class="header">头部</el-header>
                <el-main class="main">主要区域</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import layoutAside from '../../components/home/layout-aside.vue'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style lang="less" scoped>
    .home {
        .header {
            background-color: yellow;
        }

        .main {
            background-color: green;
        }
    }
</style>
