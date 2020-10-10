<template>
    <div class="detail" v-if='filmInfo' >
         <!-- <div class="detailtitle" v-title='50'>
            <i class="iconfont icon-xiaoyuhao" @click="handleBack"></i>
            <span>少年的你</span>
        </div>   -->
        <m-title @back="handleBack" v-title='40'>
            {{filmInfo.name}}
        </m-title>
        <img :src="filmInfo.poster">
        <div class="filmwrap">
            <h3>{{filmInfo.name}} <span class="san">{{filmInfo.filmType.name}}</span> <span class="fr grade">{{filmInfo.grade+'分'}}</span></h3>
            <p>{{filmInfo.category}}</p>
            <p>{{filmInfo.premiereAt | detailFilter}}上映</p>
            <p>{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</p>
            <p :class="{synopsis:isActive}">{{filmInfo.synopsis}}</p>
            <p  class="icon" @click="isActive = !isActive"><i class="iconfont" :class="isActive?'icon-jiantou' : 'icon-shangjiantou'"></i></p>
        </div>
        <div class="actor">
            <h2 style="margin-bottom: 10px;">演职人员</h2>
            <Swiper cName='actors' v-if="filmInfo.actors">
                <div
                    v-for="(data,index) in filmInfo.actors"
                    :key="data.name"
                    class="swiper-slide actor"
                    v-swiper="{
                        current:index,
                        length:filmInfo.actors.length,
                        swipe:'actors',
                        free:{
                            slidesPerView: 4,
                            spaceBetween: 10,
                            freeMode: true
                        }
                    }"
                >
                    <img :src='data.avatarAddress' alt="" class="actImg">
                    <h4 style=" width: 100%;
                        height: 18px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align:center"
                    >
                        {{data.name}}</h4>
                    <p style="text-align:center">{{data.role}}</p>
                </div>
            </Swiper>
            <div v-else>暂无演职人员</div>
        </div>

            <div style="height:115px">
                <h2 class="photos-title-bar" @click="isPhotoShow=true">剧照</h2>
                <Swiper cName='photos' v-if="filmInfo.photos">
                    <div
                        v-for="(data,index) in filmInfo.photos"
                        :key="data.name"
                        @click="handleImg(index)"
                        class="swiper-slide photo"
                        v-swiper="{
                            current:index,
                            length:filmInfo.photos.length,
                            swipe:'photos',
                            free:{
                                slidesPerView: 2.4,
                                spaceBetween: 10,
                                freeMode: true
                            }
                        }"
                    >
                        <img :src='data' alt="">

                    </div>
                </Swiper>
                <div v-else>暂无剧照</div>
            </div>
        <Photo v-show="isPhotoShow" :list="filmInfo.photos" @event="handleImg">
             <m-title @back="handlePhoto" >
                 剧照 ({{filmInfo.photos && filmInfo.photos.length}})
             </m-title>
        </Photo>
    </div>
</template>

<script>
import { instance } from '@/utils/http'
import Vue from 'vue'
import Swiper from '@/components/Swiper'
import Photo from './Photo.vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)

export default {
  // props:['id'],
  data () {
    return {
      filmInfo: null,
      isActive: true,
      isPhotoShow: false
    }
  },
  methods: {
    handleBack () {
      this.$router.back()// 采用编程式导航
    },
    handlePhoto () {
      this.isPhotoShow = false
    },
    handleImg (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  components: {
    Swiper,
    Photo
  },
  /*
    mounted() {
        window.onscroll = ()=>{
            if(document.documentElement.scrollTop > 40){
                console.log('show')
            }else{
                console.log('hide')
            }
        }
    },
    beforeDestroy() {
        window.onscroll = null
    }, */
  created () {
    // 需要获取nowplaying这边传递来的每一个id参数  /detail/:id
    // console.log(this.$route.params.id)
    // console.log(this.id)

    // console.log(this.$route.query.title)//获取到？后面传递来的动态参数

    instance.get(`/gateway?filmId=${this.$route.params.id}&k=97336`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      //    console.log(res)
      this.filmInfo = res.data.data.film
    })
  }
}
</script>

<style scoped lang='scss'>
.detail{
   margin-bottom: 100px;
}
img{
    width: 100%;
}
// .detailtitle{
//     height: 44px;
//     width: 100%;
//     background: rgb(231, 221, 221);
//     position: fixed;
//     top: 0;
//     left: 0;
//     line-height: 0.44rem;
//     text-align: center;
//     z-index: 10;
//     i{
//         position: absolute;
//         left: 0;
//     }
// }
.filmwrap{
    position: relative;
     padding: 15px;
    p{
        margin: 5px 0;
    }
    .icon{
        text-align: center;
    }
     .synopsis{
        height: 40px;
        overflow: hidden;
        transition: all 1s;
    }
    .actor{
        height: 140px;
        width: 85px;
    }

}
h3{
    margin: 5px 0;
    font-size: 20px;
    font-weight: 900;
   .san{
       font-size: 16px;
        color:#999
    }
    .grade{
        font-weight: normal;
        color: coral;
    }
}
 .photos-title-bar {
    height: 62px;
    width: 100%;
    padding: 15px;
}

</style>
