<template>
  <div class="flex col">
    <h1>Please log in</h1>
    <form action="" class="flex col ai-c">
      <label for="user">Username</label>
      <input type="text" id="user" v-model="username" />
      <label for="pass">Password</label>
      <input type="password" id="pass" v-model="password" />
      <div class="flex">
        <button @click.prevent="onSubmit">Log in</button>
        <button @click.prevent="onReg">Register</button>
      </div>
    </form>
    <h2>or</h2>
    <button @click="handleProceed">Proceed as guest</button>
  </div>
</template>
<script>
const Cookies = require("js-cookie");

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      const { username, password } = this;
      const res = await this.axios.post("api/login", {
        username,
        password,
      });
      if (res.data === "success") {
        //is successful set global state to true and goto home page

        this.checkIfCookie() ? this.mergeCart() : this.getCart();
        this.$store.commit("logIn");
        this.$router.push("/checkout/preview");
      } else {
        alert("wrong user or password");
      }
    },
    handleProceed() {
      this.$router.push("/checkout/preview");
    },
    checkIfCookie() {
      if (Cookies.get("tempCart")) {
        if (JSON.parse(Cookies.get("tempCart")).length > 0) {
          return true;
        }
      } else {
        return false;
      }
    },
    onReg() {
      this.$router.push("/register");
    },
    async mergeCart() {
      const curCart = JSON.parse(Cookies.get("tempCart"));
      await this.axios
        .post("api/addcookies", { cart: curCart })
        .then((res) => this.$store.commit("setCart", res.data));
    },
    async getCart() {
      this.axios.get("api/getcart").then((res) => {
        if (res.data.length > 0) {
          this.$store.commit("setCart", res.data);
        } else {
          this.$store.commit("setCart", []);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";
h1 {
  margin-top: 6rem;
}

form {
  margin: 2rem;
}
label {
  color: $s-color-text;
}
input {
  -webkit-appearance: none;
  margin: 0.6rem 0.4rem;
  background-color: transparent;
  outline: none;
  border: 1px solid $p-color;
  border-radius: 4px;
  padding: 0.3rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}
button {
  @extend %btn;
  padding: 0.3rem 0.4rem;
  margin: 1rem;
}
</style>