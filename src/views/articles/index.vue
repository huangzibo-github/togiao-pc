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
<!-- 主体结构 -->
    <el-row class="total">
        <span>共找到xx条符合条件的数据</span>
    </el-row>
    <!-- 循环模板 -->
    <el-row v-for="item in 10" :key='item' class="articleItem" type='flex' justify='space-between'>
        <!-- 左侧 -->
        <el-col :span='14'>
            <el-row type='flex' span='10'>
                <img src="../../assets/img/404.png" alt="">
                <div class="info">
                    <span>xxxxx</span>
                    <el-tag class="tag">已发表</el-tag>
                    <span class="date">2019-12-12 09:15:20</span>
                </div>
            </el-row>
        </el-col>
        <!-- 右侧 -->
        <el-col class="right" :span='6'>
            <el-row type='flex' justify='end'>
                <span><i class="el-icon-edit"></i>修改</span>
                <span><i class="el-icon-delete"></i>删除</span>
            </el-row>
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
    .total {
        margin: 50px 0;
        height: 20px;
        border-bottom: 1px dashed #ccc;
    }
    .articleItem {
        margin: 20px 0;
        padding: 10px 0;
        border-bottom: 1px solid #f2f3f5;
        img {
            width: 180px;
            height: 120px;
            margin-right: 10px;
            border-radius: 4px;
        }
        .info {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .tag {
                max-width: 80px;
                text-align: center;
            }
            .date {
                color: #999;
                font-size: 12px;
            }
        }
        .right {
            span {
                margin-left: 8px;
                font-style: 14px;
                cursor: pointer;
            }
        }
    }
</style>
