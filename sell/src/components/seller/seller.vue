<template>
  <div class="seller" ref="seller">
    <div class="seller-wrapper">
       <div class="overview">
           <div class="seller-header">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="36" :score="seller.score" class="seller-star"></star>
              <span class="text">({{seller.ratingCount}})</span>
              <span class="sellCount">月售{{seller.sellCount}}单</span>
            </div>
            <div class="like">
            <i class="icon-favorite" @click="toggleFavorite($event)" :class="{'active':this.favorite}"></i>
            <div class="txt">{{favoriteText}}</div>
            </div>
            </div>
            <div class="price">
              <div class="min">
                <div class="price-text">起送价</div>
                <div><span  class="minPrice">{{seller.minPrice}}</span>起</div>
              </div>
              <div class="delivery">
                <div class="price-text">商家配送</div>
                <div><span class="deliveryPrice">{{seller.deliveryPrice}}</span>元</div>
              </div>
                <div class="seller-time">
                <div class="price-text">平均配送时间</div>
                <div><span class="seller-atime">{{seller.deliveryTime}}</span>分钟</div>
              </div>
            </div>
          <split></split>
          <div class="center">
            <div class="bulletin border-1px">
              <h1 class="sub-title">活动与公告</h1>
              <div class="bulletin-content">{{seller.bulletin}}</div>
            </div>
            <ul v-if="seller.supports" class="support">
              <li v-for=" (item, index) in seller.supports" class="support-item border-1px" >
                <span class="icon" :class="mapMessage[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
          </ul>
         </div>
         <split></split>
         <div class="pics">
           <h1 class="pics-title">商家实景</h1>
           <div class="pics-warpper" ref="picWarpper">
           <ul class="picslist" ref="picsList">
             <li v-for="pic in seller.pics" class="pic-item">
               <img :src="pic" width="120" height="90" />
             </li>
           </ul>
           </div>
         </div>
         <split></split>
         <div class="info">
           <h1 class="info-title">商家信息</h1>
            <ul class="infos">
            <li v-for=" info in seller.infos" class="info-item border-1px" >{{info}}</li>
        </ul>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import split from '@/components/split/split'
import BScroll from 'better-scroll'
export default {
  // name: 'seller',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  },
  data() {
   return {
     favorite: false
   }
  },
  created() {
    this.mapMessage = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
     this.$nextTick(() => {
          this._initScroll()
          this._initPics()
           })
      },
    mounted() {
       this.$watch('seller', () => {
          this._initScroll()
           this._initPics()
    })
    },
    computed: {
     favoriteText() {
      return this.favorite ? '已收藏' : '未收藏'
     }
    },
    methods: {
     toggleFavorite(event) {
       if (!event._constructed) {
         return
       }
        this.favorite = !this.favorite
        return this.favorite
     },
      _initScroll() {
      if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
                    click: true
          })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let width = 120
        let margin = 6
        let ulWidth = (width + margin) * this.seller.pics.length
        this.$refs.picsList.style.width = ulWidth + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWarpper, {
                        scrollX: true
                      })
              } else {
                this.picScroll.refresh()
              }
         })
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"
.seller
  position: absolute;
  top: 177px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
 .overview
  .seller-header
    border-1px(rgba(7,17,27,0.1))
    padding:18px 0
    margin:0 18px
    position:relative
   .name
    font-size:14px
    color:rgb(7,17,27)
    line-height:14px
    margin-bottom:6px
   .seller-star
    display:inline-block
    vertical-align:top
    margin-left:-8px
    margin-right:5px
   .text,.sellCount
    display:inline-block
    vertical-align:top
    margin-right:9px
    font-size:10px
    color:rgb(77,85,93)
    line-height:18px
   .like
    position:absolute
    top:18px
    right:0
    .icon-favorite
     font-size:24px
     line-height:24px
     color:#d4d6d9
     padding:6px
     margin-bottom:2px
     &.active
      color:rgb(240,20,20)
    .txt
     font-size:10px
     color:rgb(77,85,93)
     line-height:10px
   .price
    margin:0 18px
    padding:18px 0
    display:flex
    justify-content:center
    line-height:24px
    font-size:10px
    .min,.delivery,.seller-time
     flex:1
     text-align:center
     font-size:10px
     line-height:24px
     color:rgb(7,17,27)
     border-right:1px solid rgba(7,17,27,.1)
    .seller-time 
      border-right:none
     .minPrice,.deliveryPrice,.seller-atime
      font-size:24px
      color:rgb(7,17,27)
     .price-text
      font-size:10px
      color:rgb(147,153,159)
  .center
    padding:18px 18px 0 18px 
   .bulletin
    border-1px(rgba(7,17,27,.1))
    padding-bottom:16px
    .sub-title
     font-size:14px
     color:rgb(7,17,27)
     line-height:14px
    .bulletin-content
      margin:8px 12px 0px 12px
      color:rgb(240,20,20)
      font-size:13px
      line-height:24px
   .support-item
    padding:16px 12px
    border-1px(rgba(7,17,27,.1))
    font-size:0
    &:last-child
     border-none()
    .icon
      display:inline-block
      width:16px
      height:16px
      background-size:16px 16px
      margin-right:6px
      vertical-align:top
      &.decrease
        bg-image('decrease_4')
      &.discount
        bg-image('discount_4')
      &.guarantee
        bg-image('guarantee_4')
      &.invoice
        bg-image('invoice_4')
      &.special
        bg-image('special_4')
    .text
      vertical-align:top
      display:inline-block
      font-size:12px
      font-weight:200
      line-height:16px
      color:rgb(7,17,27)  
  .pics
    padding:18px
   .pics-title
     font-size:14px
     color:rgb(7,17,27)
     line-height:14px
     margin-bottom:12px
   .pics-warpper
      width:100%
      overflow:hidden
      white-space:nowrap
    .pics-list
      font-size:0
     .pic-item
      display:inline-block
      margin-right:6px
      width:120px
      height:90px
      &:last-child
       margin-right:0
  .info
   padding:18px
   .info-title
     font-size:14px
     color:rgb(7,17,27)
     line-height:14px
     padding-bottom:12px
     border-bottom:1px solid rgba(7,17,27,.1)
    .info-item
     padding:16px 12px
     font-size:12px
     color:rgb(7,17,27)
     line-height:16px
     border-1px(rgba(7,17,27,.1))

</style>
