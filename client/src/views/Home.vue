<template>
  <div class="home">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import navbar from "../components/navbar";

export default {
  name: "home",
  components: {
    HelloWorld,
    navbar
  }
};
</script>
