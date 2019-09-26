<template>
  <div class="menu">
    <h3>My Questions</h3>
    <h3 v-if="!this.$store.state.isLogin" @click="getLoginPage">Login</h3>
    <h3 v-else @click="getLogout">Logout</h3>
  </div>
</template>

<script>
export default {
  methods: {
    getLoginPage() {
      this.$router.push("/account");
      this.$store.commit("showMenu", false);
    },
    getLogout() {
      this.$store.dispatch("getLogout");
      this.$store.commit("showMenu", false);
    }
  }
};
</script>

<style scoped>
.menu {
  z-index: 100px;
  padding: 10px;
  right: 0;
  width: 330px;
  position: absolute;
  background-color: lightblue;
}
h3 {
  margin: 10px;
}
</style>