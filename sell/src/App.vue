<template>
  <div id="app">
    <Vheader :seller="seller"></Vheader>
    <div class="tab">
      <div class="tab-item border-1px">
         <router-link to="/goods">商品</router-link>
        </div>
      <div class="tab-item">
         <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
       <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vheader from './components/header/header'
import urlParse from '@/common/js/utils.js'
const ERR_OK = 0
export default {
  name: 'app',
  components: { Vheader },
  data() {
    return {
      seller: {
        id: (() => {
        let queryParem = urlParse()
        // console.log(queryParem)
        return queryParem.id
      })()
    }
    }
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id)
    .then((response) => {
       response = response.body
      if (response.errnu === ERR_OK) {
        this.seller = response.data
        this.seller = Object.assign({}, this.seller, {id: urlParse()})
        // console.log(this.seller.id)
        // console.log(this.seller.supports.length)
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
 @import "common/stylus/mixins.styl"
.tab
    display:flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1) 一个像素在不同的dpr手机上的粗细问题
  .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
