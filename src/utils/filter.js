import Vue from 'vue'
import moment from 'moment'

// 定义演员的过滤器
Vue.filter('actorFilter', data => {
  if (data) {
    return data.map(item => item.name).join(' ')
  } else {
    return '暂无主演'
  }
})

// 定义日期的过滤器
Vue.filter('detailFilter', (data, option = '/', option2 = '/', option3 = '') => {
  // console.log(data*1000)//毫秒数
  // console.log(new Date(data*1000).getFullYear() + "/" + (new Date(data*1000).getMonth()+1))
  return moment(data * 1000).format('YYYY' + option + 'MM' + option2 + 'DD' + option3)
})
