<template>
  <div id="app" class="flex">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
    <NavBar></NavBar>
    <div v-if="$router.currentRoute.name !== 'ask' && $router.currentRoute.name !== 'question-edit'">
      <SideBar v-if="isLogin"></SideBar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'

export default {
  components: { Loading, NavBar, SideBar },
  methods: {
    ...mapActions(['checkToken'])
  },
  computed: {
    ...mapGetters(['isLogin', 'isLoading'])
  },
  created() {
    this.checkToken()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap');

body {
  font-family: 'Avenir Next', 'Open Sans', sans-serif;
}
</style>
