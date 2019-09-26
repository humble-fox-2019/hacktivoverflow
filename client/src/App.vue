<template>

<v-app>
<div>
  <navbar v-if="$store.state.isLogin"></navbar>
  <router-view></router-view>
</div>

</v-app>

</template>

<script>

import navbar from "./components/navbar"
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    navbar
  },
  data(){
    return{
      
    }
  },
  created(){
    let token = localStorage.getItem("token")
    if (token){
      this.$store.commit("LOGIN_STATUS", true)
    }
    else{
      this.$router.push("/auth")
    }
  }
};
</script>
<style >
*{
  font-family: sans-serif
}
</style>
