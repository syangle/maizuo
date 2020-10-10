<template>
    <div>
        <p>child....{{msg}}</p>
        <p><button @click="toParent">把cmsg传给父元素</button></p>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    msg: {
      type: String
    }
  },
  data () {
    return {
      cmsg: '这是child的数据'
    }
  },
  methods: {
    toParent () {
      // 触发绑定在自身上面的change方法
      this.$emit('change', this.cmsg)
    }
  },
  // beforeMount(){
  //     this.toParent()
  // }
  created () {
    // 进行异步获取本地中的数据资源
    // public目录是一个静态资源文件夹
    // fetch('/films.json').then(res=>res.json()).then(res=>console.log(res))

    // 请求搜狗商城的数据   vue.config.js文件 devServer -> proxy
    // axios.get("/api/product/product/product_list?c=pc&s=10000&t=1585283056228&v=1.0&category_id=57&sort_field=1&sort_order=2&ps=20").then(res=>{
    //     console.log(res)
    // })

    // 用来请求首个文件名相同的不同地址
    // axios.get("/ajax/api/product/product/product_list?c=pc&s=10000&t=1585283056228&v=1.0&category_id=57&sort_field=1&sort_order=2&ps=20").then(res=>{
    //     console.log(res)
    // })

    // 请求mei网站接口数据   Access-Control-Allow-Origin: * 任何都可以请求
    // axios.get("http://www.mei.com/appapi/silo/navigationAll/v3?timestamp=1585277590831&summary=38f67935ccedd58f5694ee8858365067").then(res=>{
    //     console.log(res)
    // })

    // 请求maizuo的接口数据
    // axios.get("https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8497085",{
    //     headers:{ //将数据放在请求头上面携带给卖座接口
    //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15587791402160368550306","bc":"310100"}',
    //         'X-Host': 'mall.film-ticket.film.list'
    //     }
    // }).then(res=>{
    //     console.log("res...",res)
    // })

    // axios完整写法
    // axios({
    //     url:"https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=8497085",
    //     method:"get",
    //     headers:{
    //         'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15587791402160368550306","bc":"310100"}',
    //         'X-Host': 'mall.film-ticket.film.list'
    //     }
    // }).then(res=>{
    //     console.log(res)
    // })

  }
}
</script>
