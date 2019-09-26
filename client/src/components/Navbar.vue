<template>
  <div class="d-flex justify-content-center rounded">
    <Nav class="shadow container" style="z-index: 1000; position:fixed">
      <div class="d-flex justify-content-between align-items-center p-3">
        <div class="logo">
          <img
            src="../assets/logo.png"
            alt="Fox-overlfow logo"
            style="background-color: whitesmoke"
          />
        </div>
        <div class="d-flex justify-content-end align-items-center" style="width: 60%">
          <button class="btn reg-btn mr-3" @click.prevent="gotopost()">Post Question</button>
          <button class="btn reg-btn mr-3" @click.prevent="gotofeed()">Feeds</button>
          <button class="btn reg-btn mr-3" @click.prevent="gotoquestion()">My Question</button>
          <button class="btn reg-btn" @click.prevent="logout()">Sign Out</button>
        </div>
      </div>
    </Nav>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://localhost:3000";
export default {
  methods: {
    logout() {
      Swal.fire({
        title: "Are you sure? to Sign Out",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to Sign Out!"
      }).then(result => {
        if (result.value) {
          localStorage.clear();
          this.$router.push("/");
        }
      });
    },
    gotopost() {
      this.$router.push("/home/post");
    },
    gotofeed() {
      this.$router.push("/home/feeds");
    },
    gotoquestion() {
      this.$router.push("/home/questions");
    }
  }
};
</script>

<style scoped>
nav {
  background-color: whitesmoke;
}
.reg-btn {
  width: 100%;
  border: 3px solid #47bdfc;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: #47bdfc;
  transition: 0.5s all;
}
.reg-btn:hover {
  transition: 0.5s all !important;
  width: 100% !important;
  background-color: #47bdfc !important;
  color: whitesmoke !important;
}
</style>