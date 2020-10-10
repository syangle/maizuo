import Vue from 'vue'
import VueRouter from 'vue-router'// 引入安装好的vue-router
import Home from '../views/Home.vue'
import films from '@/views/films'
// import Ciname from '@/views/Ciname'
import Center from '@/views/Center'
import Nowplaying from '@/views/Nowplaying'
import hoting from '@/views/hoting'
import Error from '@/views/Error'
import detail from '@/views/Detail'
import login from '@/views/Login'
import Search from '@/views/Search'
import register from '@/views/register'

// 如果将其注释掉，或者没写，this上面就不存在$route 和 $router 的api了
Vue.use(VueRouter)// 让vue使用VueRouter,使用第三方插件，必须放在new Vue()实例启动之前完成  内部原理使用install方法实现

const routes = [
  {
    path: '/films',
    component: films,
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: 'hoting', // 二级路由如果简写的话不能带/
        component: hoting
      },
      {
        path: '',
        redirect: '/films/nowplaying'// 进行以及路由内部的重定向操作
      },
      {
        path: '*',
        component: Error // 之前路径都没有匹配上的话，就会跳到error里面
      }
    ],
    meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    path: '/ciname',
    name: 'cinema',
    // component:Ciname
    component: () => import('@/views/Ciname'), // 返回一个promise对象，es6的语法，异步组件，路由的懒加载
    // component: resolve => require(['@/views/Ciname'],resolve)//es5的写法

    // component: () => import(/* webpackChunkName:'ciname' */"@/views/Ciname")//webpack的代码分割,通过注释的方式设置打包的文件名
    meta: {
      keepAlive: true,
      title: '影院',
      deepth: 1,
    }
  },
  {
    path: '/ciname/search',
    name: 'search',
    component: Search,  meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    path: '/center',
    component: Center
    // 局部单个路由守卫
    // beforeEnter: (to, from, next) => {
    //   console.log('要进入center了哦。。。。')
    //   next()
    // }
    ,  meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    path: '/ciname/:id',
    name: 'cinemadetail',
    component: () => import('@/views/cinemaDetail'),
    meta: {
      keepAlive: true,
      deepth: 2,
    }
  },
  {
    path: '/register',
    component: register,
    meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    path: '/login',
    // component: ()=>import("@/views/Login")
    component: login,  meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    path: '/',
    redirect: '/films' ,// 重定向
    meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    name: 'detail', // 具名路由的名字不能重复
    path: '/detail/:id',
    component: detail,
    props: true,  meta: {
      keepAlive: false,
      deepth:4
    }
  },
  {
    path: '/city',
    component: () => import('@/views/City'),
    meta: {
      keepAlive: false,
      deepth:4
    }
  }
]

// 创建实例暴露出去
const router = new VueRouter({
  routes// key和名字相等了，就省略简写了
})

// 全局路由守卫
// router.beforeEach((to,from,next)=>{
//   if(from.path === '/ciname'){
//     console.log('要离开影院了哦...')
//   }
//   next()
// })

// 判断每次路由切换的时候，是否有token令牌
/* router.beforeEach((to,from,next)=>{
  if(to.path==='/center'){
    if(localStorage.getItem("token")){//说明用户已经登录了
      next()
    }else{
      next('/login')//如果用户没有登陆就直接跳转到登录页面
    }
  }else{
    next()
  }
}) */

// 暴露出去在主入口文件main.js里面引入使用
export default router
