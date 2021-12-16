<template>
  <div>
    <h1>Update Profile Information</h1>
    <div class="form-container">
      <form action="">
        <h2>Shipping Information</h2>
        <div class="flex col">
          <div class="flex ai-c jc-c">
            <label for="address">Address line 1</label>
            <input
              class="addy"
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
          <div class="flex ai-c jc-c citystate">
            <label for="city">City</label>
            <input class="city" type="text" id="city" v-model="S_info.city" />
            <label for="Sstate">State</label>
            <input class="st" type="text" id="SBstate" v-model="S_info.state" />
            <label for="zipcode">Zip code</label>
            <input
              class="city"
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
              class="addy"
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
          <div class="flex ai-c jc-c citystate">
            <label for="Bcity">City</label>
            <input class="city" type="text" id="Bcity" v-model="B_info.city" />
            <label for="Bstate">State</label>
            <input class="st" type="text" id="Bstate" v-model="B_info.state" />
            <label for="Bzipcode">Zip code</label>
            <input
              class="city"
              type="text"
              id="Bzipcode"
              v-model="B_info.zipcode"
            />
          </div>
          <div class="flex ai-c jc-c">
            <label for="card">Card number</label>
            <input type="text" id="card" v-model="B_info.cardNum" />
          </div>
          <div class="flex ai-c jc-c">
            <label for="exp">Expiration date</label>
            <input type="text" id="exp" v-model="B_info.exp" />
            <label for="ccv">CCV</label>
            <input class="st" type="text" id="ccv" v-model="B_info.ccv" />
          </div>
        </div>
      </form>
      <button @click="handleSave" class="save-btn">Save</button>
    </div>
  </div>
</template>
<script>
import states from "../assets/states.js";

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
    };
  },
  async mounted() {
    await this.axios.post("api/getinfo").then((res) => {
      this.S_info = res.data.S_info;
      this.B_info = res.data.B_info;
    });
  },
  computed: {
    getCheckStyle() {
      if (this.checked) {
        return "copy-btn checked";
      } else {
        return "copy-btn";
      }
    },
  },
  methods: {
    copyAddress() {
      if (!this.checked) {
        for (let item in this.S_info) {
          this.B_info[item] = this.S_info[item];
        }
      } else {
        for (let item in this.B_info) {
          this.B_info[item] = "";
        }
      }
      this.checked = !this.checked;
    },
    async handleSave() {
      this.$router.push("/");
      await this.axios.post("api/saveinfo", {
        userInfo: { S_info: this.S_info, B_info: this.B_info },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

h1 {
  margin-top: 5rem;
}
h2 {
  margin: 1rem 0;
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
  height: 80vh;
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