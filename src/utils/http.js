import axios from 'axios'
// 这个instance是针对于卖座的接口
const instance = axios.create({
  baseURL: 'https://m.maizuo.com', // 基本的url地址
  // timeout:2000,//延时默认1秒
  headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15855640831099511627879","bc":"310100"}' }// 请求头
})

// 针对于上线的 http://47.105.51.234:3000
const instance2 = axios.create({
  baseURL: '/info'
})

// const instance3 = axios.create({
//   baseURL: '/ajax',
//   headers: {
//     "Authorization": "2e2b0860-f0a8-407c-a482-362d92c5c679"
//   }
// })

// 请求之前的拦截操作
instance2.interceptors.request.use(
  config => {
    // console.log("config",config)
    if (localStorage.getItem('token')) { // 如果token存在,则在请求头上面携带令牌给后端传输
      config.headers.token = localStorage.getItem('token')
    }
    return config
  }
)

// 响应之后的拦截
instance2.interceptors.response.use(res => {
  // console.log("res",res)
  if (res.data.err === 0) { // 说明后端给我们前端返回结果是正常的
    return res.data
  } else {
    return Promise.reject(res.data.msg)// 在es6里面就自带的promise
  }
  return res
})

// export default instance
export { instance, instance2 }
