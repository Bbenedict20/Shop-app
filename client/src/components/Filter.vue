<template>
  <div :class="getFilterClass">
    <img class="icon" :src="close" alt="" @click="handleClose" />
    <h2>Filter search by</h2>
    <div class="flex col ai-c w-100 filter-container">
      <a @click="handleClick">Brand</a>
      <div class="flex col ai-c w-100 hidden" id="filter-head">
        <a
          @click="handleItemClick"
          id="Tech Nine"
          type="brand"
          class="filter-item"
          >Tech Nine</a
        >
        <a
          @click="handleItemClick"
          id="Never Summer"
          type="brand"
          class="filter-item"
          >Never Summer</a
        >
        <a
          @click="handleItemClick"
          id="Lib Tech"
          type="brand"
          class="filter-item"
          >Lib Tech</a
        >
        <a @click="handleItemClick" id="K2" type="brand" class="filter-item"
          >K2</a
        >
        <a @click="handleItemClick" id="Burton" type="brand" class="filter-item"
          >Burton</a
        >
      </div>
      <a @click="handleClick">Size</a>
      <div class="flex col ai-c w-100 hidden" id="filter-head">
        <a
          @click="handleItemClick"
          id="{`$lt`:`100`}"
          type="size"
          class="filter-item"
          >less than 100</a
        >
        <a
          @click="handleItemClick"
          id="{`$gte`:`100`,`$lte`:`130`}"
          type="size"
          class="filter-item"
          >100 - 130</a
        >
        <a
          @click="handleItemClick"
          id="{`$gt`:`130`,`$lte`:`150`}"
          type="size"
          class="filter-item"
          >131 - 150</a
        >
        <a
          @click="handleItemClick"
          id="{`$gt`:`150`}"
          type="size"
          class="filter-item"
          >more than 150</a
        >
      </div>
      <a @click="handleClick">Flex</a>
      <div class="flex col ai-c w-100 hidden" id="filter-head">
        <a
          @click="handleItemClick"
          id="{`$gte`:`1`,`$lte`:`3`}"
          type="flex"
          class="filter-item"
          >1-3</a
        >
        <a
          @click="handleItemClick"
          id="{`$gte`:`4`,`$lte`:`6`}"
          type="flex"
          class="filter-item"
          >4-6</a
        >
        <a
          @click="handleItemClick"
          id="{`$gte`:`7`}"
          type="flex"
          class="filter-item"
          >7+</a
        >
      </div>
      <a @click="handleClick">Price</a>
      <div class="flex col ai-c w-100 hidden" id="filter-head">
        <a
          @click="handleItemClick"
          id="{`$lt`:`200`}"
          type="price"
          class="filter-item"
          >less than $200</a
        >
        <a
          @click="handleItemClick"
          id="{`$gte`:`200`,`$lte`:`400`}"
          type="price"
          class="filter-item"
          >$200 to $400</a
        >
        <a
          @click="handleItemClick"
          id="{`$gt`:`400`,`$lte`:`700`}"
          type="price"
          class="filter-item"
          >$401 to $700</a
        >
        <a
          @click="handleItemClick"
          id="{`$gt`:`700`}"
          type="price"
          class="filter-item"
          >more than $700</a
        >
      </div>
    </div>
    <button @click="handleSearch">Search</button>
  </div>
</template>
<script>
import close from "../assets/close.png";

export default {
  data() {
    return {
      filter: {
        brand: [],
        size: [],
        flex: [],
        price: [],
      },
      close,
    };
  },
  computed: {
    getFilterClass() {
      if (this.showFilter) {
        return "flex col ai-c filter-main show";
      } else {
        return "flex col ai-c filter-main";
      }
    },
  },
  methods: {
    getArray(type) {
      const arr = [];
      for (let p of this.products) {
        if (!arr.includes(p[type])) {
          arr.push(p[type]);
        }
      }
      return arr;
    },
    handleClick(e) {
      e.currentTarget.nextElementSibling.classList.toggle("hidden");
    },
    handleClear() {
      const selectedItems = Array.from(document.querySelectorAll(".selected"));
      for (let item of selectedItems) {
        item.classList.remove("selected");
      }
      this.filter = {
        brand: [],
        size: [],
        flex: [],
        price: [],
      };
    },
    handleClose() {
      this.toggleFilter();
      const headers = Array.from(document.querySelectorAll("#filter-head"));
      setTimeout(() => {
        for (let item of headers) {
          if (!item.classList.contains("hidden")) {
            item.classList.add("hidden");
          }
        }
      }, 700);
    },
    handleSearch() {
      this.$emit("emitFilter", this.filter);
      this.handleClose();
    },
    handleItemClick(e) {
      e.target.classList.toggle("selected");
      if (this.filter[e.target.type].includes(e.target.id)) {
        const itemInd = this.filter[e.target.type].findIndex(
          (i) => i === e.target.id
        );
        this.filter[e.target.type].splice(itemInd, 1);
      } else {
        this.filter[e.target.type].push(e.target.id);
      }
    },
  },
  props: ["products", "showFilter", "toggleFilter"],
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

.filter-main {
  transition: top 700ms ease-in-out;
  z-index: 2;
  position: absolute;
  background-color: rgba(239, 253, 255, 0.9);
  border: 2px solid $p-color;
  border-top: none;
  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 4px 4px;
  top: -100%;
  padding: 2rem;
  width: 60vw;
  overflow-x: hidden;
  max-width: 1000px;

  .filter-item {
    background-color: rgb(239, 253, 255);
    font-weight: 400;
  }
  h2 {
    margin-bottom: 1rem;
    font-size: 1.8em;
    color: $p-color-text;
  }
  a {
    border: 1px solid black;
    font-size: 1.1em;
    width: 80%;
    font-weight: 700;
    padding: 0.5rem 1rem;
    background-color: lighten($p-color, 45%);

    &:hover {
      background-color: lighten($p-color, 45%);
    }
  }
}
.icon {
  width: 5%;
  max-width: 40px;
  align-self: flex-end;
  filter: invert(12%) sepia(84%) saturate(1216%) hue-rotate(172deg)
    brightness(95%) contrast(98%);
  &:hover {
    cursor: pointer;
    filter: invert(79%) sepia(12%) saturate(952%) hue-rotate(154deg)
      brightness(94%) contrast(96%);
  }
}
.show {
  top: 0 !important;
}
.selected {
  background-color: lighten($p-color, 40%) !important;
}
.hidden {
  display: none;
}
button {
  @extend %btn;

  font-size: 1em;
  margin-top: 1rem;
  padding: 0.2rem 1rem;
}

@media (max-width: 540px) {
  .filter-main {
    width: 100%;
  }
  .filter-container {
    overflow-x: hidden;
  }
}
@media (min-width: 541px) {
  .filter-main {
    height: auto;
  }
}
</style>