<template>
  <div class="cover-image">
      <!-- 根据封面的image长度进行渲染 -->
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close="closeDialog">
          <!-- 选择素材组件 -->
          <!-- 监听谁的事件，就在谁的标签上写事件 -->
          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1 // 默认下标 -1
    }
  },
  methods: {
    //   接收图片
    receiveImg (img) {
      // props是只读的，不能修改
      // 接收数据之后 要想修改只能再次传递
      this.$emit('clickOngImg', img, this.selectIndex) // 再次触发一次自定义事件
      this.closeDialog() // 直接关闭弹层
    },
    //   打开弹层
    openDialog (index) {
      this.selectIndex = index
      this.dialogVisible = true
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .cover-image {
        display: flex;
        margin: 20px 0;
        margin-left: 100px;
        .cover-item {
            border: 1px solid #ccc;
            width: 250px;
            height: 250px;
            padding: 10px;
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
