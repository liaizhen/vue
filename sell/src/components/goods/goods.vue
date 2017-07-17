<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index }" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type > 0" class="icon" :class="mapMessage[item.type]"></span>{{item.name}}
            </span>  
          </li>
        </ul>
      </div>
      <div class="food-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook" >
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px" @click="detail(food,$event)">
                <div class="img">
                  <img :src="food.icon" width="57" height="57" />
                </div>
                <div class="content">
                  <h2 class="sub-title">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--商品数量按钮控制组件-->
                    <cartcontrol :food="food" ></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
        <shopcart :selectedFood="selectedFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
        <food :food="select" ref="foodComponent"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'
// import Vue from 'vue'
const ERR_OK = 0
export default {
  // name: 'goods',
  components: {
    shopcart,
    cartcontrol,
    food
  },
  props: {
    seller: {
      type: Object
    }
  },
 data() {
     return {
       goods: [],
       listHeight: [],
       scrollY: 0,
       select: {}
     }
   },
   computed: {
    //  shopList(show) {
    //    console.log(show)
    //  },
     currentIndex() {
       for (let i = 0; i < this.listHeight.length; i++) {
         let height1 = this.listHeight[i]
         let height2 = this.listHeight[i + 1]
         // 排除最后一个值得时候
         if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          //  console.log(4444)
            return i
         }
       }
         return 0
     },
     selectedFoods() {
       let foods = []
       this.goods.forEach((good) => {
         good.foods.forEach((food) => {
           if (food.count) {
               foods.push(food)
           }
         })
       })
      return foods
     }
   },
 created() {
   this.mapMessage = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
   this.$http.get('/api/goods')
   .then((response) => {
     response = response.body
     if (response.errnu === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
        })
     }
   })
 },
 methods: {
   detail(food, event) {
     if (!event._constructed) {
      return
     }
     this.select = food
     this.$refs.foodComponent.show()
   },
   _initScroll() {
     this.menuScroll = new BScroll(this.$refs.menuWrapper, {
       click: true
     })
     this.foodScroll = new BScroll(this.$refs.foodWrapper, {
       probeType: 3,
       click: true
     })
     this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
     })
   },
   _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
   },
   selectMenu(index, event) {
     if (!event._constructed) {
      return
     }
    let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
    let el = foodList[index]
    this.foodScroll.scrollToElement(el, 100)
   }
 }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"

.goods
  position:absolute
  width:100%
  top:177px
  bottom:64px
  display:flex
  overflow:hidden
  .menu-wrapper
   width:80px
   flex:0 0 80px
   background-color:#f3f5f7
   .menu-item
    display:table
    width:56px
    height:54px
    padding:0 12px
    line-height:14px
    &.current
     position:relative
     margin-top:-1px
     background-color:#fff
     font-weight:700
     color:red
     .text
      border-none()
    .icon
      display:inline-block
      width:12px
      height:12px
      background-size:12px 12px
      margin-bottom:2px
      margin-right:2px
      vertical-align: middle
      &.decrease
        bg-image('decrease_3')
      &.discount
        bg-image('discount_3')
      &.guarantee
        bg-image('guarantee_3')
      &.invoice
        bg-image('invoice_3')
      &.special
        bg-image('special_3')
    .text
     font-size:12px
     display:table-cell
     width:54px
     vertical-align:middle
     border-1px(rgba(7, 17, 27, 0.1))
  .food-wrapper
   flex:1
   .title
    height:26px
    padding-left:14px
    border-left:2px solid #d9dde1
    background-color:#f3f5f7
    font-size:12px
    line-height:26px
    color:rgb(147,153,159)
   .food-item
    display:flex
    margin:18px 18px 0 18px
    padding-bottom:18px
    border-1px(rgba(7, 17, 27, 0.1))
    &:last-child
      border-none()
    .img
     flex:0 0 57px
     margin-right:10px
    .content
     flex:1
     .sub-title
      font-size:12px
      color:rgb(7,17,27)
      height:14px
      line-height:14px
      margin:2px 0 8px 0
     .description,.extra
      font-size:10px
      color:rgb(147,153,159)
      line-height:12px
      margin-bottom:8px
     .extra
      & > span:first-child
       margin-right:12px
     .price
       font-weight:700
       line-height:24px
     .cartcontrol-wrapper
      position:absolute
      bottom:12px
      right:0px
    .new
       font-size:14px
       color:rgb(240,20,20)
       margin-right:8px
    .old
       font-size:10px
       color:rgb(147,153,159)
       text-decoration:line-through
</style>
