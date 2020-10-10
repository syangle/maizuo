
const module = {
  namespaced: true, // 开启命名空间
  state: {
    cityName: '北京',
    cityId: 110100// 默认的城市
  },
  mutations: {
    setCityName (state, name) {
      state.cityName = name
    },
    setCityId (state, data) {
      state.cityId = data
    }
  }
}

export default module
