import { instance } from '@/utils/http'

const module = {
  namespaced: true,
  state: {
    cinemaList: [] // 默认城市影院
  },
  getters: {
    topDatalist (state) {
      return state.cinemaList.splice(0, 5)
    }
  },
  actions: {
    // 发起一个异步请求，获取后端的城市影院数据
    getCinemaActions (store, cityId) { // 此参数可以拿到实例
      instance(`/gateway?cityId=${cityId}&ticketFlag=1&k=5685245`, {
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        // console.log(res.data.data.cinemas)
        // this.dataList = res.data.data.cinemas
        store.commit('setCinemaList', res.data.data.cinemas)
        // console.log(res)
      })
    }
  },
  mutations: {
    setCinemaList (state, data) { // 第一个参数是拿到state对象
      state.cinemaList = data
    }
  }
}

export default module
