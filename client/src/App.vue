<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/home/feeds");
    } else {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
#app {
  background-color: #47bdfc;
  min-height: 100vh;
  width: 100vw;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
