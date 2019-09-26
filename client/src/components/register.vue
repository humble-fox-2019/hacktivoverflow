<template>
  <div class="register">
    <form @submit.prevent="getRegister">
      <h3>Sign Up</h3>
      <div>
        <input type="text" placeholder="Name" v-model="name" />
      </div>
      <div>
        <input type="text" placeholder="Email" v-model="email" />
      </div>

      <div>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <input type="submit" value="Sign Up" />
      <p style="font-size: 10px;">
        Already have an Account? Sign In
        <a
          href="#"
          style="text-decoration: none; color: #187ECF"
          @click="showLogin"
        >here</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    getRegister() {
      this.$store.dispatch("getRegister", {
        email: this.email,
        name: this.name,
        password: this.password
      });
    },
    showLogin() {
      this.$emit("showLogin");
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
  font-size: 33px;
  font-weight: 600;
  line-height: 44px;
  color: #333;
}
.register {
  width: 500px;
  height: 500px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.register div {
  border: 1px solid #cfcfcf;
  margin-bottom: 20px;
  height: 40px;
  width: 400px;
  display: flex;
  align-items: center;
  padding: 10px;
}
input[type="text"],
input[type="password"] {
  width: 300px;
  height: 40px;
  font-size: 16px;
  border: none;
  padding-left: 5px;
  outline: none;
  background-color: transparent;
}
input[type="submit"] {
  background-color: black;
  border: none;
  margin-bottom: 10px;
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: white;
}
div .social {
  border: none;
  display: flex;
  flex-direction: column;
}
</style>