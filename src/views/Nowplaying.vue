<template>
    <div class="Nowplaying">
        这是nowplaying....,正在热映
      <!--   <ul>
            <li
                v-for="data in dataList"
                :key="data"
                @click="toDetail(data)"
            >
            {{data}}
            </li>
        </ul> -->

        <!-- 声明式导航 -->
       <!--  <ul>
            <router-link
                v-for="data in dataList"
                :key="data"
                :to="'/detail/'+data+'?title=文章一'"
                tag='li'
            >{{data}}</router-link>
        </ul> -->

         <ul>
            <router-link
                v-for="data in dataList"
                :key="data.filmId"
                :to="{
                    name:'detail',//具名路由，传递对象
                    params:{id:data.filmId},
                    query:{title:'文章二'}
                }"
                tag='li'
            >
                <img :src="data.poster" alt="">
                <div>
                    <p>{{data.name}}</p>
                    <p>观众评分 <span class="grade">{{data.grade}}</span></p>
                    <p>主演：{{data.actors | actorFilter}}</p>
                    <p>{{data.nation}} | {{data.runtime+'分钟'}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
import { instance } from '@/utils/http'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    // toDetail(id){
    // console.log(this)
    // 组件的$router上面提供了很多的跳转方法，把这些跳转的方式称之为编程式导航
    // this.$router.push('/center')
    // this.$router.push(`/detail/${id}`)
    // }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  created () {
    instance.get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=398114`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res)
      this.dataList = res.data.data.films
    })
  }
}
</script>
<style scoped lang='scss'>
    .Nowplaying{
        margin-bottom: 120px;
    }
   li{
       width: 100%;
       height: 1.2rem;
       padding: 5px;
       display: flex;
        img{
            width: 80px;
            height: 100%;
            margin-right: 8px;
        }
        div{
            p{
                color: #000;
                .grade{
                    color: coral;
                }

                    width: 270px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

            }
        }
   }
</style>
