<template>
  <div class="star" :class="starType">
     <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span> 
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
 name: 'star',
 props: {
   size: {
     type: Number
   },
   score: {
     type: Number
   }
 },
 computed: {
   starType() {
     return 'size-' + this.size
   },
   itemClasses() {
    let result = []
    // 向下取0.5的倍数
    let score = Math.floor(this.score * 2) / 2
    // 判断是否有整数
    let hasDecimal = score % 1 !== 0
    // 获取分数的整数部分
    let integer = Math.floor(score)
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON)
    }
    if (hasDecimal) {
      result.push(CLS_HALF)
    }
    // 补全star
    while (result.length < LENGTH) {
       result.push(CLS_OFF)
    }
    return result
   }
 }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins.styl"
 .star
  font-size:0
  .star-item
    display:inline-block
    background-repeat:no-repeat
  &.size-48
   .star-item
    width:20px
    height:20px
    margin-left:22px
    background-size:20px 20px
    &:last-child
      margin-right:0
    &.on
      bg-image('star48_on')
    &.half
      bg-image('star48_half')
    &.off
      bg-image('star48_off')
  &.size-36
    .star-item
      width:15px
      height:15px
      margin-left:6px
      background-size:15px 15px
      &:last-child
        margin-right:0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.size-24
    .star-item
      width:10px
      height:10px
      margin-left:3px
      background-size:10px 10px
      &:last-child
        margin-right:0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
