<template>
 <transition name="move">
  <div class="food" v-show="showFlag" ref="food">
    <div class="food-content">
       <div class="headerImg">
           <img class="image" :src="food.image" />
           <div class="back" @click="hide">
           <i class="icon-arrow_lift"> </i>
            </div>
       </div>
       <div class="content">
            <h2 class="title">{{food.name}}</h2>
            <div class="detail">
                <span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="new">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count || food.count===0" @click="addFirst">加入购物车</div>
            </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
            <h1 class="introduction">商品介绍</h1>
            <div class="text">{{food.info}}</div>
        </div>
        <split></split>
        <div class="rating">
            <h1 class="ratings-title">商品评价</h1>
            <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @select="changeSelectType" @toggleContent="changeOnlyContent"></ratingselect>
            <div class="rating-wrapper">
               <ul v-show="food.ratings && food.ratings.length">
                   <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px" v-for="rating in food.ratings">
                       <div class="user">
                           <span class="username">{{rating.username }}</span>
                           <img class="avatar" width="12" height="12" :src="rating.avatar" />
                       </div>
                        <div class="time">{{rating.rateTime | formatDate}}</div>
                        <p class="text">
                            <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="icon"></span>{{rating.text}}
                        </p>
                   </li>
               </ul>
               <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
            </div>
        </div>
    </div>
  </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import Vue from 'vue'
import bus from '@/main.js'
import formatDate from '@/common/js/formatDate.js'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
    export default {
     props: {
         food: {
             type: Object
         }
     },
     data() {
         return {
            showFlag: false,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
         }
     },
     filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
     },
     methods: {
         show() {
             this.showFlag = true
             this.selectType = ALL
             this.onlyContent = false
             this.$nextTick(() => {
                if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                    })
                } else {
                    this.scroll.refresh()
                }
             })
         },
          hide() {
             this.showFlag = false
         },
         addFirst(event) {
            if (!event._constructed) {
            return
            }
            bus.$emit('addCart', event.target)
            Vue.set(this.food, 'count', 1)
        },
          needShow(type, text) {
            if (this.onlyContent && !text) {
                return false
            } else if (this.selectType === ALL) {
              return true
            } else {
               return type === this.selectType
            }
        },
        changeSelectType(type) {
           this.selectType = type
           this.$nextTick(() => {
             this.scroll.refresh()
           })
         },
         changeOnlyContent(state) {
           this.onlyContent = state
            this.$nextTick(() => {
             this.scroll.refresh()
           })
         }
     },
     components: {
         cartcontrol,
         ratingselect,
         split
     }
    }
</script>
<style lang="stylus">
@import "../../common/stylus/mixins.styl"
.food
 position:fixed
 top:0
 left:0
 z-index:1
 width:100%
 bottom:48px
 background:#fff
 &.move-enter-active
  transition:all 0.5s linear
  transform:translate3d(0,0,0)
 &.move-leave-active
  transition:all 0.5s linear
  transform:translate3d(100%,0,0)
 &.move-enter
  transform:translate3d(100%,0,0)
 &.move-leave
  transform:translate3d(0,0,0)
 .headerImg
   position:relative
   width:100%
   height:0
   padding-top:100%
  .image
   position:absolute
   left:0
   top:0
   width:100%
   height:100%
  .back
   position:absolute
   left:0
   top:10px
   .icon-arrow_lift
    font-size:20px
    padding:10px
    color:#fff
 .content
  padding:18px
  position:relative
  .title
   line-height:14px
   margin-bottom:8px
   font-size:14px
   font-weight:700
   color:rgb(7,17,27)
  .detail
   margin-bottom:18px
   line-height:10px
   font-size:0
   .sellCount,.rating
    font-size:10px
    color:rgb(147,153,159)
   .sellCount
    margin-right:12px
  .price
    font-weight:700
    line-height:24px
   .new
    font-size:14px
    color:rgb(240,20,20)
    margin-right:8px
   .old
    font-size:10px
    color:rgb(147,153,159)
    text-decoration:line-through
  .cartcontrol-wrapper
   position:absolute
   right:12px
   bottom:12px
  .buy
   position:absolute
   right:18px
   bottom:18px
   z-index:10
   height:24px
   line-height:24px
   font-size:10px
   color:rgb(255,255,255)
   background:rgb(0,160,220)
   border-radius:12px
   text-align: center
   box-sizing:border-box
   padding:0 12px
   &.fade-enter-active,&.fade-leave-active
    transition:all 1s
    opacity:1
   &.fade-enter,&.fade-leave
    opacity:0
 .info
  padding:18px
  .introduction
   line-height:14px
   margin-bottom:6px
   font-size:14px
   font-weight:500
   color:rgb(7,17,27)
  .text
   font-size:12px
   color:rgb(77,85,93)
   line-height:24px
   padding:0 8px
 .rating
  padding-top:18px
  .ratings-title
   margin-left:18px
   font-size:14px
   font-weight:500
   color:rgb(7,17,27)
  .rating-wrapper
   padding:0 18px
  .rating-item
    position:relative
    padding:16px 0
    border-1px(rgba(7,17,27,0.3))
    .user
     position:absolute
     right:0
     top:16px
     line-height:12px
     font-size:0
     .username
      color:rgb(145,153,159)
      font-size:10px
      display:inline-block
      vertical-align:top
     .avatar
      display:inline-block
      vertical-align:top
      border-radius:50%
      margin-left:5px
    .time
     font-size:10px
     color:rgb(147,152,159)
     line-height:12px
     margin-bottom:6px
    .text
     font-size:12px
     color:rgb(7,17,27)
     line-height:16px
    .icon
      color:rgb(147,153,159)
      line-height:16px
      margin-right:4px
      &.icon-thumb_up
       color:rgb(147,153,159)
      &.icon-thumb_up
       color:rgb(0,160,220)
  .no-rating
    font-size:12px
    color:rgb(147,152,159)
    padding:16px 0
</style>

