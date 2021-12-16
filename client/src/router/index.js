import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue';
import ShopItem from '../views/ShopItem.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Cart from '../views/Cart.vue';
import CheckoutOne from '../views/CheckoutOne.vue';
import CheckoutTwo from '../views/CheckoutTwo.vue';
import CheckoutThree from '../views/CheckoutThree.vue';
import CheckoutFour from '../views/CheckoutFour.vue';
import PastOrders from '../views/PastOrders.vue';
import ProInfo from '../views/ProInfo.vue';
import store from '../store/index.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/shop/:id',
    name: 'Shop-detail',
    component: ShopItem,
    props: { default: true }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout/login',
    name: 'CheckoutOne',
    component: CheckoutOne
  },
  {
    path: '/checkout/preview',
    name: 'CheckoutTwo',
    component: CheckoutTwo
  },
  {
    path: '/checkout/pay',
    name: 'CheckoutThree',
    component: CheckoutThree
  },
  {
    path: '/checkout/complete',
    name: 'CheckoutFour',
    component: CheckoutFour,
    props: { default: true }
  },
  {
    path: '/profile/pastorders',
    name: 'PastOrders',
    component: PastOrders,
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) next({ name: 'Home' })
      else next();
    }
  },
  {
    path: '/profile/info',
    name: 'ProInfo',
    component: ProInfo,
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) next({ name: 'Home' })
      else next();
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
