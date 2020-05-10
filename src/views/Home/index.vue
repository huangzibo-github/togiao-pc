<template>
    <div class="home">
        <el-container>
            <!-- 左右布局 -->
            <el-aside :style="{width:collaspse ? '60px' : '230px'}" style="transition:all 0.3s;background-color:#353b4e;min-height:100vh;overflow:hidden">
                <layout-aside :collaspse="collaspse"></layout-aside>
            </el-aside>
            <el-container>
                <!-- 上下布局 -->
                <el-header class="header">
                    <!-- 头部组件 -->
                    <layout-header></layout-header>
                </el-header>
                <el-main class="main" style="padding:0">
                    <!-- 放置二级路由容器 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collaspse: false // 是否折叠
    }
  },
  components: {

  },
  created () {
    //   开启监听
    eventBus.$on('changeCollaspse', () => {
      this.collaspse = !this.collaspse
    })
  }
}
</script>

<style lang="less" scoped>

</style>
