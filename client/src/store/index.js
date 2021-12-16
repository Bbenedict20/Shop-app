import { createStore } from 'vuex'
const Cookies = require('js-cookie');
import axios from 'axios';



export default createStore({
  state: {
    cart: [],
    isLoggedIn: false
  },
  mutations: {
    logIn() {
      this.state.isLoggedIn = true;
    },
    logOut() {
      this.state.isLoggedIn = false;
    },
    setCart(state, arr) {
      this.state.cart = arr;
    },
    getCookie() {
      if (Cookies.get('tempCart')) {
        const arr = JSON.parse(Cookies.get('tempCart'));
        this.state.cart = arr;
      } else {
        this.state.cart = [];
      }
    }
  },
  actions: {
    async getCart() {
      //use for getting cart from backend
      await axios
        .get("http://localhost:3000/getcart")
        .then((res) => this.commit('setCart', res.data));
    },
  },
  modules: {
  }
})
