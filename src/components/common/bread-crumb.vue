<template>
<!-- 面包屑的内容 -->
  <!-- 更改样式separator -->
  <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 插槽 -->
          <solt name="title">评论列表</solt>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
