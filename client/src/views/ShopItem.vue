<template>
  <div class="flex col ai-c">
    <h1>{{ info.name }}</h1>
    <h2>{{ info.brand }}</h2>
    <h3>Flex: {{ info.flex }}</h3>
    <h3>Price: ${{ info.price }}</h3>
    <img :src="info.image" alt="" />
    <button @click="handleAdd">Add to cart!</button>
  </div>
</template>
<script>
const Cookies = require("js-cookie");

export default {
  data() {
    return {
      info: {},
    };
  },
  async mounted() {
    await this.axios
      .post("api/details", { id: this.$route.params.id })
      .then((res) => (this.info = res.data));
  },
  methods: {
    async handleAdd() {
      if (this.$store.state.isLoggedIn) {
        //add data to backend
        await this.axios
          .post("api/additem", this.info)
          .then((res) => this.$store.commit("setCart", res.data));
      } else {
        let curCart = [];
        Cookies.get("tempCart")
          ? (curCart = JSON.parse(Cookies.get("tempCart")))
          : (curCart = []);

        if (curCart.find((item) => item.name === this.info.name)) {
          //if item already exists, find the items id and update quantity

          const curItemInd = curCart.findIndex(
            (item) => item.name === this.info.name
          );
          curCart[curItemInd].quantity = curCart[curItemInd].quantity + 1;
          //update global state to force re-render
          this.$store.commit("setCart", curCart);
          //update the cart stored in cookies
          // Cookies.remove("tempCart");
          Cookies.set("tempCart", JSON.stringify(this.$store.state.cart));
        } else {
          //set quantity of items to be added to cart
          this.info.quantity = 1;
          //add in current items info to the current array of items
          curCart.push(this.info);
          this.$store.commit("setCart", curCart);
          //Cookies.remove("tempCart");
          Cookies.set("tempCart", JSON.stringify(this.$store.state.cart));
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";
div {
  overflow-x: hidden;
  height: 100vh;
}
h1 {
  margin-top: 6rem;
}
h2,
h3 {
  margin: 0.3rem;
}
button {
  @extend %btn;
  margin: 1rem 0;
  padding: 0.2rem 1rem;
}

@media (max-width: 540px) {
  img {
    width: 80%;
  }
}
@media (min-width: 541px) {
  img {
    width: 60%;
  }
}
@media (min-width: 769px) {
  img {
    width: 50%;
  }
}
</style>