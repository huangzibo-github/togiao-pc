<template>
<!-- 卡片组件 -->
  <el-card>
      <!-- 面包屑给了卡片的具名插槽  slot="header" -->
      <bread-crumb slot="header">
      <!-- 插槽内容 -->
        <template slot="title">评论列表</template>
      </bread-crumb>

      <!-- body内容 -->
      <el-table v-loading="loading" :data='list'>
          <!-- 列组件 label表头 -->
          <el-table-column prop="title" width="600" label="标题"></el-table-column>
          <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
              <!-- 作用域插槽 -->
              <template slot-scope="obj">
                <el-button type="text" size='small'>修改</el-button>
                <el-button @click="openOrClose(obj.row)" type="text" size='small'>{{obj.row.comment_status? '关闭评论':'打开评论'}}</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type='flex' justify='center' align='middle' style="height:80px">
          <el-pagination background layout="prev, pager, next"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          @current-change="changePage"
          ></el-pagination>
      </el-row>
  </el-card>
</template>

<script>
import { getComment, openOrClose } from '../../actions/comment'
export default {
  data () {
    return {
      loading: false, // 加载状态
      list: [],
      page: {
        total: 0, // 数据总条数
        pageSize: 10, // 默认每页10条
        currentPage: 1 // 默认当前页码
      }
    }
  },
  methods: {
    //   页码改变事件
    changePage (newPage) {
      // 修改当前页码
      this.page.currentPage = newPage
      this.getComment()
    },
    //   请求评论列表数据
    async getComment () {
      this.loading = true
      // axios 默认是get类型
      // query 查询参数
      const params = {
        response_type: 'comment',
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      // await 强制等待到后面是promise执行完毕
      const result = await getComment(params)
      this.list = result.data.results // 获取评论列表数据给本身data
      this.page.total = result.data.total_count // 获取文章总条数
      this.loading = false
    },
    // 定义一个布尔值转换方法
    formatterBool (row, column, cellValue, index) {
      // row 当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论
    async openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您确定要${mess}评论吗`)
      const params = { article_id: row.id.toString() }
      const data = { allow_comment: !row.comment_status }
      await openOrClose(params, data)
      //   打开或者关闭评论成功之后
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getComment() // 重新请求列表
    }
  },
  created () {
    this.loading = true
    this.getComment()
  }
}
</script>

<style>

</style>
