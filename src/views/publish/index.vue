<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- 表单 -->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
          <el-form-item prop="title" label="标题">
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
              <quill-editor style="height:400px" v-model="formData.content" type='textarea' :row='4'></quill-editor>
          </el-form-item>
          <el-form-item prop="type" label="封面" style="margin-top:100px">
              <el-radio-group @change="changeType" v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 放置一个封面组件  需要用到组件传值父传子 props -->
          <cover-image @clickOngImg="receiveImg" :list="formData.cover.images"></cover-image>
          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="formData.channel_id">
                  <el-option v-for="item in channels" :value="item.id" :label="item.name" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publishArticle()" type='primary'>发布</el-button>
              <el-button @click="publishArticle(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: { // 封面
          type: 0, // -1 自动， 0 无图， 1 一张 ，3 三张
          images: [] // 存储的图片地址
        },
        channel_id: null // 频道id
      },
      //   校验规则对象
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空' }, {
          min: 5, max: 30, message: '标题长度需要在5-30字符之间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      // to里有一个path,就是要去的地址，还有一个属性叫params,表示这里边的id,判断这里有没有id,也就是判断该对象的长度
      // es6语法有一个语法叫Object.keys 可以将对象中的属性变成一个数组,判断数组长度即可
      if (Object.keys(to.params).length) {
        //   有参数就是修改
        this.getArticleById(to.params.articleId) // 重新拉取数据
      } else {
        // 没有参数,就还是发布页面
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: { // 封面
            type: 0, // -1 自动， 0 无图， 1 一张 ，3 三张
            images: [] // 存储的图片地址
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    receiveImg (img, index) {
      // 接收到数据之后 修改images数组
      // this.formData.cover.images[index] = img 这样不能被Vue监控到
      // 当数组变成新数组就会触发响应式视图更新    将新数组赋值到原数组
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return img
      //   }
      //   return item
      // })
      // 简写
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item)
    },
    // type改变触发事件  只有点击切换时才会触发
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        // 单图模式
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        // 三图模式
        this.formData.cover.images = ['', '', '']
      }
    },
    //   发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          const { articleId } = this.$route.params
          // if (articleId) {
          //   this.$axios({
          //     url: `/article/${articleId}`,
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   //   console.log('校验成功')
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //   //   新增成功应该回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // }
          // 代码优化！！---------------!!！
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft },
            data: this.formData
          }).then(result => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    }
  },
  created () {
    this.getChannels()
    // 获取id,判断你有无id,有就是修改,没有就是发布
    // 获取动态路由参数 articleId已经是字符串
    const { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
