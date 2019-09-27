<template>
  <div id="app">
    <div class="top-header">
      <Header></Header>
    </div>
    <div class="main-content">
      <div>
        <router-view/>
      </div>
    </div>
    <Loading v-if="$store.state.isLoading"></Loading>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    Header,
    Loading
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.dispatch('getUserData')
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans:400,700,800&display=swap');
*{
  margin: 0;
  padding: 0;
  font-family: 'Work Sans', sans-serif;
}
body{
  background-color: #313236;
}
#app{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-content {
  flex-grow: 1;
  margin: 20px 0;
}
.main-content > div{
  max-width: 1000px;
  margin: auto;
  height: 100%;
  box-sizing: border-box;
}
</style>
