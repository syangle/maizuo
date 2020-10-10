
const module = {
  namespaced: true, // 开启命名空间
  state: {
    isTabbarShow: true// 定义tabbar的显示状态
  },
  mutations: {
    show (state) { // 第一个参数就是状态state,拿到state对象
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  }
}

export default module
