<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon @click.stop="toggle"></v-app-bar-nav-icon>
    <v-toolbar-title>Hacktiv Overflow</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-btn outlined>
      <v-img></v-img>Profile
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$emit("toggleDrawer");
    }
  }
};
</script>

<style>
</style>