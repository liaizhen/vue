<template>
  <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart" >
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import bus from '@/main.js'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
               if (!event._constructed) {
                   return
               }
                if (!this.food.count) {
                    // 给food设置count属性
                 Vue.set(this.food, 'count', 1)
                } else {
                   this.food.count++
                }
                // 派发一个事件，将target传递给父组件
                bus.$emit('addCart', event.target)
                return this.food.count
            },
            decreaseCart(event) {
               if (!event._constructed) {
                   return
                }
               if (this.food.count) {
                   this.food.count--
                }
                return this.food.count
            }

        }
    }
</script>
<style lang="stylus">
.cartcontrol
 font-size:0
 .cart-decrease
  display:inline-block
  font-size:24px
  padding:6px
  color:rgb(0,160,220)
  vertical-align:top
  line-height:24px
  &.move-enter-active
   transition: all .8s ease
  &.move-leave-active
   transition: all .8s ease
  &.move-enter, &.move-leave-active
   transform: translateX(24px) rotate(360deg);
   opacity: 0;
 .cart-count
  display:inline-block
  font-size:10px
  color:rgb(147,153,159)
  line-height:24px
  width:12px
  vertical-align:top
  padding-top:6px
  text-align:center
 .cart-add 
  display:inline-block
  font-size:24px
  color:rgb(0,160,220)
  line-height:24px
  padding:6px
  vertical-align:top
</style>
