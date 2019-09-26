<template>
  <div class="mt-5 d-flex justify-content-center">
    <div class="main-post container pt-5">
      <div class="container" style="position: fixed;background-color: whitesmoke; width: 61%;">
        <div>
          <h2 class>{{question.title}}</h2>
          <h6 class="mt-3">Posted by : {{question.userId.email}}</h6>
          <hr style="border: 1px solid #47bdfc;" />
        </div>
        <div class="content p-3" style="height: 100%;">
          <p>{{question.content}}</p>
          <hr style="border: 1px solid #47bdfc;" />
          <div class="d-flex justify-content-between">
            <div class="vote d-flex justify-content-center align-items-center" style="width: 100%;">
              <button class="btn" @click.prevent="vote(0,question._id)">
                <i class="fas fa-heart"></i>
                {{question.upvote.length}}
              </button>
              <button class="btn" @click.prevent="vote(1,question._id)">
                <i class="fas fa-heart-broken"></i>
                {{question.downvote.length}}
              </button>
            </div>
          </div>
          <hr style="border: 1px solid #47bdfc;" />
          <h3>Answer</h3>
          <b-button v-b-modal.modal-center class="reg-btn">Add Answer</b-button>
          <b-modal id="modal-center" centered title="Add Answer" hide-footer="true">
            <form @submit.prevent="addAnswer()">
              <label>Title</label>
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                v-model="title"
                placeholder="Input Title"
              />
              <label class="mt-2">Answer</label>
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                v-model="content"
                placeholder="Input answer"
              />
              <button class="reg-btn btn mt-4">Post Answer</button>
            </form>
          </b-modal>
        </div>
      </div>
      <div class="answers" style="margin-top: 410px;">
        <div class="overflow-auto">
          <Card v-for="answer in $store.state.answers" :key="answer._id" :answer="answer"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/AnswerCard.vue";
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://localhost:3000";
export default {
  data() {
    return {
      question: {}
    };
  },
  components: {
    Card
  },
  methods: {
    addAnswer() {
      Swal.fire({
        title: `Posting Answer...`
      });
      Swal.showLoading();
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      const data = {
        title: this.title,
        content: this.content
      };
      axios({
        url: `${url}/answers/${id}`,
        method: "post",
        headers: {
          token
        },
        data
      })
        .then(({ data }) => {
          this.title = "";
          this.content = "";
          this.$store.dispatch("fetchAnswer", id);
          Swal.close();
          Swal.fire(`Success`, `Post answer success`, "success");
        })
        .catch(err => {
          Swal.close();
          Swal.fire(`Errors`, err.response.data.message.join(", "), "error");
        });
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
          this.getDetail(id);
          //   this.$router.push(`/home/${id}`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDetail(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/questions/${id}`,
        method: `get`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch("fetchAnswer", id);
    this.getDetail(id);
  }
};
</script>

<style scoped>
.list {
  overflow-x: none;
  overflow-y: auto;
}
.main-post {
  min-height: 100vh;
  background-color: whitesmoke;
}
h2,
h3,
h6,
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
button {
  transition: 0.5s all;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: #47bdfc;
}
button:hover {
  transition: 0.5s all;
}
.reg-btn {
  width: 100% !important;
  border: 3px solid hsl(201, 97%, 63%) !important;
  font-family: "Roboto", sans-serif !important;
  font-weight: bolder !important;
  color: #47bdfc !important;
  transition: 0.5s all !important;
}
.reg-btn:hover {
  transition: 0.5s all !important;
  width: 100% !important;
  background-color: #47bdfc !important;
  color: whitesmoke !important;
}
</style>