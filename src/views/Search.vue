<template>
    <div class="search">
        <div class="quxiao" style="background:#fff;z-index:20">
            <span class="ipt">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" placeholder="输入影院名称" v-model="mytext">
            </span>
            <span @click="handleBack">取消</span>
        </div>

        <div v-show="mytext"  class="list">
            <ul
                v-if="searchDataList.length"

            >
                <!-- <li
                    v-for="data in searchDataList"
                    :key="data.cinemaId"
                >
                    {{data.name}}
                </li> -->
                <Cinema
                    v-for="data in searchDataList"
                    :key="data.cinemaId"
                    :data="data"
                >
                </Cinema>
            </ul>
            <div v-else class="errtip">
                <img src="" alt="">
                <p class="empty-list-tip">提示：仅支持搜索“影院”，建议您检查输入的影院名称是否有误？ </p>
            </div>
        </div>

        <!-- 距离最近 -->
        <div class="distance" v-show="!mytext">
            <p>离你最近</p>
            <ul>
                <li
                    v-for="data in topDatalist"
                    :key="data.cinemaId"
                >
                    {{data.name}}
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import Cinema from './Cinema/CinemaItem'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      mytext: ''
    }
  },
  components: {
    Cinema
  },
  methods: {
    handleBack () {
      this.$router.back()
    },
    ...mapActions('cinema', ['getCinemaActions']),
    ...mapMutations('tabbar', ['hide', 'show'])
  },
  computed: {
    ...mapState('cinema', ['cinemaList']),
    ...mapGetters('cinema', ['topDatalist']),
    // jinList(){
    //     return this.$store.state.cinemaList.splice(0,5)
    // },

    searchDataList () {
      return this.cinemaList.filter(item =>
        item.name.includes(this.mytext) ||
                item.name.toUpperCase().includes(this.mytext.toUpperCase()) ||
                item.name.toLowerCase().includes(this.mytext.toLowerCase())
      )
    }
  },
  mounted () {
    // this.$store.state.isTabbarShow = false//直接更改数据的状态，不利于组件状态维护，需要能够对数据进行追踪，唯一更改数据状态的地方就是mutations
    // this.$store.commit('tabbar/hide')
    this.hide()
    // console.log('search-cinema',this.$store.state.cinemaList)
    if (this.cinemaList.length > 0) {
      // console.log('直接使用')
    } else {
      // this.$store.dispatch('cinema/getCinemaActions')
      this.getCinemaActions()
    }
  },
  beforeDestroy () {
    // this.$store.state.isTabbarShow = true
    // this.$store.commit('tabbar/show')
    this.show()
  }
}
</script>

<style lang="scss" scoped>
.search{
        .quxiao{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 40px;
            padding: 8px;
            position: fixed;
            background: #fff;

            .ipt{
                padding-left: 5px;
                border: solid 1px rgb(216, 213, 213);
                width: 280px;
                border-radius: 4px;
                background: #f4f0f0e3;
            }
            input{
                border: none;
                padding-left: 6px;
                background: #f4f0f0e3;
            }
        }
        p{
            margin: 15px;
            color:rgb(182, 179, 179)
        }
        .distance{
                    position: absolute;
                    top: 40px;
                    padding-left: 10px;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        margin-bottom: 10px;
                        margin-right: 10px;
                        height: 30px;
                        text-align: center;
                        padding-bottom: 10px;
                        padding-right: 10px;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        font-size: 13px;
                        line-height: 14px;
                        padding: 8px 12px;
                        background-color: hsla(0,0%,96%,.6);
                    }
                }
        }
        .errtip{
            position: absolute;
            top: 50px;
            width: 100%;
            height: 160px;
            p{
                margin: 30px auto;
                width:60%;
                height: 100%;
                text-align: center;
            }
        }
        .list{
            position: relative;
            top: 40px;
            width: 100%;
        }
    }
</style>
