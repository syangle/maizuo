<template>
    <li @click="toDetail">
        <div class="address">
            <h3>{{data.name}}</h3>
            <p>{{data.address}}</p>
        </div>
        <div>
            <span>￥{{data.lowPrice/100}} 起</span>
            <p></p>
        </div>
    </li>
</template>

<script>
export default {
  props: ['data'],
  data() {
      return {
          hello:this.data
      }
  },
  methods: {
    toDetail () {
      this.$emit('event')
    }
  }
}
</script>

<style lang="scss" scoped>
    li{
            width: 100%;
            height: 100%;
            padding: 15px;
            border: solid 1px rgba(247, 240, 240, 0.993);
            display: flex;
            justify-content: space-between;
            .address{
                p{
                    width: 260px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 12px;
                    color: rgb(122, 120, 120);
                }
                h3{
                    font-size: 16px;
                    color: rgb(29, 27, 27);
                    margin-bottom: 4px;
                }

            }
              span{
                  color: rgb(231, 88, 69);
              }
        }
</style>
