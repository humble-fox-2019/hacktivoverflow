<template>
  <div id="app">
    <div
      id="page-container"
      class="enable-page-overlay side-scroll main-content-boxed side-trans-enabled page-header-fixed"
    >
      <Navigation />

      <main id="main-container">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "app",
  components: {
    Navigation
  },
  created() {
    if(localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      let userData = JSON.parse(localStorage.getItem('userData'));
      
      this.$store.commit('SET_TOKEN', token);
      this.$store.commit('SET_USER', userData);
    }
  }
};
</script>


<style>
</style>
