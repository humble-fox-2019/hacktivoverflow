<template>
<div class="bg">
    <div class="container">
      <div class="row" v-if="this.$store.state.isLogin">
        <div class="col-3">
          <SideBar></SideBar>
        </div>
        <div class="col-9" style="background-color : white;">
          <router-view style="color:#707885;"></router-view>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col" style="background-color : white;">
          <router-view style="color:#707885;"></router-view>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import SideBar from '../components/SideBar'
export default {
  name: 'home',
  components: {
    SideBar
  },
  created () {
   
  }
}
</script>

<style scoped>
.bg {
  background-color: rgb(214, 214, 214);
  min-height: 100vh;
}
</style>