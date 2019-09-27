<template>
  <div class="account">
    <Register @showLogin="showLogin" v-if="registerbox" />
    <Login @showRegister="showRegister" v-if="loginbox" />
  </div>
</template>

<script>
import Register from "../components/register";
import Login from "../components/login";
export default {
  data: function() {
    return {
      registerbox: false,
      loginbox: true
    };
  },
  components: {
    Register,
    Login
  },
  methods: {
    showRegister() {
      this.registerbox = true;
      this.loginbox = false;
    },
    showLogin() {
      this.registerbox = false;
      this.loginbox = true;
    }
  }
};
</script>

<style>
</style>