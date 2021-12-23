<template>
  <div class="flex col">
    <h1>Register new user</h1>
    <form action="" class="flex col ai-c reg-box">
      <label for="user">Username</label>
      <p class="utext"></p>
      <input type="text" id="user" v-model="username" />
      <label for="pass">Password</label>
      <input type="password" id="pass" v-model="password" />
      <label for="pass2">Retype Password</label>
      <input type="password" id="pass2" v-model="password2" />
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
      password2: "",
    };
  },
  methods: {
    async onSubmit() {
      const { username, password, password2 } = this;
      if (password === password2) {
        if (username && password) {
          const res = await this.axios.post(
            `${process.env.VUE_APP_API_ENDPOINT}/register`,
            {
              username,
              password,
            }
          );
          if (res.data === "success") {
            this.$router.push("/login");
          } else {
            this.showMissing("exists");
          }
        } else if (!username) {
          this.showMissing("noname");
        } else if (!password) {
          this.showMissing("nopass");
        }
      } else {
        this.showMissing("nomatch");
      }
    },
    showMissing(issue) {
      const pass = document.querySelector("#pass");
      const pass2 = document.querySelector("#pass2");
      const user = document.querySelector("#user");
      const utext = document.querySelector(".utext");
      const inputs = document.querySelector(".reg-box");

      for (let item of Array.from(inputs.children)) {
        item.classList.remove("missing", "show");
      }

      if (issue === "nomatch") {
        utext.innerText = "Passwords do not match!";
        pass.classList.add("missing");
        pass2.classList.add("missing");
        utext.classList.add("show");
      }
      if (issue === "exists") {
        utext.innerText = "Username already exists!";
        utext.classList.add("show");
        user.classList.add("missing");
      }
      if (issue === "noname") {
        utext.innerText = "Please enter a valid username!";
        utext.classList.add("show");
        user.classList.add("missing");
      }
      if (issue === "nopass") {
        utext.innerText = "Please enter a valid password!";
        pass.classList.add("missing");
        pass2.classList.add("missing");
        utext.classList.add("show");
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
p {
  color: red;
  display: none;
  font-size: 0.8em;
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
.show {
  display: block !important;
}
.missing {
  border: 1px solid red !important;
}
button {
  @extend %btn;
  padding: 0.4rem 0.8rem;
  margin: 1rem;
}
</style>