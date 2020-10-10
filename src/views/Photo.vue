<template>
    <div class="photo">
        <p v-show="!isBig">
            <slot ></slot>
            <!-- <ul v-show="!isBig">
                <li v-for="(data) in list" :key="data">
                    <img :src="data" alt=""  @click="handleBig(data)">

                </li>
            </ul>  -->
            <ul>
                <li
                    v-for="(data,index) in list"
                    :key="data"
                    @click="handleImg(index,list)"
                >
                    <img :src="data" alt="">
                </li>
            </ul>
        </p>

        <!-- <photoBig v-show="isBig" @back="handleBig2()" :bigPhoto="photoBig"></photoBig> -->

    </div>
</template>

<script>
// import photoBig from "./PhotoBig"
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  props: ['list'],
  components: {
    //    photoBig
  },
  data () {
    return {
      isBig: false,
      photoBig: ''
    }
  },
  methods: {
    // handleBig(data){

    //     this.isBig = true,
    //     this.photoBig = data

    // },
    // handleBig2(){
    //     this.isBig = false
    //     // this.$router.back()
    // },
    handleImg (index, list) {
      // ImagePreview({
      //     images: list,
      //     startPosition:index,
      //     closeable: true,
      //     closeIconPosition:'top-left'
      // });

      // 第二种方法，直接子组件绑定触发绑定在自身上的自定义事件
      this.$emit('event', index)
    }
  }
}
</script>

<style lang="scss" scoped>
    .photo{
        margin-bottom: 80px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 11;
        overflow-y: auto ;
        ul{
            position: relative;
            top: 44px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li{
                width: 33.3333%;
                padding: 3px;
                img{
                    width: 100%;
                    height: 100px;
                }
            }
        }
    }
</style>
