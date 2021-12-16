<template>
  <div class="flex col">
    <h1>Register new user</h1>
    <form action="" class="flex col ai-c">
      <label for="user">Username</label>
      <input type="text" id="user" v-model="username" />
      <label for="pass">Password</label>
      <input type="password" id="pass" v-model="password" />
      <div class="flex">
        <button @click.prevent="onSubmit">Create new account</button>
      </div>
    </form>
  </div>
</template>
<script>
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
      const res = await this.axios.post("api/register", {
        username,
        password,
      });
      if (res.data === "success") {
        this.$router.push("/login");
      } else {
        alert("user already exists!!!!!");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/global.scss";

form {
  margin: 2rem;
}
h1 {
  margin-top: 6rem;
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
  padding: 0.4rem 0.8rem;
  margin: 1rem;
}
</style>