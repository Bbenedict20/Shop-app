<template>
  <div class="flex ai-c col container w-100">
    <h1>Product lineup</h1>
    <div class="flex button-container jc-sb">
      <button @click="toggleFilter">Filter products</button>
      <button @click="clearFilters">Clear Filters</button>
    </div>
    <Filter
      :showFilter="showFilter"
      :products="products"
      :toggleFilter="toggleFilter"
      @emitFilter="getFilter"
      ref="clear"
    />
    <div class="shop-grid">
      <ShopItemThumb v-for="item of products" :key="item._id" :item="item" />
    </div>
  </div>
</template>
<script>
import Filter from "../components/Filter.vue";
import ShopItemThumb from "../components/ShopItemThumb.vue";

export default {
  data() {
    return {
      products: [],
      showFilter: false,
    };
  },
  components: {
    Filter,
    ShopItemThumb,
  },
  methods: {
    handleItemClick(item) {
      //takes to to detail page of specific item
      this.$router.push({
        name: "Shop-detail",
        params: { id: item._id, name: item.name, image: item.image },
      });
    },
    async clearFilters() {
      const filters = {
        brand: [],
        size: [],
        flex: [],
        price: [],
      };

      this.$refs.clear.handleClear();
      await this.axios
        .post("api/filter", filters)
        .then((res) => (this.products = res.data));
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    sortFilters(filter) {
      const filters = {
        brand: [],
        size: [],
        flex: [],
        price: [],
      };
      for (let item in filter) {
        if (filter[item].length > 0) {
          for (let i of filter[item]) {
            filters[item].push(i.replaceAll("`", '"'));
          }
        }
      }
      return filters;
    },
    async getFilter(e) {
      await this.axios
        .post("api/filter", this.sortFilters(e))
        .then((res) => (this.products = res.data));
    },
  },
  async mounted() {
    const res = await this.axios.get("api/products");
    this.products = res.data;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

h1 {
  margin-top: 4rem;
  margin-bottom: 1rem;
}
button {
  @extend %btn;

  font-size: 0.9em;
  padding: 0.4rem 0.7rem;
}
.button-container {
  margin-bottom: 2rem;
}
.shop-grid::-webkit-scrollbar {
  background-color: rgb(216, 250, 250);
  width: 0.6rem;
}
.shop-grid::-webkit-scrollbar-thumb {
  background-color: lighten($p-color, 40%);
  border-radius: 8px;
}
.container {
  height: 100vh;
  width: 100vw;
  max-width: 1400px;
}
.shop-grid {
  display: grid;
  grid-gap: 0.2rem;
  width: 75%;
  overflow-x: hidden;
  margin-bottom: 3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

@media (max-width: 540px) {
  .button-container {
    width: 75%;
  }
  .shop-grid {
    width: 75%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;

    img {
      height: 50%;
    }
  }
}
@media (min-width: 541px) {
  .button-container {
    width: 45%;
  }
  .shop-grid {
    width: 75%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
  }
}
@media (min-width: 769px) {
  .button-container {
    width: 40%;
  }
}
@media (min-width: 1200px) {
  .shop-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  .button-container {
    width: 30%;
  }
}
</style>