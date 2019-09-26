<template>
  <div id="app">
    <div id="nav">
      <div class="search">
        <router-link to="/">Logo</router-link>
        <input type="search" placeholder="search" />
      </div>
      <div class="question">
        <router-link to="/ask" style="font-size:20px">Ask Question</router-link>
        <i class="fas fa-ellipsis-v fa-2x" @click="showMenu"></i>
      </div>
    </div>
    <Menu v-if="this.$store.state.menuShow" />
    <router-view />
  </div>
</template>

<script>
import Menu from "./components/menu";
export default {
  components: {
    Menu
  },
  data: function() {
    return {};
  },
  methods: {
    showMenu() {
      if (this.$store.state.menuShow) {
        this.$store.commit("showMenu", false);
      } else {
        this.$store.commit("showMenu", true);
      }
    }
  },
  created() {
    this.$store.dispatch("getAllQuestion");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px 30px;
  height: 50px;
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.question {
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search {
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search input {
  width: 400px;
  height: 100%;
  padding: 5px;
}
</style>
