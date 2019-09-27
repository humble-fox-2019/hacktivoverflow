<template>
  <div class="main-card mt-4 rounded p-2">
    <div>
      <div>
        <div class="d-flex justify-content-between">
          <h5 class="m-0 p-1">{{question.title}}</h5>
          <h6 class="m-0 p-1">posted by : {{question.userId.email}}</h6>
        </div>
        <div class="d-flex justify-content-start align-items-center" v-if="question.tags[0] !== ''">
          <Tag v-for="(tag, index) in question.tags" :key="index" :tag="tag"></Tag>
        </div>
      </div>
      <hr style="border: 0.5px solid whitesmoke;" class="mt-1" />
    </div>
    <div style="height: 100px;" class="p-1 d-flex">
      <p>{{question.content}}</p>
    </div>
    <hr style="border: 0.5px solid whitesmoke;" class="mt-1" />
    <div class="d-flex justify-content-between align-items-center">
      <div class="vote d-flex justify-content-start align-items-center">
        <button class="btn" @click.prevent="vote(0,question._id)">
          <i class="fas fa-heart"></i>
          {{question.upvote.length}}
        </button>
        <button class="btn" @click.prevent="vote(1,question._id)">
          <i class="fas fa-heart-broken"></i>
          {{question.downvote.length}}
        </button>
      </div>
      <div class="d-flex justify-content-end align-items center">
        <button class="btn log-btn" @click.prevent="gotoDetail(question._id)">
          <i class="fas fa-glasses"></i> Readmore..
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "../components/Tag";
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://35.240.133.37";
export default {
  props: ["question"],
  components: {
    Tag
  },
  methods: {
    gotoDetail(id) {
      this.$router.push(`/home/${id}`);
    },
    vote(value, id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/questions/vote/${id}`,
        method: "patch",
        headers: {
          token
        },
        data: {
          value
        }
      })
        .then(({ data }) => {
          if (value === 0) {
            Swal.fire(`you liked this post`);
          } else {
            Swal.fire(`you disliked this post`);
          }
          this.$store.dispatch("fetchFeed");
          this.$store.dispatch("fetchQuestion");
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
  transition: 0.5s all;
  background-color: #47bdfc;
}
.main-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: 0.5s all;
}
h5,
h6,
p {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
}
.log-btn {
  width: 100%;
  border: 3px solid whitesmoke;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
  transition: 0.5s all;
}
.log-btn:hover {
  transition: 0.5s all;
  width: 100%;
  background-color: whitesmoke;
  color: #47bdfc;
}
button {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
}
p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* number of lines to show */
}
</style>