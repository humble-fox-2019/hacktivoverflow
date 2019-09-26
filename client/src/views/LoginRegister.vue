<template>
  <div class="mx-auto mt-3" style="width:400px">
    <h3 class="text-center">X Overflow</h3>
    <v-img
      contain
      height="200px"
      src="https://steemitimages.com/DQmTBfXUeR8yWesm3GgNbo4qTwv8rUVu8Mwapjh4wxZHLrK/cool%20cube%20logo_00000.png"
    ></v-img>
    <form v-if="isLogin" @submit.prevent="login">
      <v-text-field v-model="formLogin.email" label="Email" required></v-text-field>
      <v-text-field v-model="formLogin.password" label="password" type="password" required></v-text-field>

      <div class="text-center">
        <v-btn color="#FFB300" class="mr-4" type="submit">submit</v-btn>
        <v-btn color="#FFB300" @click="clear">clear</v-btn>
      </div>
      <p class="text-center mt-3">Dont have an account please register below</p>
      <div class="mt-3 text-center">
        <v-btn color="#FFB300" @click="showRegisterForm">register here</v-btn>
      </div>
    </form>

    <form v-if="!isLogin" @submit.prevent="register">
      <v-text-field v-model="formRegister.username" label="Username" required></v-text-field>
      <v-text-field v-model="formRegister.email" label="Email" required></v-text-field>
      <v-text-field v-model="formRegister.password" label="Password" type="password" required></v-text-field>

      <div class="text-center">
        <v-btn color="#FFB300" class="mr-4" type="submit">submit</v-btn>
        <v-btn color="#FFB300" @click="clear">clear</v-btn>
      </div>
      <p class="text-center mt-3">Already have an account login below</p>
      <div class="mt-2 text-center">
        <v-btn color="#FFB300" @click="showLoginForm">Login here</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: ""
      },
      formRegister: {
        email: "",
        username: "",
        password: ""
      },
      isLogin: true
    };
  },
  methods: {
    clear() {
      this.formLogin.email = "";
      this.formLogin.password = "";
    },
    showRegisterForm() {
      this.isLogin = false;
    },
    showLoginForm() {
      this.isLogin = true;
    },
    register() {
      this.$store
        .dispatch("register", this.formRegister)
        .then(success => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    login() {
      //   console.log(this.formLogin);
      this.$store
        .dispatch("login", this.formLogin)
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  created() {
    let token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
