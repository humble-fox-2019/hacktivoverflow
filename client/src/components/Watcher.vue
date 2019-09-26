<template>
  <div
    class="btn tag-btn mr-1 d-flex align-items-center justify-content-center p-1"
    @click.prevent="searchTag(tag)"
  >
    <h6 class="m-0 mr-2">{{tag}}</h6>
    <i class="fas fa-times-circle" @click.prevent="removeTag(tag)"></i>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://35.240.133.37";
export default {
  props: ["tag"],
  methods: {
    searchTag(tag) {
      this.$store.dispatch("searchTag", tag);
    },
    removeTag(tag) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/users/remove`,
        method: "patch",
        headers: {
          token
        },
        data: {
          tag
        }
      })
        .then(({ data }) => {
          this.$emit("getTag");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.main-card {
  border: 1px solid;
}
.tag-btn {
  border: 3px solid whitesmoke;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
  transition: 0.5s all;
}
.tag-btn:hover {
  transition: 0.5s all;
  background-color: whitesmoke;
  color: #47bdfc;
}
</style>