<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <el-row class="searchTool">
          <el-col :span="2">
            <span>文章状态</span>
          </el-col>
          <!-- 单选框组 -->
          <el-col :span="18">
            <el-radio-group  v-model="formData.status">
                <!-- 全部这个label='5',在传参的时候会判断一下是不是5，如果是5,则返回null -->
                <el-radio :label='5'>全部</el-radio>
                <el-radio :label='0'>草稿</el-radio>
                <el-radio :label='1'>待审核</el-radio>
                <el-radio :label='2'>审核通过</el-radio>
                <el-radio :label='3'>审核失败</el-radio>
            </el-radio-group>
          </el-col>
      </el-row>
<!-- 频道列表 -->
      <el-row class="searchTool">
        <el-col :span="2">
          <span>频道列表</span>
        </el-col>
        <el-col :span="18">
            <el-select v-model="formData.channel_id">
                <!-- 循环生成多个 label指的是el-option的显示值  value指的是el-option的储存值 -->
                <el-option v-for="item in channels" :key='item.id' :label='item.name' :value='item.id'></el-option>
            </el-select>
        </el-col>
      </el-row>
<!-- 时间选择 -->
      <el-row class="searchTool">
        <el-col :span='2'>
          <span>时间选择</span>
        </el-col>
        <el-col :span="18">
            <el-date-picker
                v-model="formData.dateRange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: []
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
    .searchTool {
        height: 60px;
        padding-left: 50px;
    }
</style>
