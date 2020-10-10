<template>
    <div class="center">
        这是center
    </div>
</template>
<script>
export default {
  // 进入center之前
  beforeRouteEnter (to, from, next) {
    // console.log('Center---beforerouterEnter',this)

    if (localStorage.getItem('token')) { // 说明用户已经登录了
      next()
    } else {
      next('/login')// 如果用户没有登陆就直接跳转到登录页面
    }
  },
  beforeRouteLeave (to, from, next) {
    // 离开center之前
    // console.log('Center---beforeRouterLeave',this)
    next()
  }
}
</script>
<style>

</style>
