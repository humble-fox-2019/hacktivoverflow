<template>
  <div class="mt-5">
    <div class="main-post container pt-5">
      <div class="watcher p-2 rounded" style="background-color: #47bdfc;">
        <div>
          <form @submit.prevent="addWatcher()">
            <label>Add Watcher</label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Input Tag"
              v-model="watch"
            />
          </form>
        </div>
        <div class="mt-2">
          <Tag v-for="(tag, index) in watcher" :key="index" :tag="tag"></Tag>
        </div>
      </div>
      <div>
        <h2 class>Questions Feeds</h2>
        <hr style="border: 1px solid #47bdfc;" />
      </div>
      <!-- <div class="d-flex justify-content-center mt-5"></div> -->
      <Card v-for="question in $store.state.feeds" :key="question._id" :question="question"></Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Tag from "../components/Tag";
import Card from "../components/Card";
const url = "http://localhost:3000";
export default {
  data() {
    return {
      watch: "",
      watcher: []
    };
  },
  components: {
    Card,
    Tag
  },
  methods: {
    getWatcher() {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/users`,
        method: `get`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.watcher = data.watchers;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addWatcher() {
      const token = localStorage.getItem("token");
      const tag = this.watch;
      axios({
        url: `${url}/users/add`,
        method: `patch`,
        headers: {
          token
        },
        data: {
          tag
        }
      })
        .then(({ data }) => {
          this.watch = '';
          this.getWatcher();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getWatcher();
    this.$store.dispatch("fetchFeed");
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
label {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
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