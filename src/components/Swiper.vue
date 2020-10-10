<template>
    <div class="swiper-container" :class="cName">
        <div class="swiper-wrapper" >
            <slot></slot>
        </div>
    </div>
</template>

<script>
// 引入swiper的css样式
import 'swiper/css/swiper.min.css'
export default {
  props: ['cName']
}
</script>
