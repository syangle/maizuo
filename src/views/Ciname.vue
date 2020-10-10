<template>
    <div class="ciname">
        <div class="header">
            <div @click="handleChangePage('/city')">{{cityName}}<i class="iconfont icon-jiantou"></i> </div>
            <div>影院</div>
            <div @click="handleChangePage('/ciname/search')"><i class="iconfont icon-sousuo"></i></div>
        </div>

        <!--点击城市切换-->
        <div class="area" v-show="isAreaShow">
            <ul>
                <li
                    v-for="data in areaList"
                    :key="data"
                     @click="handleArea(data)"
                     :class="{active:data===current}"
                >
                    {{data}}
                </li>
            </ul>
        </div>

        <div class="nav" @click="handleAllcity">
            <div @click="isAreaShow=!isAreaShow" :class="isAreaShow?'active':''">{{current}}<i class="iconfont" :class="jiantou" ></i></div>
            <div>APP订票</div>
            <div>最近去过</div>
        </div>

        <div class="content" :style="{height:scrollHeight,overflow:'hidden',marginTop:'88px'}">
            <ul class="oul">
                <!-- <li
                    v-for="data in computedDataList"
                    :key="data.cinemaId"
                >
                    <div class="address">
                        <h3>{{data.name}}</h3>
                        <p>{{data.address}}</p>
                    </div>
                <div>
                    <span>￥{{data.lowPrice/100}} 起</span>
                    <p></p>
                </div>
                </li> -->
                <Cinema
                    v-for="data in computedDataList"
                    :key="data.cinemaId"
                    :data="data"
                    @event="handleData(data.cinemaId)"
                >
                </Cinema>
            </ul>
        </div>
    </div>
</template>
<script>
import { instance } from '@/utils/http'
import Cinema from './Cinema/CinemaItem'
import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
import BetterScroll from 'better-scroll'
import ScrollBar from '@better-scroll/scroll-bar'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'// 辅助函数

Vue.use(Toast)
export default {
  name: 'cinema',
  data () {
    return {
      dataList: [],
      isAreaShow: false,
      current: '全城', // 选中的是哪个区域
      jiantou: 'icon-jiantou',
      scrollHeight: 0
    }
  },
  components: {
    Cinema
  },
  // id=1073117874
  methods: {
    // hand(){
    //   axios.get("/ajax?name="+encodeURIComponent('湖南瑞源生物医药科技有限公司'),{
    //     headers:{Authorization: "2e2b0860-f0a8-407c-a482-362d92c5c679"}
    //   }).then(res=>{
    //     console.log(res)
    //   })
    // },

    handleData (dataId) {
      this.$router.push(`/ciname/${dataId}`)
    },
    handleArea (data) {
      this.current = data
      this.isAreaShow = false

      if (this.isAreaShow) {
        this.jiantou = 'icon-shangjiantou'
      } else {
        this.jiantou = 'icon-jiantou'
      }
    },
    handleChangePage (path) {
      if (path === '/city') {
        // 当用户选择切换城市的时候，将vuex里面的cinemaList状态清空
        this.setCinemaList([])
      }
      this.$router.push(path)
    },
    ...mapMutations('cinema', ['setCinemaList']),
    ...mapActions('cinema', ['getCinemaActions']),
    handleAllcity () {
      if (this.isAreaShow) {
        this.jiantou = 'icon-shangjiantou'
      }
      this.jiantou = 'icon-jiantou'
    }
  },
  computed: {
    ...mapState('city', ['cityName', 'cityId']),
    ...mapState('cinema', ['cinemaList']), // 此函数返回一个对象，所有加...将对象展开,（命名空间，【状态】）
    ...mapGetters('cinema', ['topDatalist']),
    // 所有区域的计算属性
    areaList () {
      // 获取所有城市的所有区域的数组
      // let newarr = this.$store.state.cinemaList.map(item=>item.districtName)
      const newarr = this.cinemaList.map(item => item.districtName)
      // 利用set结构进行数组去重
      const areaList = ['全城', ...Array.from(new Set(newarr))]
      return areaList
    },
    // 根据选择的current区域，过滤出相应区域的数据
    // 例如选择的是金山区区域，那么数组过滤出新的数组，这个新数组里面全部放着的就是金山区的影院了
    computedDataList () {
      if (this.current === '全城') return this.cinemaList
      return this.cinemaList.filter(item => item.districtName === this.current)
    }
  },
  created () {
    // this.hand()


    instance('/gateway?cityId=310100&ticketFlag=1&k=4723508',{
        headers:{
            'X-Host': 'mall.film-ticket.cinema.list'
        }
    }).then(res=>{
        this.dataList = res.data.data.cinemas
    })

    // http://open.api.tianyancha.com/services/open/mr/abnormal/2.0
    // var id=1073117874
    // instance3('?id=1073117874').then(res=>{
    //     console.log(res)
    // })
    

    const toast = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0 // 持续展示 toast
    })

    // 触发vuex里面的actions的getCinemaActions
    if (this.cinemaList.length > 0) {
      // console.log('直接使用缓存的')
      toast.clear()
    } else {
      // this.$store.dispatch('cinema/getCinemaActions')
      this.getCinemaActions(this.cityId).then(res => {
        toast.clear()// 关闭弹窗
      })
    }
  },
  mounted () {
    this.scrollHeight = document.documentElement.clientHeight - 88 - 50 + 'px'
    // 进行实例化操作
    new BetterScroll('.content', {
      scrollbar: { // 滚动条
        fade: true,
      },
      click: true// 可以被点击了
    })
    new BScroll('.content', {
      scrollY: true,
      scrollbar: true
    })
  }
}
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        color: #2c3e50;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 12;
    }
    .active{
        color: rgb(241, 79, 93)!important
    }
    .area{
        background: #fff;
        position: fixed;
        top: 88px;
        width: 100%;
        z-index: 12;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                text-align: center;
                width: 22%;
                margin: 5px;
                padding: 5px;
                border: solid 1px rgb(243, 237, 237);
            }
        }
    }

    .nav{
        z-index: 10;
        background: #fff;
        position:fixed;
        top: 44px;
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

</style>
