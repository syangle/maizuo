<template>
    <div class="films">
       <Swiper cName='swipe'><!--传递cName-->
           <div
                class="swiper-slide"
                v-for="(banner,index) in banners"
                :key="banner.bannerId"
                 v-swiper='{
                     current:index,
                     length:banners.length,
                     swipe:"swipe",
                     films:{
                         loop:true,
                         autoplay:{delay:2000}
                     }
                 }'
            >
                <img :src="banner.imgUrl" alt="">
           </div>
       </Swiper>

        <router-view></router-view>
    </div>
</template>
<script>
// 引入Swiper组件
import Swiper from '@/components/Swiper'
// import Swip from 'swiper'
import axios from 'axios'
import { instance, instance2 } from '@/utils/http'// 变量解构的方式进行引入

export default {
  components: {
    Swiper// 注册组件Swiper
  },
  data () {
    return {
      banners: []
    }
  },

  created () {
    // 请求卖座数据
    instance.get('/gateway?type=2&cityId=310100&k=3847929', {
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      // console.log(res)
      this.banners = res.data.data
      // 必须要等到页面中出现了swiper-slide结构后，我们才能进行实例化的操作
      // this.$nextTick(()=>{
      //     new Swip(".swiper-container",{
      //         loop:true,
      //         autoplay:{
      //             delay:1000
      //         }
      //     })
      // })
    })

    // 要请求 http://47.105.51.234/api/goods/user数据
    // 默认未登录的时候，请求头上面没有携带token令牌发给后端，所以相应拦截里面返回Promise.reject(res.data.msg),然后触发器catch捕获错误信息
    // 登录的时候，然后再去请求user数据的时候，那么请求拦截器上面就做请求拦截判断，
    // 接下来就会在header上面携带token发送给后端，然后后端ok了，就会触发then打印数据了。
    instance2.get('/api/goods/user').then(res => {
      // console.log('请求本地user数据',res)
    }).catch(err => { console.log(err) })

    // instance.request({
    //     url:'/gateway?type=2&cityId=310100&k=3847929',
    //     methods: 'get',
    //     headers:{'X-Host': 'mall.cfg.common-banner' }
    // }).then(res=>{
    //     console.log(res)
    // })
  }
}
</script>
<style lang="scss" scoped>
    .swiper-slide{
        img{
            width: 100%;
        }
    }
</style>
