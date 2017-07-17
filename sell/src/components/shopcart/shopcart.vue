<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{'highLight':totalCount>0}">
                    <i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>  
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}元</div>
            <div class="delivery">配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop="payFor">
            <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
    </div>
    <div class="ball-container">
        <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index" >
              <div class="inner inner-hook"></div>
          </div>
        </transition-group>
    </div>
    <transition name="fold">
    <div class="shopList" v-show="shopList">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="clear" @click="clear">清空</span>
        </div>
        <div class="list-content" ref="listContent">
            <ul>
                <li class="food" v-for="food in selectedFood">
                    <span class="name">{{food.name}}</span>
                    <div class="price">￥{{food.price*food.count}}</div>
                    <div class="cartcontrol-wrapper"> 
                         <cartcontrol :food="food"></cartcontrol>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </transition>
    <transition name="fade">
  <div class="masklist" v-show="shopList" @click="hideShopList"></div>
</transition>
</div>
</template>

<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
import bus from '@/main.js'
export default {
    props: {
    selectedFood: {
        type: Array,
        default() {
         return []
        }
    },
    deliveryPrice: {
        type: Number,
        default: 0
    },
    minPrice: {
        type: Number,
        default: 0
    }
    },
    created() {
        this.$nextTick(() => {
        bus.$on('addCart', (target) => {
            this.drop(target)
        })
        })
    },
    components: {
     cartcontrol
    },
    data() {
      return {
          balls: [
                  {
                    show: false
                  },
                   {
                    show: false
                  },
                   {
                    show: false
                  },
                   {
                    show: false
                  },
                   {
                    show: false
                  }
          ],
          dropBalls: [],
          fold: true
      }
    },
    computed: {
       totalPrice() {
           let total = 0
           this.selectedFood.forEach((food) => {
               total += food.price * food.count
           })
           return total
       },
       totalCount() {
         let count = 0
         this.selectedFood.forEach((food) => {
            count += food.count
          })
        return count
       },
       payDesc() {
           if (this.totalPrice === 0) {
               return `￥${this.minPrice}元起送`
           } else if (this.totalPrice < this.minPrice) {
               let diff = this.minPrice - this.totalPrice
               return `还差￥${diff}元起送`
           } else {
               return `去结算`
           }
       },
       payClass() {
        if (this.totalPrice < this.minPrice) {
            return 'unfull'
        } else {
            return 'full'
        }
       },
       shopList() {
         if (!this.totalCount) {
            this.fold = true
            return false
         }
         let show = !this.fold
        //  初始化BScroll,使shopList的按钮点击生效
         if (show) {
             this.$nextTick(() => {
                 if (!this.scroll) {
                 this.scroll = new BScroll(this.$refs.listContent, {
                    click: true
                })
             } else {
                this.scroll.refresh()
             }
             })
        }
         return show
       }
    },
    methods: {
        payFor() {
          if (this.totalPrice < this.minPrice) {
             return false
          }
          window.alert(`总共需要支付￥${this.totalPrice}元`)
        },
        hideShopList() {
            this.fold = true
        },
        clear() {
           this.selectedFood.forEach((food) => {
             food.count = 0
           })
        },
        toggleList() {
           if (!this.totalCount) {
              return
           }
           this.fold = !this.fold
        },
        drop(el) {
           for (let i = 0; i < this.balls.length; i++) {
               let ball = this.balls[i]
                if (!ball.show) {
                   ball.show = true
                   ball.el = el
                   this.dropBalls.push(ball)
                   return
                }
           }
        },
        beforeEnter(el) {
         let count = this.balls.length
         while (count--) {
             let ball = this.balls[count]
             if (ball.show) {
              let rect = ball.el.getBoundingClientRect()
              let x = rect.left - 38
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.webkitTransform = `translate3d(0,${y}px,0)`
              el.style.transform = `translate3d(0,${y}px,0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`
              inner.style.transform = `translate3d(${x}px,0,0)`
             }
         }
        },
        enter(el) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight
            this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0,0,0)'
              el.style.transform = 'translate3d(0,0,0)'
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = 'translate3d(0,0,0)'
              inner.style.transform = 'translate3d(0,0,0)'
            })
        },
        afterEnter(el) {
          let ball = this.dropBalls.shift()
          if (ball) {
              ball.show = false
              el.style.display = 'none'
          }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import "../../common/stylus/mixins.styl"
 .shopcart
  position:fixed
  left:0
  bottom:0
  z-index:3
  width:100%
  height:48px
  .content
   display:flex
   background:#141d27
   color:rgba(255,255,255,0.4)  
   .content-left
     flex:1
     font-size:0
     .logo-wrapper
      display:inline-block
      position:relative
      top:-10px
      margin:0 18px
      padding:6px
      width:56px
      height:56px
      box-sizing:border-box
      vertical-align:top
      border-radius:50%
      background:#141d27
      .logo
       width:100%
       height:100%
       border-radius:50%
       background:#2b343c
       text-align:center
       &.highLight
        background-color:rgb(0,160,220)
       .icon-shopping_cart
        font-size:24px
        line-height:44px
        color:#80858a
        &.highLight
         color:#fff
      .num
       position:absolute
       width:24px
       height:16px
       border-radius:16px
       font-size:9px
       font-weight:700
       color:#fff
       line-height:16px
       background-color:rgb(240,20,20)
       box-shadow:0px 2px 4px 0px rgba(0,0,0,0.4)
       top:0
       right:0
       text-align: center
     .price,.delivery
      display:inline-block
      vertical-align:top
      line-height:24px
      font-weight:700
      margin-top:12px
      box-sizing:border-box
     .price
      border-right:1px solid rgba(255,255,255,0.1)
      padding-right:12px
      font-size:12px
      &.highLight
       color:#fff
     .delivery
      padding-left:12px
      font-size:12px
   .content-right
     flex:0 0 105px
     width:105px
    .pay
     height:100%
     box-sizing:border-box
     padding:0 8px
     font-size:12px
     font-weight:700
     line-height:48px
     background-color:#2b333c
     text-align:center
     font-weight:700
     &.unfull
       background-color:#2b333c
     &.full
      background-color:#00b43c
      color:#fff
  .ball-container
   .ball
    position:fixed
    left:32px
    bottom:22px
    z-index:200
    &.drop-enter-active
     transition: all 0.5s cubic-bezier(0.49,-0.29,0.6,0.41)
    .inner
     width:16px
     height:16px
     background:rgb(0,160,220)
     border-radius:50%
     transition: all 0.5s linear
  .shopList
   position:absolute
   left:0px
   top:0px
   z-index:-1
   width:100%
   transform:translate3d(0,-100%,0)
   &.fold-enter-active,&.fold-leave-active
    transition:all 0.5s
    transform:translate3d(0,-100%,0)
   &.fold-enter,&.fold-leave-active 
    transform:translate3d(0,0,0)
   .list-header
    height:40px
    background-color:#f3f5f7
    display:flex
    padding:0 18px
    border-1px(rgba(7,17,27,0.1))
    .title
     font-size:14px
     color:rgb(7,17,27)
     flex:1
     height:100%
     line-height:40px
    .clear
     font-size:12px
     color:rgb(0,160,220)
     flex:1
     height:100%
     line-height:40px
     text-align:right
   .list-content
     padding:0 18px
     background:#fff
     max-height:217px
     overflow:hidden
    .food
     position:relative
     padding: 12px 0
     border-1px(rgba(7,17,27,0.1))
     .name
      font-size:14px
      color:rgb(7,17,27)
      line-height:24px
     .price
      position:absolute
      right:90px;
      bottom:12px
      font-size:14px
      color:rgb(240,20,20)
      line-height:24px
      font-weight:700
     .cartcontrol-wrapper
      position:absolute
      right:0px;
      bottom:6px
 .masklist
   position:fixed
   left:0
   top:0
   width:100%
   height:100%
   z-index:-2
   background-color:rgba(7,17,27,0.6)
   backdrop-filter:blur(10px)
   &.fade-enter-active,&.fade-leave-active
    transition:all 0.5s
    opacity:1
   &.fade-enter,&.fade-leave-active 
    opacity:0
</style>
