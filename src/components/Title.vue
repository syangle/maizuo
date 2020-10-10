<template>
    <div class="detailtitle">
        <i class="iconfont icon-xiaoyuhao" @click="handleBack"></i>
        <span><slot></slot></span>
    </div>
</template>

<script>
export default {
  methods: {
    handleBack () {
      // this.$router.back()
      // 当用户点击back返回的时候，希望调用者决定做什么样的功能
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
.detailtitle{
    height: 44px;
    width: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    line-height: 0.44rem;
    text-align: center;
    z-index: 10;
    i{
        position: absolute;
        left: 0;
    }
}
</style>
