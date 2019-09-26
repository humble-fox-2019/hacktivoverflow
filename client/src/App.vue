<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Navbar></Navbar>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  created() {
    this.$store.dispatch('checkLogin')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap');
#app {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  /* color: #2c3e50; */
}
#content {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
