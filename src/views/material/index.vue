<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">素材管理</template>
      </bread-crumb>
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部素材" name="all">
                <!-- 全部素材内容 -->
                <div class="img-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                        <el-row class="operate" type='flex' justify='space-around' align='middle'>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="收藏素材" name="collect"></el-tab-pane>
        </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [] // 接收全部数据
    }
  },
  methods: {
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: false }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getAllMaterial() // 获取所有素材
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
                height: 30px;
                margin-left: -20px;
            }
        }
    }
</style>
