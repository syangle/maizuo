<template>
    <div>
        <!-- 输入用户名 -->
        <van-field v-model="username" label="用户名" />
        <van-field v-model="password" type="password" label="密码" />
        <van-cell value="注册" @click="handleLogin"/>
    </div>
</template>

<script>
import Vue from 'vue'
import { Field, Dialog } from 'vant'
import { instance2 } from '@/utils/http'

Vue.use(Field)
Vue.use(Dialog)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      instance2.post('/api/reg', {
        username: this.username,
        password: this.password
      }).then(res => {
        Dialog({ message: '注册成功' })
        this.$router.push('/login')
      }).catch(err => Dialog({ message: err }))
    }
  }
}
</script>

<style lang="scss" scoped>
    .van-cell__value--alone {
        color: #323233;
        text-align: center;
        background: #f34c19;
        height: 40px;
        line-height: 40px;
        color: white;
    }
</style>
