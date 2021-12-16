<template>
  <div :class="getClass">
    <img :src="close" alt="" class="close" @click="this.slideOut" />
    <router-link to="/profile/info" @click="this.slideOut"
      >Profile Information</router-link
    >
    <router-link to="/profile/pastorders" @click="this.slideOut"
      >Past Orders</router-link
    >
    <a>Contact Us</a>
    <a></a>
  </div>
</template>
<script>
import close from "../assets/close.png";

export default {
  data() {
    return {
      close,
    };
  },
  computed: {
    getClass() {
      if (this.showSlider) {
        return "slider flex col jc-sb show";
      } else {
        return "slider flex col ai-c jc-sb";
      }
    },
  },
  props: ["showSlider", "slideOut"],
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

.slider {
  top: 0;
  align-items: flex-start;
  left: -100%;
  padding: 0.8rem 1.2rem;
  padding-right: 2.4rem;
  padding-top: 4rem;
  height: 40vh;
  transition: left 700ms ease-in-out;
  z-index: 2;
  position: absolute;
  background-color: rgba(239, 253, 255, 1);
  border: 2px solid $p-color;
  border-left: none;
  border-top: none;
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 4px 0;
}
.show {
  left: 0 !important;
}
a {
  font-weight: 700;
  color: $s-color-text;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid $s-color-text;
  }
}
.close {
  filter: invert(12%) sepia(84%) saturate(1216%) hue-rotate(172deg)
    brightness(95%) contrast(98%);
  width: 8%;
  position: absolute;
  top: 14px;
  right: 14px;

  &:hover {
    cursor: pointer;
    filter: invert(79%) sepia(12%) saturate(952%) hue-rotate(154deg)
      brightness(94%) contrast(96%);
  }
}
</style>