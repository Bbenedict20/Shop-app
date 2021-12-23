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
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  },
};
</script>
<style lang="scss">
@import "@/assets/global.scss";
</style>
