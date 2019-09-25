<template>
  <v-app-bar app flat clipped-left dark>
    <v-app-bar-nav-icon @click.stop="toggle"></v-app-bar-nav-icon>
    <v-toolbar-title>Underflow</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-btn text height="100%" class="my-0">
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