<template>
  <nav class="flex jc-sb ai-c">
    <router-link v-if="!isLogged" to="/login">Log in!</router-link>
    <div v-if="isLogged" class="flex ai-c">
      <!-- <img :src="avatar" alt="" class="avatar" @click="slideOut" /> -->
      <a @click="slideOut">Profile</a>
      <a @click="logOut">Logout</a>
    </div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/cart">Cart ({{ cartNum }})</router-link>
    </div>
    <div class="hamburger flex col jc-sb" @click="handleDrop">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div :class="getDropClass">
      <img :src="close" alt="" class="close" @click="handleDrop" />
      <router-link class="drop-item" to="/" @click="handleDrop"
        >Home</router-link
      >
      <router-link class="drop-item" to="/shop" @click="handleDrop"
        >Shop</router-link
      >
      <router-link class="drop-item" to="/cart" @click="handleDrop"
        >Cart ({{ cartNum }})</router-link
      >
    </div>

    <ProfileSlide :showSlider="showSlider" :slideOut="slideOut" />
  </nav>
</template>
<script>
const Cookies = require("js-cookie");
import avatar from "../assets/avatar.png";
import ProfileSlide from "./ProfileSlide";
import close from "../assets/close.png";

export default {
  data() {
    return {
      avatar,
      close,
      showSlider: false,
      showDrop: false,
    };
  },
  name: "Nav",
  computed: {
    cartNum() {
      //gets number of items in cart
      let num = 0;

      for (let c of this.$store.state.cart) {
        num += c.quantity;
      }
      return num;
    },
    getDropClass() {
      if (this.showDrop) {
        return "dropdown flex col jc-sb showD";
      } else {
        return "dropdown flex col jc-sb";
      }
    },
    isLogged() {
      return this.$store.state.isLoggedIn;
    },
  },
  components: {
    ProfileSlide,
  },
  async mounted() {
    window.addEventListener("resize", this.handleResize);
    //check to see if user is logged in then set global state to true or false
    const res = await this.axios.post(
      `${process.env.VUE_APP_API_ENDPOINT}/islogged`
    );
    if (res.data) {
      this.$store.commit("logIn");
      this.$store.dispatch("getCart");
    } else {
      //if you're not logged in set global state to false and set up the cookie cart
      this.$store.commit("logOut");
      this.$store.commit("getCookie");
    }
  },
  methods: {
    async logOut() {
      //set global state to false then destroy session
      this.$store.commit("logOut");
      //clear cookies
      Cookies.remove("tempCart");
      //go back to using cookies as a cart
      this.$store.commit("getCookie");
      this.$router.push("/");
      await this.axios.post(`${process.env.VUE_APP_API_ENDPOINT}/logout`);
    },
    handleResize() {
      if (window.innerWidth > 500) {
        this.showDrop = false;
      }
    },
    slideOut() {
      this.showSlider = !this.showSlider;
    },
    handleDrop() {
      this.showDrop = !this.showDrop;
    },
    async getCart() {
      //use for getting cart from backend
      await this.axios
        .get(`${process.env.VUE_APP_API_ENDPOINT}/getcart`)
        .then((res) => this.$store.commit("setCart", res.data));
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

.avatar {
  width: 25%;

  &:hover {
    cursor: pointer;
  }
}
nav {
  justify-self: center;
  max-width: 1400px;
  position: fixed;
  padding: 1rem 0.8rem;
  width: 100%;

  a {
    color: black;
    font-size: 1.2em;
    padding: 0 0.5rem;

    &.router-link-exact-active {
      color: $p-color;
    }
    &:hover {
      color: lighten($p-color, 25%);
    }
  }
}
.hamburger {
  display: none;
}
.dropdown {
  position: absolute;
  right: -100%;
}
.close {
  opacity: 0;
}
@media (max-width: 500px) {
  .links {
    display: none;
  }
  .hamburger {
    height: 18px;
    align-items: flex-end;
    display: flex;

    &:hover {
      cursor: pointer;
    }
    div {
      height: 2px;
      background-color: $s-color-text;
      width: 30px;
    }
    div:nth-of-type(1) {
      width: 15px;
    }
    div:nth-of-type(3) {
      width: 20px;
    }
  }
  .showD {
    right: 0 !important;
  }
  .dropdown {
    top: 0;
    align-items: flex-end;
    right: -100%;
    padding: 4rem 1.2rem;
    padding-left: 3.4rem;
    padding-top: 3rem;
    height: 40vh;
    transition: right 700ms ease-in-out;
    z-index: 2;
    position: absolute;
    background-color: rgba(239, 253, 255, 1);
    border: 2px solid $p-color;
    border-right: none;
    border-top: none;
    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 0 4px;

    .drop-item {
      font-weight: 700;
      color: $s-color-text;
      border-bottom: 1px solid transparent;
      &:hover {
        border-bottom: 1px solid $s-color-text;
      }
    }
    .close {
      opacity: 1;
      filter: invert(12%) sepia(84%) saturate(1216%) hue-rotate(172deg)
        brightness(95%) contrast(98%);
      width: 10%;
      position: absolute;
      top: 14px;
      left: 14px;

      &:hover {
        cursor: pointer;
        filter: invert(79%) sepia(12%) saturate(952%) hue-rotate(154deg)
          brightness(94%) contrast(96%);
      }
    }
  }
}
</style>