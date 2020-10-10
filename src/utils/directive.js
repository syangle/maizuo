import Vue from 'vue'
import Swiper from 'swiper'
Vue.directive('swiper', {
  inserted (el, binding, vnode) {
    // let flag=binding.value.effect?binding.value.effect:'none'
    if (binding.value.current == binding.value.length - 1) {
      new Swiper('.' + binding.value.swipe, {
        ...binding.value.free,
        ...binding.value.films,
        //     loop:true,
        //    autoplay:true,
        //    effect:flag;
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
})

Vue.directive('title', {
  // 插入到dom之后的钩子函数
  inserted (el, binding) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) >= binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 指令的解绑的钩子函数
  unbind () {
    window.onscroll = null
  }
})
