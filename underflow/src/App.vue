<template>
  <v-app>
    <SideNav :drawer="drawer" />
    <NavBar @toggleDrawer="drawer = !drawer" />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideNav from "@/components/SideNav.vue";
export default {
  name: "App",
  components: {
    NavBar,
    SideNav
  },
  data: () => ({
    drawer: false
  })
};
</script>
