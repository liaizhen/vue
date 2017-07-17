<template>
  <div class="ratingselect">
      <div class="rating-type border-1px">
          <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span @click.stop="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
          <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
          <span class="icon-check_circle"></span>
          <span class="txt">只看有内容的评价</span>  
      </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
      ratings: {
          type: Array,
          default() {
              return []
          }
      },
      selectType: {
          type: Number,
          default: ALL
      },
    //   是否只看有内容的评价
      onlyContent: {
          type: Boolean,
          default: false
      },
      desc: {
          type: Object,
          default() {
              return {
                all: '全部',
                positive: '满意',
                negative: '不满意'
              }
          }
      }
  },
  data() {
         return {
            selectedType: ALL,
            showContent: false
         }
     },
  computed: {
      positives() {
          return this.ratings.filter((rating) => {
              return rating.rateType === POSITIVE
          })
      },
      negatives() {
          return this.ratings.filter((rating) => {
              return rating.rateType === NEGATIVE
          })
      }
  },
  methods: {
      select(type, event) {
          if (!event._constructed) {
             return
          }
        this.selectedType = type
        this.$emit('select', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
             return
          }
          this.showContent = !this.showContent
          this.$emit('toggleContent', this.showContent)
      }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"
.ratingselect
 .rating-type
  padding:18px 0
  margin:0 18px
  border-1px(rgba(7,17,77,.1))
  font-size:0
  .block
   display:inline-block
   padding:8px 12px
   margin-right:8px
   font-size:12px
   color:rgb(77,85,93)
   line-height:16px
   border-radius:1px
   &.active
     color:#fff
   &.positive
    background-color:rgba(0,160,220,.2)
    &.active
     background-color:rgb(0,160,220)
   &.negative
    background-color:rgba(77,85,93,.2)
    &.active
     background-color:rgb(77,85,93)
   .count
    margin-left:2px
    font-size:8px
 .switch
   padding:12px 18px
   border-bottom:1px solid rgba(7,17,27,.2)
   line-height:24px
   color:rgb(147,153,159)
   font-size:0
   &.on
    .icon-check_circle
      color:#00c850
   .icon-check_circle
     font-size:24px
     display: inline-block;
     vertical-align: top;
   .txt
     display: inline-block;
     vertical-align: top;
     margin-left:4px
     font-size:12px
</style>
