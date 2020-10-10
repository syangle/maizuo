import Vue from 'vue'
import App from './App.vue'
import router from './router'// 引入router/index.js, index可以省略，node帮我们配置好了
import store from './store'

// 加载自定义指令文件directive.js
import '@/utils/directive'
// 引入全局样式
import '@/stylesheets/main.scss'
import '@/utils/rem.js'
import '@/utils/filter.js'
import '@/utils/components.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router, // 挂载此属性，为了让路由组件可以访问到this.$route 和 this.$router相关的路由api属性方法
  store,
  render: h => h(App)
}).$mount('#app')
