<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
    name : "App",
    components : {
        Navbar
    },
    created () {
      this.$store.dispatch('fetchAllQuestion')
      const token = localStorage.getItem('token')
      if ( token ) {
          let user = localStorage.getItem('user')
          this.$store.commit('setIsLogin' , true )
          this.$store.commit('setUser' , JSON.parse( user ))
      } else {
          this.$router.push('/questions')          
      }

    } 
}
</script>
<style>
* ,body {
    margin: 0;
    padding:0;
}
</style>
