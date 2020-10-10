<template>
  <div id="app">
   <!--  app.vue
    {{msg2}} -->
    <!-- 3.调用子组件 -->
   <!--  <HelloWorld></HelloWorld>
    <Child :msg='msg' @change="clickFa"></Child>

    <h1>下面是移动切换</h1> -->

 <!--    <nav>
      <ul>
         <router-link to="/films" tag="li" active-class="active">电影</router-link>
        <router-link to="/ciname" tag="li" active-class="active">影院</router-link>
        <router-link to="/center" tag="li" active-class="active">个人</router-link>

     router-link的跳转 称之为声明式导航
        <router-link
          v-for="list in navList" tag="li"
          :key="list.id"
          :to="list.path"
          active-class="active"
        >{{list.title}}</router-link>
      </ul>
    </nav> -->

    <!-- 路由容器 基于slot插槽封装的-->
    <!-- <transition name="app" mode="out-in">
        <router-view></router-view>
    </transition> -->
     <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Tabbar v-show="isTabbarShow"></Tabbar>
  </div>
</template>

<script>
// 引入vue
// import Vue from 'vue'
import Tabbar from '@/components/Tabbar'
// 1.引入HelloWorld组件
import HelloWorld from './components/HelloWorld'
// import Child from '@components/Child'
import Child from 'con/Child' // 在vue中，@指向了src
// 2.全局注册组件
// Vue.component('HelloWorld',HelloWorld)
import { mapState } from 'vuex'
export default {
  data () {
    return {
      msg: 'hello world',
      msg2: '',
      include: []
    }
  },


  watch: {
    $route(to, from) {
      // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退：
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  },




  // 2.配置局部组件
  components: {
    // HelloWorld:HelloWorld//键值和名字相同就可以简写
    HelloWorld,
    Child,
    Tabbar
  },
  computed: {
    ...mapState('tabbar', ['isTabbarShow'])
  },
  methods: {
    clickFa (cmsg) {
      this.msg2 = cmsg
    }
  },
  mounted () {
    // console.log(this.isTabbarShow)
  }
}
</script>
<style lang="scss">
/* App.vue里面的样式是全局样式，会覆盖掉组件里面的 */
  /* div{
    background: rosybrown;
  } */

  .app-enter-active{
    animation: move .5s;
  }
  .app-leave-active{
    animation: move .5s reverse;
  }
@keyframes move{
  0%{
    opacity: 0;
    transform: translateY(100px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
