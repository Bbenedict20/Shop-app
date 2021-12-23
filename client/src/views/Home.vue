<template>
  <div>
    <div class="header">
      <h1>Own the stoke this winter!</h1>
      <button @click="handleClick">
        Click to check out our latest products!
      </button>
    </div>
    <h2>Featured products</h2>
    <div class="featured flex ai-c jc-sb">
      <div class="img-box" :style="getImage('One')">
        <button @click="handleItemClick(itemOne)">{{ itemOne.name }}</button>
      </div>
      <div class="img-box" :style="getImage('Two')">
        <button @click="handleItemClick(itemTwo)">
          {{ itemTwo.name }}
        </button>
      </div>
      <div class="img-box" :style="getImage('Three')">
        <button @click="handleItemClick(itemThree)">
          {{ itemThree.name }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerImg:
        "https://images.unsplash.com/photo-1617939533073-6c94c709370c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1744&q=80",
      itemOne: {},
      itemTwo: {},
      itemThree: {},
    };
  },
  methods: {
    handleClick() {
      this.$router.push("/shop");
    },
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
    getImage(num) {
      let item = `item${num}`;
      return `background-image: url("${this[item].image}") `;
    },
  },
  async mounted() {
    await this.axios
      .post(`${process.env.VUE_APP_API_ENDPOINT}/getrandomimg`)
      .then((res) => {
        this.itemOne = res.data[0];
        this.itemTwo = res.data[1];
        this.itemThree = res.data[2];
      });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/global.scss";

.header {
  background-attachment: fixed;
  background-image: url("https://images.unsplash.com/photo-1617939533073-6c94c709370c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1744&q=80");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 60vh;
  width: 100vw;
  max-width: 1400px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);

  h1,
  button {
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.5);
    background-color: rgba(133, 206, 240, 0.6);
    border-radius: 8px;
    color: white;
    padding: 1rem 0.4rem;
    place-self: center;
  }
  h1 {
    grid-area: item-1;
    width: 90%;
    padding: 0.6rem 0.9rem;
    font-size: 2.2em;
  }
  button {
    outline: none;
    border: none;
    font-size: 1.2em;
    grid-area: item-2;
    transition: all 200ms ease;
    font-weight: 700;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.6);
      transform: translateY(-3px);
    }
  }
}
h2 {
  font-size: 2em;
  color: $p-color-text;
  margin: 1rem;
}
.featured {
  width: 100%;
  height: 30vh;
  padding: 0 1rem;
}
.img-box {
  display: grid;
  // background-image: url("https://images.unsplash.com/photo-1617939533073-6c94c709370c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1744&q=80");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 33%;

  button {
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.5);
    background-color: rgba(133, 206, 240, 0.6);
    border-radius: 8px;
    color: white;
    padding: 1rem 0.4rem;
    outline: none;
    border: none;
    font-size: 1.1em;
    font-weight: 700;
    align-self: flex-end;
    justify-self: center;
    transition: all 200ms ease;
    margin-bottom: 1rem;
    width: 75%;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.6);
      transform: translateY(-3px);
    }
  }
}

@media (max-width: 540px) {
  .featured {
    flex-direction: column;
    height: 80vh;
  }
  .img-box {
    width: 80%;
    margin-bottom: 0.2rem;
  }

  .header {
    grid-template-areas:
      ". . . ."
      "item-1 item-1 item-1 item-1"
      ". . . ."
      ". item-2 item-2 .";
    h1 {
      font-size: 1.4em;
    }
    button {
      font-size: 1em;
    }
  }
}
@media (min-width: 541px) {
  .header {
    grid-template-areas:
      ". . . ."
      "item-1 item-1 . ."
      ". . . ."
      ". item-2 item-2 .";
    button {
      font-size: 1em;
    }
    h1 {
      font-size: 1.6em;
    }
  }
}
@media (min-width: 1034px) {
  .featured {
    margin-bottom: 3rem;
  }
  .header {
    grid-template-areas:
      ". . . ."
      "item-1 item-1 . ."
      ". . . ."
      ". item-2 item-2 .";
    h1 {
      font-size: 2.2em;
    }
    button {
      font-size: 1.2em;
    }
  }
}
</style>