<template>
    <div>
        <van-index-bar :index-list="indexList">
            <div
                v-for="(data,index) in dataList"
                :key="index"
            >
                <van-index-anchor :index="data.index" />
                <van-cell
                    v-for="(item,index) in data.list"
                    :key="index"
                    :title="item.name"
                    @click="handleClick(item)"
                />
            </div>

        </van-index-bar>
    </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell } from 'vant'
import { instance } from '@/utils/http'
import { mapMutations, mapActions } from 'vuex'

Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)

export default {
  data () {
    return {
      dataList: [
        {
          index: 'A',
          list: ['a1', 'a2', 'a3', 'a4', 'a5']
        },
        {
          index: 'B',
          list: ['a1', 'a2', 'a3', 'a4', 'a5']
        }
      ],
      indexList: []
    }
  },
  created () {
    instance('/gateway?k=6837898', {
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)
      this.dataFilter(res.data.data.cities)
    })
  },
  methods: {
    ...mapMutations('city', ['setCityName', 'setCityId']),
    ...mapActions('cinema', ['getCinemaActions']),
    handleClick (item) {
      // 修改vuex的共享状态，城市数据
      this.setCityName(item.name)
      this.setCityId(item.cityId)
      // 为了解决在刷新之后还是这个城市的数据，需要本地存储这个cityId

      this.$router.push('/ciname')
      this.getCinemaActions(item.cityId).then(res => {
        toast.clear()// 关闭弹窗
      })
    },

    dataFilter (cities) {
      const letterArr = []
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))// 循环遍历出26个英文字母
      }

      // 遍历26个字母，跟cities数据.pinyin.首字母.大写 进行过滤
      var cityArr = []
      for (var j = 0; j < letterArr.length; j++) {
        const tempArr = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j])
        if (tempArr.length > 0) { // 当字母下面有数据的时候，再进行添加
          cityArr.push({
            index: letterArr[j],
            list: tempArr
          })
          this.indexList.push(letterArr[j])
        }
      }
      // console.log(cityArr)
      this.dataList = cityArr
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
