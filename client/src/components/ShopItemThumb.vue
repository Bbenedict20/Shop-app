<template>
  <div
    :style="getStyle"
    @click="handleItemClick(this.item)"
    @mouseover="this.isVisible = true"
    @mouseleave="handleResize()"
  >
    <p :class="showText">{{ this.item.name }}</p>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    if (window.innerWidth <= 540) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  },
  computed: {
    getStyle() {
      return `background-image:url(${this.item.image})`;
    },
    showText() {
      if (this.isVisible) {
        return "show";
      } else {
        return "";
      }
    },
  },
  methods: {
    handleItemClick(item) {
      //takes to to detail page of specific item
      this.$router.push({
        name: "Shop-detail",
        params: {
          id: item._id,
          name: item.name,
          image: item.image,
        },
      });
    },
    handleResize() {
      if (window.innerWidth <= 540) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 240px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
p {
  padding: 0.4rem;
  justify-self: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
  width: 80%;
  align-self: flex-end;
  border-radius: 4px;
  color: white;
  font-size: 1.1em;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
  background-color: rgb(216, 250, 250, 0.6);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: 200ms all ease;
}
.show {
  opacity: 1 !important;
}

@media (max-width: 541px) {
  div {
    height: 200px;
  }
}
@media (min-width: 1200px) {
  div {
    height: 300px;
  }
}
</style>