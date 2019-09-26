<template>
  <div>
    <div class="content">
      <nav class="breadcrumb bg-white push">
        <a class="breadcrumb-item" href="#">Forum</a>
        <a class="breadcrumb-item" href="#">Question</a>
        <span class="breadcrumb-item active">{{question.title}}</span>
      </nav>
      <div class="block">
        <div class="block-header block-header-default">
          <h3 class="block-title">Question</h3>
        </div>
        <div class="block-content">
          <!-- Discussion -->
          <table class="table table-borderless">
            <tbody>
              <tr class="table-active">
                <td class="d-none d-sm-table-cell"></td>
                <td class="font-size-sm text-muted" style=" display:flex;">
                  <div style="display: flex; align-items: center">
                    <a href="#">{{question.userId.name}}</a>
                    <span class="mx-2">asked</span>
                    <em>{{getTimeAgo(question.createdAt)}}</em>
                  </div>
                  <div style="margin-left: auto" v-if="question.userId._id === user.id">
                    <router-link
                      class="btn btn-sm btn-primary"
                      :to="`/question/edit/${question._id}`"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link>
                    <button class="btn btn-sm btn-danger ml-1" @click="doDeleteQuestion()">
                      <i class="fas fa-eraser"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="d-none d-sm-table-cell text-center" style="width: 140px;">
                  <Vote
                    :token="token"
                    :upvotes="question.upvotes"
                    :downvotes="question.downvotes"
                    :actionId="question._id"
                    :upAction="doUpVoteQuestion"
                    :downAction="doDownVoteQuestion"
                    :removeAction="doRemoveVoteQuestion"
                  />

                  <small>
                    446 Reputation
                    <br />
                  </small>
                </td>
                <td>
                  <h2>{{question.title}}</h2>

                  <p v-html="question.content"></p>

                  <hr />
                  <router-link
                    v-for="(tag, index) in question.tags"
                    :key="index"
                    :to="`/tag/${tag}`"
                  >
                    <span class="badge badge-primary ml-1">{{tag}}</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- END Discussion -->
        </div>
      </div>

      <div class="block">
        <div class="block-header block-header-default">
          <h3 class="block-title">Answers</h3>
        </div>
        <div class="block-content">
          <!-- Discussion -->
          <table class="table table-borderless">
            <tbody>
              <template v-for="answer in question.answers">
                <tr class="table-active" id="forum-reply-form" :key="`headAnsware${answer._id}`">
                  <td class="d-none d-sm-table-cell"></td>
                  <td class="font-size-sm text-muted" style="display: flex">
                    <div style="display: flex; align-items: center">
                      <a href="#">{{answer.userId.name}}</a>
                      <span class="mx-2">answered</span>
                      <em>{{getTimeAgo(answer.createdAt)}}</em>
                    </div>
                    <div style="margin-left: auto" v-if="answer.userId._id === user.id">
                      <router-link
                        class="btn btn-sm btn-primary"
                        :to="`/answer/edit/${answer._id}`"
                      >
                        <i class="fas fa-edit"></i>
                      </router-link>

                      <button
                        class="btn btn-sm btn-danger ml-1"
                        @click="doDeleteAnswer(answer._id)"
                      >
                        <i class="fas fa-eraser"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr :key="`bodyAnsware${answer._id}`">
                  <td class="d-none d-sm-table-cell text-center" style="width: 140px;">
                    <Vote
                      :token="token"
                      :upvotes="answer.upvotes"
                      :downvotes="answer.downvotes"
                      :actionId="answer._id"
                      :upAction="doUpVoteAnswer"
                      :downAction="doDownVoteAnswer"
                      :removeAction="doRemoveVoteAnswer"
                    />

                    <small>
                      446 Reputation
                      <br />
                    </small>
                  </td>
                  <td>
                    <p v-html="answer.content"></p>
                    <hr />
                  </td>
                </tr>
              </template>

              <tr class="table-active" id="forum-reply-form">
                <td class="d-none d-sm-table-cell"></td>
                <td class="font-size-sm text-muted"></td>
              </tr>
              <tr v-if="token">
                <td class="d-none d-sm-table-cell text-center">
                  <div class="mb-10">
                    <a href="#">
                      <img
                        class="img-avatar"
                        src="https://icon-library.net/images/profile-image-icon/profile-image-icon-25.jpg"
                        alt
                      />
                    </a>
                  </div>
                  <small>240 Reputation</small>
                </td>
                <td>
                  <form v-on:submit.prevent="doAddAnsware">
                    <div class="form-group row">
                      <div class="col-12">
                        <quillEditor v-model="content"></quillEditor>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div class="form-group">
                      <button type="submit" class="btn btn-alt-primary">
                        <i class="fas fa-forward"></i> Reply
                      </button>
                    </div>
                  </form>
                </td>
              </tr>

              <tr v-else>
                <td colspan="2">
                  <h4>
                    You must login first to leave a comment.
                    <router-link to="/login">login</router-link>
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- END Discussion -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import moment from "moment";

import Vote from "@/components/Vote.vue";
import axios from "@/apis/axios";
import errorHandling from "@/helpers/errorHandling";
import Toast from "@/helpers/toast";
import Swal from "sweetalert2";

export default {
  name: "detailquestion",
  data() {
    return {
      content: ""
    };
  },
  created() {
    this.FETCH_QUESTION(this.$route.params.id)
      .then(({ data }) => {
        this.$store.commit("SET_QUESTION", data);
      })
      .catch(err => {});
  },
  components: {
    quillEditor,
    Vote
  },
  computed: {
    ...mapState(["question", "token", "user"])
  },
  methods: {
    ...mapActions(["FETCH_QUESTION"]),
    getTimeAgo: date => {
      return moment(date, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).fromNow();
    },
    doUpVoteQuestion(questionId) {
      axios({
        url: "/questions/upvote/" + questionId,
        method: "put",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doDownVoteQuestion(questionId) {
      axios({
        url: "/questions/downvote/" + questionId,
        method: "put",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doRemoveVoteQuestion(questionId) {
      axios({
        url: "/questions/removevote/" + questionId,
        method: "put",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doUpVoteAnswer(answerId) {
      axios({
        url: "/answers/upvote/" + answerId,
        method: "put",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doDownVoteAnswer(answerId) {
      axios({
        url: "/answers/downvote/" + answerId,
        method: "put",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doRemoveVoteAnswer(answerId) {
      axios({
        url: "/answers/removevote/" + answerId,
        method: "put",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doAddAnsware() {
      axios({
        url: "/answers",
        method: "post",
        data: {
          content: this.content,
          questionId: this.$route.params.id
        },
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: data.message
          });

          this.content = "";

          this.FETCH_QUESTION(this.$route.params.id)
            .then(({ data }) => {
              this.$store.commit("SET_QUESTION", data);
            })
            .catch(err => {});
        })
        .catch(errorHandling);
    },
    doDeleteQuestion() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            url: "/questions/" + this.$route.params.id,
            method: "delete",
            headers: {
              token: this.token
            }
          })
            .then(result => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              this.$router.push("/");
            })
            .catch(errorHandling);
        }
      });
    },
    doDeleteAnswer(answerId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            url: "/answers/" + answerId,
            method: "delete",
            headers: {
              token: this.token
            }
          })
            .then(result => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              this.FETCH_QUESTION(this.$route.params.id)
                .then(({ data }) => {
                  this.$store.commit("SET_QUESTION", data);
                })
                .catch(err => {});
            })
            .catch(errorHandling);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.quill-editor,
.quill-code {
  height: 10rem;
}
.quill-editor {
  border: 1px solid #ccc;
  border-bottom: none;
}
.quill-code {
  border: none;
  height: auto;
  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0;
  }
}
</style>