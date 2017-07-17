import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/goods',
      component: goods
      // name: 'goods'
    },
    {
      path: '/ratings',
      component: ratings
      // name: 'ratings'
    },
    {
      path: '/seller',
      component: seller
      // name: 'seller'
    }
  ],
  linkActiveClass: 'active'
})
