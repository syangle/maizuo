import Vue from 'vue'
import Vuex from 'vuex'
import { instance } from '@/utils/http'

Vue.use(Vuex)

export default new Vuex.Store({ // 单一数据，唯一的store

  state: { // 相当于是一个仓库，存储了所有的公共共享状态
    isTabbarShow: true, // 定义tabbar的显示状态
    cinemaList: [] // 默认城市影院
  },

  mutations: { // 唯一更改数据状态的地方，存储了所有更改状态的方法
    show (state) { // 第一个参数就是状态state,拿到state对象
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    },
    setCinemaList (state, data) { // 第一个参数是拿到state对象
      state.cinemaList = data
    }
  },

  actions: { // 实现异步操作请求
    // 发起一个异步请求，获取后端的城市影院数据
    getCinemaActions (store) { // 此参数可以拿到实例
      instance('/gateway?cityId=310100&ticketFlag=1&k=4723508', {
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        // console.log(res.data.data.cinemas)
        // this.dataList = res.data.data.cinemas
        store.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  },

  getters: { // 类似于计算属性，根据vuex的state状态派发一个新的状态出来
    topDatalist (state) {
      return state.cinemaList.splice(0, 5)
    }
  },

  modules: {
  }
})
