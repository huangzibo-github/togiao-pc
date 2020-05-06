<template>
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="meterial">
        <div class="select-img-list">
          <el-card class="img-card" v-for="item in list" :key='item.id'>
            <img @click="clickImg(item.url)" :src="item.url" alt="">
          </el-card>
        </div>
        <!-- 放置一个分页组件 -->
        <el-row type="flex" justify="center">
          <el-pagination background layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'meterial',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    clickImg (url) {
      // 需要将图片地址传出去 子传父
      this.$emit('selectOneImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" secoped>
  .select-img-list {
    display: flex;
    flex-wrap: wrap;
    .img-card {
      width: 120px;
      height: 120px;
      margin: 10px 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
