<template>
  <div class="mt-5">
    <div class="main-post container pt-5">
      <div>
        <h2 class>My Question</h2>
        <hr style="border: 1px solid #47bdfc;" />
      </div>
      <!-- <div class="d-flex justify-content-center mt-5"></div> -->
      <Card v-for="question in $store.state.questions" :key="question._id" :question="question"></Card>
    </div>
  </div>    
</template>

<script>
import Card from "../components/MyCard";
export default {
  data() {
    return {};
  },
  components: {
    Card
  },
  created() {
    this.$store.dispatch("fetchQuestion");
  }
};
</script>

<style scoped>
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
.main-post {
  min-height: 100vh;
  background-color: whitesmoke;
}
h2,
.lbl-up {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: #47bdfc;
}
.up-input:focus {
  color: #47bdfc;
  font-weight: bolder;
}
.up-input:hover {
  color: #47bdfc;
  font-weight: bolder;
}
.up-input {
  color: #47bdfc;
  font-weight: bolder;
}
</style>