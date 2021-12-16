<template>
  <div class="flex col ai-c w-100">
    <h1>Order history</h1>
    <div class="flex col ai-c order-container">
      <div
        v-for="(item, i) of this.pastOrders.slice().reverse()"
        :key="i"
        class="order"
      >
        <h4 class="date">{{ item.date }}</h4>
        <div
          class="flex jc-sb"
          v-for="orderItem of item.order"
          :key="orderItem._id"
        >
          <p>{{ orderItem.name }}</p>
          <p>quantity: {{ orderItem.quantity }}</p>
          <p>price: ${{ orderItem.price * orderItem.quantity }}</p>
        </div>
        <h4>Total price: ${{ getTotal(item.order) }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pastOrders: [],
    };
  },
  async mounted() {
    await this.axios
      .post("api/getpastorders")
      .then((res) => (this.pastOrders = res.data));
  },
  methods: {
    getTotal(arr) {
      let num = 0;
      if (arr) {
        for (let item of arr) {
          num += item.price * item.quantity;
        }
      }
      return num;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

h1 {
  margin-top: 6rem;
  margin-bottom: 3rem;
}
.order-container {
  margin-bottom: 1rem;
  max-width: 1000px;
}
.order-container::-webkit-scrollbar {
  background-color: rgb(216, 250, 250);
  width: 0.6rem;
}
.order-container::-webkit-scrollbar-thumb {
  background-color: lighten($p-color, 40%);
  border-radius: 8px;
}
.order {
  border: 1px solid black;
  padding: 1rem;
  width: 100%;

  p {
    margin: 0.5rem;
  }
  .date {
    text-align: left;
  }
}
@media (max-width: 541px) {
  .order-container {
    width: 95%;
    height: 100vh;
    overflow-x: hidden;
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
  p {
    font-size: 1.2em;
  }
}
@media (min-width: 1200px) {
  .order-container {
    width: 50%;
  }
}
</style>