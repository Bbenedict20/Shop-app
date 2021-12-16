<template>
  <div class="form-container">
    <form action="">
      <h2>Shipping Information</h2>
      <h3 :class="missingStyle">Please fill out missing information</h3>
      <div class="flex col">
        <div class="flex ai-c jc-c">
          <label for="address">Address line 1</label>
          <input
            class="addy input-block"
            type="text"
            id="address"
            v-model="S_info.address"
          />
        </div>
        <div class="flex ai-c jc-c">
          <label for="address2">Address line 2</label>
          <input
            class="addy"
            type="text"
            id="address2"
            v-model="S_info.address2"
            placeholder="optional"
          />
        </div>
        <div class="flex ai-c jc-c">
          <label for="city">City</label>
          <input
            class="city input-block"
            type="text"
            id="city"
            v-model="S_info.city"
          />
          <label for="Sstate">State</label>
          <input
            class="st input-block"
            type="text"
            id="SBstate"
            v-model="S_info.state"
          />
          <label for="zipcode">Zip code</label>
          <input
            class="city input-block"
            type="text"
            id="zipcode"
            v-model="S_info.zipcode"
          />
        </div>
      </div>
    </form>
    <form class="flex col ai-c" action="">
      <h2>Billing Information</h2>
      <div class="flex ai-c">
        <button @click.prevent="copyAddress" :class="getCheckStyle"></button>
        <p>Use shipping address</p>
      </div>
      <div class="flex col">
        <div class="flex ai-c jc-c">
          <label for="Baddress">Address line 1</label>
          <input
            class="addy input-block"
            type="text"
            id="Baddress"
            v-model="B_info.address"
          />
        </div>
        <div class="flex ai-c jc-c">
          <label for="Baddress2">Address line 2</label>
          <input
            class="addy"
            type="text"
            id="Baddress2"
            v-model="B_info.address2"
            placeholder="optional"
          />
        </div>
        <div class="flex ai-c jc-c">
          <label for="Bcity">City</label>
          <input
            class="city input-block"
            type="text"
            id="Bcity"
            v-model="B_info.city"
          />
          <label for="Bstate">State</label>
          <input
            class="st input-block"
            type="text"
            id="Bstate"
            v-model="B_info.state"
          />
          <label for="Bzipcode">Zip code</label>
          <input
            class="city input-block"
            type="text"
            id="Bzipcode"
            v-model="B_info.zipcode"
          />
        </div>
        <div class="flex ai-c jc-c">
          <label for="card">Card number</label>
          <input
            class="input-block"
            type="text"
            id="card"
            v-model="B_info.cardNum"
          />
        </div>
        <div class="flex ai-c jc-c">
          <label for="exp">Expiration date</label>
          <input
            class="input-block city"
            type="text"
            id="exp"
            v-model="B_info.exp"
          />
          <label for="ccv">CCV</label>
          <input
            class="st input-block"
            type="text"
            id="ccv"
            v-model="B_info.ccv"
          />
        </div>
      </div>
    </form>
    <button @click="handlePlace" class="save-btn">Place order</button>
  </div>
</template>
<script>
import states from "../assets/states.js";
const { v4: uuid } = require("uuid");

export default {
  data() {
    return {
      S_info: {
        address: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
      },
      B_info: {
        address: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        name: "",
        cardNum: "",
        exp: "",
        ccv: "",
      },
      states,
      checked: false,
      showMissing: false,
    };
  },
  computed: {
    getCheckStyle() {
      if (this.checked) {
        return "copy-btn checked";
      } else {
        return "copy-btn";
      }
    },
    missingStyle() {
      if (this.showMissing) {
        return "show";
      } else {
        return "";
      }
    },
  },
  async mounted() {
    if (this.$store.state.isLoggedIn) {
      this.axios.post("api/getinfo").then((res) => {
        this.S_info = res.data.S_info;
        this.B_info = res.data.B_info;
      });
    }
  },
  methods: {
    copyAddress() {
      for (let item in this.S_info) {
        this.B_info[item] = this.S_info[item];
      }
    },
    handlePlace() {
      const inputs = Array.from(document.querySelectorAll(".input-block"));

      for (let i of inputs) {
        if (i.value === "") {
          this.showMissing = true;
          i.classList.add("missing");
        } else {
          i.classList.remove("missing");
        }
      }
      let isMissing = true;
      for (let i of inputs) {
        if (i.classList.contains("missing")) {
          isMissing = true;
          break;
        } else {
          isMissing = false;
        }
      }
      if (!isMissing) {
        this.$router.push({
          name: "CheckoutFour",
          params: {
            orderNum: uuid(),
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

form:nth-of-type(1) {
  margin-top: 6rem;
}
h2 {
  margin: 1rem 0;
  color: $s-color-text;
}
h3 {
  font-size: 1em;
  color: red;
  font-weight: 400;
  opacity: 0;
}
label {
  margin: 0.5rem;
  color: $s-color-text;
}
input {
  margin: 0.6rem 0.4rem;
  background-color: transparent;
  outline: none;
  border: 1px solid $p-color;
  border-radius: 4px;
  padding: 0.3rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}
select {
  width: 60px;
}
.form-container {
  height: 100vh;
  overflow-x: hidden;
}
.copy-btn {
  padding: 0.5rem;
  height: 40%;
  margin-right: 0.5rem;
}
button {
  @extend %btn;
  padding: 0.2rem 1rem;
}
.save-btn {
  margin: 1rem 0;
  padding: 0.2rem 1.3rem;
}
.checked {
  background-color: rgb(191, 231, 231) !important;
}
.st {
  width: 10%;
}
.city {
  width: 10%;
}
.addy {
  width: 50%;
}
.missing {
  border: 1px solid red !important;
}
.show {
  opacity: 1 !important;
}
@media (max-width: 360px) {
  h1 {
    font-size: 1.6em;
  }
  h2 {
    font-size: 1.2em;
  }
  .addy {
    width: 45%;
  }
  .city {
    width: 20%;
  }
  .st {
    width: 12%;
  }
}
</style>