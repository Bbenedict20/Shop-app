<template>
  <div class="flex col ai-c w-100">
    <h1>Order preview</h1>
    <div class="flex col ai-c cart-container">
      <div
        class="flex ai-c"
        v-for="item of this.$store.state.cart"
        :key="item._id"
      >
        <p>{{ item.name }}</p>
        <p>quantity: {{ item.quantity }}</p>
        <p>${{ item.price * item.quantity }}</p>
        <button @click="handleInc(false, item._id, item.quantity)">-</button>
        <button @click="handleDelete(item._id)">Delete</button>
        <button @click="handleInc(true, item._id)">+</button>
      </div>
    </div>
    <p><strong>Total:</strong> ${{ getTotal }}</p>
    <button class="checkout" @click="handleProceed">Proceed to payment</button>
  </div>
</template>
<script>
const Cookies = require("js-cookie");

export default {
  computed: {
    getTotal() {
      let total = 0;
      for (let item of this.$store.state.cart) {
        total += item.price * item.quantity;
      }
      return total;
    },
  },
  methods: {
    async handleDelete(_id) {
      if (this.$store.state.isLoggedIn) {
        await this.axios
          .delete("api/deleteitem", {
            data: { _id },
          })
          .then((res) => this.$store.commit("setCart", res.data));
      } else {
        if (Cookies.get("tempCart")) {
          const curCart = JSON.parse(Cookies.get("tempCart"));
          const newCart = curCart.filter((item) => item._id !== _id);
          Cookies.set("tempCart", JSON.stringify(newCart));
          this.$store.commit("setCart", newCart);
        }
      }
    },
    handleProceed() {
      this.$router.push("/checkout/pay");
    },
    async handleInc(plus, _id, quantity) {
      if (this.$store.state.isLoggedIn) {
        if (quantity <= 1) {
          this.handleDelete(_id);
        } else {
          await this.axios
            .post("api/increment", { plus, _id })
            .then((res) => this.$store.commit("setCart", res.data));
        }
      } else {
        let curCart = [];
        Cookies.get("tempCart")
          ? (curCart = JSON.parse(Cookies.get("tempCart")))
          : (curCart = []);

        if (plus) {
          if (curCart.find((item) => item._id === _id)) {
            const curItemInd = curCart.findIndex((item) => item._id === _id);
            curCart[curItemInd].quantity = curCart[curItemInd].quantity + 1;
            this.$store.commit("setCart", curCart);
            Cookies.set("tempCart", JSON.stringify(this.$store.state.cart));
          }
        } else {
          if (curCart.find((item) => item._id === _id)) {
            const curItemInd = curCart.findIndex((item) => item._id === _id);
            curCart[curItemInd].quantity <= 1
              ? (curCart = curCart.filter((item) => item._id !== _id))
              : (curCart[curItemInd].quantity =
                  curCart[curItemInd].quantity - 1);
            this.$store.commit("setCart", curCart);
            Cookies.set("tempCart", JSON.stringify(this.$store.state.cart));
          }
        }
      }
    },
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
.cart-container {
  padding: 2rem;
  max-width: 1000px;
  border: 1px solid $p-color;
  border-radius: 4px;
}
.inc {
  width: 5%;
  padding: 0.2rem;
  display: grid;
  place-items: center;
  height: 10%;
}
@media (max-width: 360px) {
  .cart-container {
    width: 95%;
    padding: 1rem 0.5rem;
  }
  p {
    font-size: 0.8em;
  }
  button:not(.checkout) {
    font-size: 0.6em;
  }
  .total {
    font-size: 1.3em;
  }
}
@media (min-width: 541px) {
  .cart-container {
    width: 80%;
  }
}
@media (min-width: 769px) {
  .cart-container {
    width: 60%;
  }
}
@media (min-width: 1200px) {
  .cart-container {
    width: 50%;
  }
}
</style>