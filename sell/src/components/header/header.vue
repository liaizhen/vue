<template>
  <div class="header" >
    <div class="content-wrapper">
      <div class="avatar">
        <img height="64" :src="seller.avatar"/>
      </div>
    <div class="content">
      <div class="title">
          <div class="brand"></div> 
          <div class="name">{{seller.name}}</div> 
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <!--判断suppoort是否存在-->
      <div class="support" v-if="seller.supports" >
        <span class="icon" :class="mapMessage[seller.supports[0].type]"></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
      <div class="support-count" @click="showDetail" v-if="seller.supports">
      <span class="count" >{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    </div>
    
   </div>   
  <div class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title"></span>
    <span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right arrow_right"></i>
  </div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%" />
  </div>
  <transition name="fade">
  <div class="detail" v-show="detail">
     <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">商品信息</div>
          <div class="line"></div>
        </div>
        <ul v-if="seller.supports" class="support">
          <li v-for=" (item, index) in seller.supports" class="support-item" >
            <span class="icon" :class="mapMessage[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商品公告</div>
          <div class="line"></div>
        </div>
         <div class="bulletin">
          <div class="content">{{seller.bulletin}}</div>
        </div>
        
      </div>
     </div>
    <div class="detail-close" @click="hideDetail">
      <i class="icon-close"></i>
    </div>
  </div>
  </transition>
  </div>
</template>

<script>
import star from '@/components/star/star.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
   return {
     detail: false
   }
 },
  created() {
    this.mapMessage = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: { star },
  methods: {
  showDetail() {
    this.detail = true
  },
  hideDetail() {
     this.detail = false
  }
 }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"
.header 
  color:#fff
  background-color:rgba(7,17,27,0.5)
  position:relative
  overflow:hidden
  .content-wrapper
    position:relative
    padding:24px 12px 18px 24px
    display:flex
    flex-direction:row
    .avatar
      margin-right:16px
     img
      border-radius:2px
    .content
      font-size:12px
      .title
        margin:2px 6px 8px 0
        display:flex
        flex-direction:row
       .brand
          width:30px
          height:18px
          bg-image('brand')
          background-size:30px 18px
          background-repeat:no-repeat
          color:rgba(7,17,27,0.5)
          blur:10px
       .name
         margin-left:6px
         font-size:16px
         font-weight:bold
         line-height:18px
      .description
         font-weight:200
         line-height:12px
         margin-bottom:10px
      .support
        .icon
          display:inline-block
          width:12px
          height:12px
          background-size:12px 12px
          margin-bottom:2px
          margin-right:4px
          vertical-align: middle
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size:10px
          font-weight:200
          line-height:12px  
    .support-count
      position:absolute
      bottom:16px;
      right:8px;
      background-color:rgba(0,0,0,0.2)
      font-size:12px
      color:#fff
      font-weight:200
      line-height:13px
      padding:7px 8px
      border-radius:16px
      .count
        margin-right:2px
  .bulletin-wrapper
    position:relative
    height:28px
    line-height:28px
    white-space:nowrap
    overflow:hidden
    text-overflow:ellipsis
    background-color:rgba(7,17,27,0.2)
    padding:0 32px 0 12px
    font-size:10px
   .bulletin-title
      vertical-align:top
      width:22px
      height:12px
      display:inline-block
      bg-image('bulletin')
      background-repeat:no-repeat
      background-size:22px 12px
      margin-top:8px
   .bulletin-text
    // display:inline-block
    vertical-align:top
    font-size:10px
    margin-left:4px
   .arrow_right
    position:absolute
    top:9px
    right:12px
    margin-left:4px
  .background
   position:absolute
   left:0
   top:0
   width:100%
   height:100%
   z-index:-1
   filter:blur(10px)
  .detail
   position:fixed
   left:0
   top:0
   width:100%
   height:100%
   background-color:rgba(7,17,27,0.9)
   overflow: auto
   z-index:4
   backdrop-filter:blur(10px)
   background-color:rgba(7,17,27,0.8)
   &.fade-enter-active,&.fade-leave-active
    transition:all 0.5s
   &.fade-enter,&.fade-leave-active
    opacity:0
    background-color:rgba(7,17,27,0)
   .detail-wrapper
     min-height:100%
     width:100%
     .detail-main
       margin-top:64px
       padding-bottom:64px
      .name
       font-size:16px
       line-height:1
       font-weight:700
       text-align:center
      .star-wrapper
       margin-top:18px
       text-align:center
       padding:0 2px
      .title
       display:flex
       width:80%
       margin:30px auto 24px auto
       .line
        flex:1
        border-bottom:1px solid rgba(255,255,255,0.2)
        top:-6px
        position:relative
       .text
        font-size:14px
        padding:0 12px
        font-weight:700
      .support
       width:80%
       margin:0 auto
       .support-item
        padding:0 12px
        margin-bottom:12px
        &:last-child:
         margin-bottom:0
         font-size:0
        .icon
         display:inline-block
         width:16px
         height:16px
         background-size:16px 16px
         margin-right:6px
         vertical-align:top
         &.decrease
            bg-image('decrease_2')
          &.discount
            bg-image('discount_2')
          &.guarantee
            bg-image('guarantee_2')
          &.invoice
            bg-image('invoice_2')
          &.special
            bg-image('special_2')
        .text
          font-size:12px
      .bulletin
       width:80%
       margin:0 auto
       .content
        padding:0 12px 0 12px
        font-size:12px
        line-height:2
   .detail-close
     position:relative
     width:32px
     height:32px
     margin:-64px  auto 0 auto
     clear:both
     font-size:32px
</style>

