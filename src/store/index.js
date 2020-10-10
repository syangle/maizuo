import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './module/cinemamodule'
import tabbar from './module/tabbarmodule'
import city from './module/citymodule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({ // 单一数据，唯一的store
  // plugins: [createPersistedState()],//实现了对vuex的持久化存储
  plugins: [createPersistedState({
    reducer (data) {
      return {
        city: data.city // 这样的话持久化字段就只有city字段了
      }
    }
  })], // 实现了对vuex的持久化存储
  state: {// 相当于是一个仓库，存储了所有的公共共享状态
  },

  mutations: {// 唯一更改数据状态的地方，存储了所有更改状态的方法
  },

  actions: {// 实现异步操作请求

  },

  getters: {// 类似于计算属性，根据vuex的state状态派发一个新的状态出来

  },

  modules: {
    tabbar: tabbar,
    cinema: cinema, // 影院的模块
    city // 城市的模块
  }
})
