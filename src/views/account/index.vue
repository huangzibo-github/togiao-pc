<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <!-- 上传组件 -->
      <el-upload :http-request="uploadImg" class="head-upload" action="" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
      <!-- 放置组件 -->
      <el-form ref="myForm" style="margin-left:100px" :rules="rules" :model="formData" label-width="80px">
        <el-form-item prop="name" label="用户名">
          <el-input v-model="formData.name" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="简介">
          <el-input v-model="formData.intro" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="formData.mobile" disabled style="width:40%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus.js'
export default {
  data () {
    return {
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 用户简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''// 手机号
      },
      defaultImg: require('../../assets/img/404.png'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' },
          {
            min: 1,
            max: 7,
            message: '用户名的长度限制为1到7个字符'
          }],
        email: [{ required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }],
        intro: [{ required: true, message: '简介不能为空' }]
      }
    }
  },
  methods: {
    //   上传图片
    uploadImg (params) {
      this.loading = true
      const data = new FormData()
      data.append('photo', params.file) // 加入参数
      this.$axios({
        url: 'user/photo',
        data,
        method: 'patch'
      }).then(result => {
        this.formData.photo = result.data.photo // 设置头像地址
        this.loading = false
      })
    },
    //   保存用户信息
    saveUserInfo () {
      // 校验表单数据是否ok
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: 'user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
            eventBus.$emit('updateUserInfoSuccess') // 触发一个自定义事件 updateUserInfoSuccess
          })
        }
      })
    },
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload{
    position: absolute;
    right: 300px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
</style>
