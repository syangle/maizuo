<template>
  <div class="hello">
    hello!
    <button @click="clickme">点击。。。。</button>
    <Hello></Hello>
  </div>
</template>

<script>
import Hello from './hello'
export default {
  methods: {
    clickme () {
      console.log('hello被欸点击了。。。')
    }
  },
  components: {
    Hello
  }
}
</script>
<!-- 在style标签上面添加scoped属性可以使style里面的样式只作用于当前组件 -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  // div{
  //   background: red;
  //   button{
  //     color: rgb(215, 18, 233);
  //   }
  // }

  div{
    background:red;
  }
// 如果需要影响第三方插件和子组件样式的话，需要通过/deep/，也就是scoped的穿透
  .hello /deep/ button{
    color: rgb(215, 18, 233);
  }
</style>
