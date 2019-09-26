<template>
  <div class="mt-5">
    <div class="main-post container pt-5">
      <div>
        <h2 class>Post New Question</h2>
        <hr style="border: 1px solid #47bdfc;" />
      </div>
      <div class="d-flex justify-content-center mt-5">
        <form
          @submit.prevent="post()"
          style="width: 70%;"
          class="d-flex flex-column justify-content-center align-items-start"
        >
          <label class="lbl-up">Title</label>
          <input
            type="text"
            class="form-control up-input"
            autocomplete="off"
            placeholder="Input title"
            v-model="title"
            style="background-color: #e3e3e3; border: 0px;"
          />
          <label class="mt-2 lbl-up">Question</label>
          <input
            type="text"
            class="form-control up-input"
            autocomplete="off"
            placeholder="Input question"
            v-model="content"
            style="background-color: #e3e3e3; border: 0px;"
          />
          <label class="mt-2 lbl-up">Tag</label>
          <input
            type="text"
            class="form-control up-input"
            autocomplete="off"
            placeholder="Input tags"
            v-model="tags"
            style="background-color: #e3e3e3; border: 0px;"
          />
          <div class="mt-4 d-flex justify-content-center" style="width: 100%;">
            <button type="submit" class="btn reg-btn">Post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://35.240.133.37";
export default {
  data() {
    return {
      title: "",
      content: "",
      tags: ""
    };
  },
  methods: {
    post() {
      Swal.fire({ title: `Post Question..` });
      Swal.showLoading();
      const token = localStorage.getItem("token");
      const data = {
        title: this.title,
        content: this.content,
        tags: this.tags
      };
      axios({
        url: `${url}/questions`,
        method: `post`,
        headers: {
          token
        },
        data
      })
        .then(({ data }) => {
          this.title = "";
          this.content = "";
          this.tags = "";
          Swal.close();
          Swal.fire(`Success`, `Question posted`, `success`);
        })
        .catch(err => {
          Swal.close();
          Swal.fire(`Error`, err.response.data.message.join(", "), `error`);
        });
    }
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