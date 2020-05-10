<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
        <template slot="title">素材管理</template>
      </bread-crumb>
      <!-- 上传按钮 -->
      <el-row type='flex' justify='end'>
          <el-upload :http-request='onLoad' :show-file-list='false'>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
      </el-row>
      <el-tabs v-model="activeName"  @tab-click="changeTab">
            <el-tab-pane label="全部素材" name="all">
                <!-- 全部素材内容 -->
                <div class="img-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                        <el-row class="operate" type='flex' justify='space-around' align='middle'>
                            <!-- v-bind:style 根据收藏状态显示图标颜色 -->
                            <i @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
                            <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane class="img-list" label="收藏素材" name="collect">
                <!-- 收藏素材内容 -->
                <el-card class="img-card img-list2" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <el-row class="operate" type='flex' justify='space-around' align='middle'>
                    </el-row>
                </el-card>
            </el-tab-pane>
      </el-tabs>
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
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 接收全部数据
      page: {
        total: 0, // 数据总条数
        pageSize: 20, // 默认每页10条
        currentPage: 1 // 默认当前页码
      },
      loading: false
    }
  },
  methods: {
    //   删除素材
    async delMaterial (id) {
      await this.$confirm('您确定要删除该素材吗')
      await this.$axios({
        method: 'delete',
        url: `/user/images/${id}`
      })
      this.getAllMaterial()
    },
    //   收藏或者取消收藏
    async collectOrCancel (row) {
      // 调用收藏或取消收藏接口
      await this.$axios({
        method: 'put',
        // 动态接口，使用模板字符串
        url: `/user/images/${row.id}`,
        data: {
          collect: !row.is_collected // 状态取反  收藏=>取消 取消=>收藏
        }
      })
      this.getAllMaterial()
    },
    //   上传图片
    async onLoad (params) {
      this.loading = true
      // formdata 必须实例化
      const form = new FormData()
      form.append('image', params.file) // 添加文件到Formdata
      await this.$axios({
        method: 'post',
        url: '/user/images',
        data: form
      })
      //   上传成功之后
      this.getAllMaterial()
      this.loading = false
    },
    //   改变当前页码事件
    changePage (newPage) {
      // 修改当前页码
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    //   切换tab事件
    changeTab () {
      this.page.currentPage = 1 // 应该把页码回到第一页
      this.getAllMaterial() // 点击切换需要重新查询一次,只需要再调用一次方法
    },
    async getAllMaterial () {
      const result = await this.$axios({
        url: '/user/images',
        // collect为false是查看所有  this.activeName === 'collect' 是查看收藏
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 获取素材总数
    }
  },
  created () {
    this.getAllMaterial() // 获取所有素材 第一次进入 activeName 为 all
  }
}
</script>

<style lang='less' scoped>
    .img-list {
        display: flex;
        flex-wrap: wrap;
        .img-card {
            width: 150px;
            height: 150px;
            margin: 30px 40px;
            position: relative;
            border-radius: 5%;
            img {
                width: 150px;
                height: 120px;
                border-radius: 5%;
                margin: -20px 0 0 -20px;
            }
            .operate {
                width: 100%;
                font-size: 20px;
                position: absolute;
                bottom: 0;
                left: 0;
                height: 30px;
                i {
                    cursor: pointer;
                }
            }
        }
        .img-list2 {
            width: 150px;
            height: 120px;
            margin: 30px 40px 60px 40px;
            position: relative;
            border-radius: 5%;
            img {
                width: 150px;
                height: 120px;
                border-radius: 5%;
                margin: -20px 0 0 -20px;
            }
        }
    }
</style>
