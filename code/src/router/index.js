import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Shop from '../views/Shop.vue'
import Buy from '../components/user/buy.vue'
import Collection from '../components/user/collection.vue'
import UserMsg from '../components/user/usermsg.vue'
import Trade from '../components/user/trade.vue'
import Order from '../components/user/order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: [
      {
        path: '/usermsg',
        name: 'UserMsg',
        component: UserMsg
      },
      {
        path: '/collection',
        name: 'Collection',
        component: Collection
      },
      {
        path: '/trade',
        name: 'Trade',
        component: Trade
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/buy',
        name: 'Buy',
        component: Buy
      }
    ]
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
