<template>
  <div class="ratings" ref="ratings">
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="txt">服务态度</span>
          <star :size="36" :score="seller.score" class="rating-star"></star>
          <span class="score">{{seller.score}}</span>
        </div>
        <div class="score-wrapper">
          <span class="txt">商品评分</span>
          <star :size="36" :score="seller.score" class="rating-star"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery">
          <span class="txt">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
     <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings" @select="changeSelectType" @toggleContent="changeOnlyContent"></ratingselect>
     <div class="rating-wrapper">
       <ul v-show="ratings && ratings.length">
         <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
           <div class="avatar">
            <img class="image" height="28" width="28" :src="rating.avatar" />
          </div>
          <div class="content">
             <div class="username">{{rating.username}}</div>
             <div class="delivery">
                <star :size="36" :score="rating.score" class="rating-star"></star>
                <span class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
             </div>
             <div class="date">{{rating.rateTime | formatDate}}</div>
             <div class="text">{{rating.text}}</div>
             <div class="recommend" v-show="rating.recommend.length">
               <span class="icon-thumb_up"></span>
               <span class="item" v-for="item in rating.recommend">{{item}}</span>
            </div>
          </div>
         </li>
       </ul>
       <div v-show="!ratings || !ratings.length" class="no-rating">暂无评价</div>
     </div>
  </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
import formatDate from '@/common/js/formatDate.js'
import BScroll from 'better-scroll'
const ERR_OK = 0
const ALL = 2
export default {
  // name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      goods: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
            all: '全部',
            positive: '满意',
            negative: '不满意'
        }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created() {
    this.$http.get('/api/ratings')
    .then((response) => {
       response = response.body
       if (response.errnu === ERR_OK) {
           this.ratings = response.data
           this.$nextTick(() => {
             this.scroll = new BScroll(this.$refs.ratings, {
               click: true
             })
           })
       }
    })
  },
  components: {
    star,
    split,
    ratingselect
  },
  methods: {
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
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"
.ratings 
 position:absolute
 top:177px
 left:0
 bottom:0
 overflow:hidden
 width:100%
 .overview
  display:flex
  padding:18px 0
  .overview-left
   flex:0 0 137px
   width:137px
   border-right:1px solid rgba(7,17,27,0.1)
   text-align:center
   padding:6px
   @media only screen and (max-width: 360px)
    flex:0 0 110px
    width:110px
   .score
    font-size:24px
    color:rgb(255,153,0)
    line-height:28px
    margin-bottom:6px
   .title
    font-size:12px
    color:rgb(7,17,27)
    line-height:12px
    margin-bottom:8px
   .rankRate
    font-size:10px
    color:rgb(147,153,159)
    line-height:10px
  .overview-right
   flex:1
   padding:6px 0
   padding-left:24px
   @media only screen and (max-width: 360px)
    padding-left:7px
   .score-wrapper
    font-size:0
    .txt
     display:inline-block
     vertical-align:top
     font-size:12px
     color:rgb(7,17,27)
     line-height:18px
    .rating-star
     display:inline-block
     line-height:18px
     vertical-align:top
     margin:0 9px
    .score
     display:inline-block
     vertical-align:top
     line-height:18px
     font-size:12px
     color:rgb(255,153,0)
   .delivery
    font-size:0
    .txt
     display:inline-block
     vertical-align:top
     font-size:12px
     color:rgb(7,17,27)
     line-height:18px
    .time
     display:inline-block
     vertical-align:top
     font-size:12px
     color:rgb(147,153,159)
     line-height:18px
     margin-left:12px
 .rating-wrapper
  padding:0 18px 
  .rating-item
    display:flex
    border-1px(rgba(7,17,27,0.1))
    position:relative
    padding:18px 0
   .avatar
    flex:0 0 28px
    width:28px
    .image
      border-radius:50%
   .content
    flex:1
    margin-left:12px
    padding-top:2px
    font-size:10px
    line-height:12px
    .username
     color:rgb(7,17,27)
    .delivery
     font-size:0
     margin: 4px 6px 6px 0
     .rating-star
      display:inline-block
      margin-left:-8px
      vertical-align:top
      line-height:12px
      margin-right:6px
     .time
      color:rgb(147,153,159)
      font-size:10px
      display:inline-block
      vertical-align:top
      line-height:16px
    .date
     position:absolute
     top:20px
     right:0px
     color:rgb(147,153,159)
    .text
     font-size:12px
     color:rgb(7,17,27)
     line-height:18px
     margin-bottom:8px
    .recommend
     line-height:16px
     .icon-thumb_up
      font-size:12px
      color:rgb(0,160,220)
      margin-right:8px
     .item
      border:1px solid rgba(7,1,27,0.1)
      border-radius:1px
      background-color:#fff
      display:inline-block
      padding:0 6px
      margin:4px 0
      margin-right:8px;
      font-size:9px
      color:rgb(147,153,159)
      // margin-bottom:
</style>
