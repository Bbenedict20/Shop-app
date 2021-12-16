<template>
  <div class="flex col ai-c">
    <Nav />
    <div class="flex col ai-c jc-c main w-100">
      <router-view />
    </div>
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import axios from "axios";

export default {
  data() {
    return {
      axios,
    };
  },
  components: {
    Nav,
  },
};
</script>
<style lang="scss">
@import "@/assets/global.scss";
</style>
