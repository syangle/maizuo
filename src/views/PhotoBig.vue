<template>
    <div>
        <p @click="handleBack">关闭</p>
        <div>
            <img :src="bigPhoto" alt="">
        </div>
    </div>
</template>

<script>
export default {
  props: ['bigPhoto'],
  data () {
    return {

    }
  },
  methods: {
    handleBack () {
      this.$emit('back')
    }
  },
  mounted () {
    console.log(this.bigPhoto)
  }
}
</script>

<style lang="scss" scoped>
  div{
      z-index: 20;
      width: 100%;
      height: 100%;
      background: rgb(90, 87, 87);
      p{
          font-size: 30px;
          color: rgb(240, 230, 221);
      }
      img{
          width: 75%;
          height: 150px;
          margin:160px auto;
      }
  }
</style>
