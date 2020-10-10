<template>
    <div class="cinemaDetail">
        <m-title @back="handleBack" style="width:375px"></m-title>
        <div class="content" v-if="filmInfo">
            <h2 v-if="filmaddress">{{filmaddress.name}}</h2>
            <div class="address" v-if="filmaddress">
                <i class="iconfont icon-ditu"></i>
                <span>{{filmaddress.address}}</span>
                <i class="iconfont icon-dianhua"></i>
            </div>
            <div class="banner">
                <img :src="filmInfo.poster" alt="">
            </div>
            <div class="filmInfo">
                <p class="film-head">{{filmInfo.name}} <span>{{filmInfo.grade}}分</span></p>
                <p class="turn" ><i class="iconfont icon-dayuhao" @click="handleDetail"></i></p>
                <p class="film-desc">{{filmInfo.category}} | {{filmInfo.runtime}}分钟 | {{filmInfo.director}} | {{filmInfo.actors | actorFilter}}</p>
            </div>
            <div class="time">
                {{filmInfo.showDate[0] | detailFilter(' ','月','日')}}
            </div>
        </div>

    </div>
</template>

<script>
import { instance } from '@/utils/http'
import Vue from 'vue'
export default {
  name: 'cinemadetail',
  props: ['data'],
  data () {
    return {
      filmInfo: null,
      filmaddress: null
    }
  },
  methods: {
    handleBack () {
      this.$router.back()
    },
    handleDetail () {
      this.$router.push(`/detail/${this.filmInfo.filmId}`)
    }
  },
  created () {
    // 获取Ciname这边传递来的每一个id参数
    // console.log(this.$route.params)
    instance.get(`/gateway/?cinemaId=${this.$route.params.id}&k=8464175`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      // console.log(res.data.data.films[0])
      this.filmInfo = res.data.data.films[0]
    })

    instance.get(`/gateway/?cinemaId=${this.$route.params.id}&k=2181044`, {
      headers: {
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      // console.log(res.data.data.cinema)
      this.filmaddress = res.data.data.cinema
    })
  }

}
</script>

<style lang="scss" scoped>
.cinemaDetail{
    width: 100%;

    .content{
        margin-top: 44px;
        h2{
            text-align: center;
            font-size: 17px;
            color: #191a1b;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            padding: 0 15px;
            height: 44px;
            line-height: 44px;
        }
        .address{
            display: flex;
            height: 50px;
            justify-content: space-around;
            align-items: center;
            span{
                width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .banner{
            display: flex;
            justify-content: center;
        }
        .filmInfo{
            width: 100%;
            height: 80px;
            padding: 15px 0;
            position: relative;
            .turn{
                position: relative;
                i{
                    position: absolute;
                    right: 0;
                }
            }
            .film-head{
                width: 100%;
                margin-bottom: 10px;
                text-align: center;
                line-height: 18px;
                span{
                    color:#ff5f16
                }
            }
            .film-desc {
                text-align: center;
                height: 18px;
                color: #797d82;
                font-size: 13px;
                padding: 0 15px;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .time{
            height: 50px;
            color: #ff5f16;
            display: flex;
            align-items: center;
            padding: 0 15px;
        }
    }
}
</style>
