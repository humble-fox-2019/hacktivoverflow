<template>
    <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/Navbar'
export default {
    data: function(){
        return {

        }
    },
    components: {
      navbar
    }
}
</script>

<style scoped>
  #app{
    font-family: Arial, Helvetica, sans-serif;
  }
</style>