<template>
    <div class="login">
        <form @submit.prevent="login">
            <!-- <div>
                <input type="text" v-model="username">
            </div>
            <div>
                <input type="text" v-model="password">
            </div>
            <button type="submit">登录</button>  -->

            <!-- 输入任意文本 -->
            <van-field v-model="username" label="用户名:" />
            <!-- 输入密码 -->
            <van-field v-model="password" type="password" label="密 码:" />
            <van-button type="primary" native-type="submit" class="btn">登录</van-button>
            <van-cell value="注册" @click="handleRegister"/>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { instance2 } from '@/utils/http'
import Vue from 'vue'
import { Button, Field, Cell, Dialog } from 'vant'

Vue.use(Button)
Vue.use(Field)
Vue.use(Cell)

export default {
  data () {
    return {
      username: '',
      password: ''

    }
  },
  methods: {
    login () {
      // setTimeout(()=>{
      //     //前端登录成功后会获取后端传递来的token
      //     localStorage.setItem('token',"jklsssjfsghdkd;dkjldjhah")
      //     //跳转到个人中心
      //     this.$router.replace('/center')
      // },2000)

      // axios.post('/info/api/login',{
      //     username:'李霞',
      //     password:'123456'
      // }).then(res=>{
      //     console.log(res)
      // })

      // if(!this.username.trim() || !this.password.trim()){
      //     alert('用户名或密码不能为空')
      // }

      instance2.post('/api/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res)
        // 用户登录成功之后，将token保存到本地存储里面去
        localStorage.setItem('token', res.token)
        // 跳转到个人中心
        this.$router.replace('/center')
      }).catch(err =>
        Dialog({ message: err })
      )
    },
    handleRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
    .login{
        margin-top: 1.46rem;
        form{
            width: 70%;
            margin: 0 auto;
            .btn{
                width: 100%;
                margin-top: 10px;
            }
        }
        .van-cell__value--alone {
            color: #323233;
            text-align: center;
        }
    }
</style>
