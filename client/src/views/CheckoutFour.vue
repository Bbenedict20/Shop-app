<template>
  <div class="flex col ai-c w-100">
    <h1>Your order has been placed!</h1>
    <p class="order-text">
      Congratulations, your order will be on the way shortly! Your order number
      is Your order number is <strong>{{ orderNum }}</strong
      >. If you have an account with us you will recieve an e-mail shortly
      containing all this information.
    </p>
    <h2>Your order:</h2>
    <div class="flex col ai-c order-container">
      <div class="flex order-item" v-for="item of curOrder" :key="item._id">
        <p>{{ item.name }}</p>
        <p>${{ item.price * item.quantity }}</p>
        <p>quantity: {{ item.quantity }}</p>
      </div>
    </div>
    <p>
      <strong>Total: ${{ getTotal }}</strong>
    </p>
  </div>
</template>
<script>
const Cookies = require("js-cookie");

export default {
  computed: {
    getTotal() {
      let total = 0;
      for (let item of this.curOrder) {
        total += item.price * item.quantity;
      }
      return total;
    },
  },
  data() {
    return {
      curOrder: [],
      orderNum: "",
    };
  },
  async mounted() {
    if (
      !Cookies.get("orderNum") ||
      Cookies.get("orderNum") === undefined ||
      !Cookies.get("placedOrder")
    ) {
      Cookies.set("orderNum", this.$route.params.orderNum);
      Cookies.set("placedOrder", JSON.stringify(this.$store.state.cart));
    }
    this.curOrder = JSON.parse(Cookies.get("placedOrder"));
    this.orderNum = Cookies.get("orderNum");
    this.$store.commit("setCart", []);
    if (this.$store.state.isLoggedIn) {
      await this.axios
        .post("api/clearCart", {
          cart: this.curOrder,
        })
        .then(() => this.$store.commit("setCart", []));
    }
  },
  unmounted() {
    Cookies.remove("orderNum");
    Cookies.remove("placedOrder");
    Cookies.remove("tempCart");
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

h1 {
  margin-top: 6rem;
}
div {
  margin: 0.5rem;
}
p {
  margin: 0.8rem;
  font-size: 1.1em;
  color: $s-color-text;
}
button {
  @extend %btn;

  padding: 0.4rem 0.5rem;
  height: 80%;
  margin: 0 0.2rem;
}
.order-container {
  padding: 2rem;
  max-width: 1000px;
  border: 1px solid $p-color;
  border-radius: 4px;
}
.order-text {
  width: 75%;
  max-width: 800px;
  margin: 2rem;
}
@media (max-width: 360px) {
  h1 {
    font-size: 1.8em;
  }
  .order-text {
    font-size: 1em;
  }
  .order-container {
    width: 95%;
    padding: 1rem;
  }
  p {
    font-size: 1em;
  }
}
@media (min-width: 541px) {
  .order-container {
    width: 80%;
  }
}
@media (min-width: 769px) {
  .order-container {
    width: 60%;
  }
}
@media (min-width: 1200px) {
  .order-container {
    width: 50%;
  }
}
</style>