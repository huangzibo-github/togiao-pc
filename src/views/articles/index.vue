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
            <el-radio-group @change="changeCondition" v-model="formData.status">
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
            <el-select @change="changeCondition" v-model="formData.channel_id">
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
                @change="changeCondition"
                value-format="yyyy-MM-dd"
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
    <!-- 循环模板                        key要转换成字符串          -->
    <el-row v-for="item in list" :key='item.id.toString()' class="articleItem" type='flex' justify='space-between'>
        <!-- 左侧 -->
        <el-col :span='14'>
            <el-row type='flex' span='10'>
                <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
                <div class="info">
                    <span>{{item.title}}</span>
                    <!-- 添加过滤器  过滤器不但可以在差值表达式中使用，还可以在v-bind表达式中使用-->
                    <el-tag class="tag" :type='item.status | filterType'>{{item.status | filterStatus}}</el-tag>
                    <span class="date">{{item.pubdate}}</span>
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
      channels: [],
      list: [], // 接收文章列表数据
      defaultImg: require('../../assets/img/404.png')
    }
  },
  filters: {
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核通过'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    //   改变条件
    changeCondition () {
      // 组装条件
      const params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id, // 频道
        //  因为formData.dateRange是数组 所以需要判断一下，看formData.dateRange 的长度
        begin_pubdate: this.formData.dateRange.length > 0 ? this.formData.dateRange[0] : null, // 起始时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[0] : null // 截止时间
      }
      this.getArticles(params)
    },
    //   获取文章列表数据 , 根据筛选条件需要传参params，并接收
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
      })
    },
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
    this.getArticles()
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
