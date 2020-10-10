<template>
        <nav>
        <ul>
            <!-- <router-link to="/films" tag="li" active-class="active">电影</router-link>
            <router-link to="/ciname" tag="li" active-class="active">影院</router-link>
            <router-link to="/center" tag="li" active-class="active">个人</router-link> -->

        <!--router-link的跳转 称之为声明式导航 -->
            <router-link
            v-for="list in navList" tag="li"
            :key="list.id"
            :to="list.path"
            active-class="active"
            >
              <i class="iconfont" :class="list.icon"></i>
              <span>{{list.title}}</span>
            </router-link>
        </ul>
        </nav>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello world',
      msg2: '',
      navList: [
        { id: 1, title: '电影', path: '/films', icon: 'icon-dianying' },
        { id: 2, title: '影院', path: '/ciname', icon: 'icon-yingyuan' },
        { id: 3, title: '个人', path: '/center', icon: 'icon-wode1' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .active{
    color:rgb(231, 21, 119)
  }

  nav{
    position: fixed;
    z-index:10;background: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    ul{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .iconfont{
          font-size:0.25rem;
        }
      }
    }
  }
</style>
