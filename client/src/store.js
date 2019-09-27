import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
import Swal from "sweetalert2";

// const SERVER = "http://35.247.133.81/";
const SERVER = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: {
      name: "",
      email: "",
      password: ""
    },
    formQuestion: {
      title: "",
      description: ""
    },
    formAnswer: {
      description: ""
    },
    allQuestions: [],
    myQuestions: [],
    questionDetail: {
      upvotes: [],
      downvotes: []
    },
    top: []
  },
  mutations: {
    updateUser(state, payload) {
      state.user = {
        ...state.user,
        ...payload
      };
    },
    updateFormQuestion(state, payload) {
      state.formQuestion = {
        ...state.formQuestion,
        ...payload
      };
    },
    setToken(state) {
      state.token = localStorage.getItem("token");
    },
    setAllQuestions(state, payload) {
      const newAllQuestions = payload.allQuestions;
      state.allQuestions = newAllQuestions;
    },
    setMyQuestions(state, payload) {
      const newMyQuestions = payload.myQuestions;
      state.myQuestions = newMyQuestions;
    },
    updateQuestionDetail(state, payload) {
      state.questionDetail = {
        ...state.questionDetail,
        ...payload
      };
    },
    updateFormAnswer(state, payload) {
      state.formAnswer = {
        ...state.formAnswer,
        ...payload
      };
    },
    setTop(state, newTop) {
      state.top = newTop;
    }
  },
  actions: {
    login({ commit, state }, payload) {
      axios({
        url: "/user/login",
        method: "post",
        baseURL: SERVER,
        data: {
          email: state.user.email,
          password: state.user.password
        }
      })
        .then(response => {
          let { data } = response;
          localStorage.setItem("token", data.token);
          commit("setToken");
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    register({ commit, state }, payload) {
      axios({
        url: "/user/register",
        method: "post",
        baseURL: SERVER,
        data: {
          name: state.user.name,
          email: state.user.email,
          password: state.user.password
        }
      })
        .then(response => {
          let { data } = response;
          localStorage.setItem("token", data.token);
          commit("setToken");
          Swal.fire({
            type: data.type,
            text: data.message
          });
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    logout({ commit }) {
      Swal.fire({
        text: "Are you sure to logout?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem("token");
          commit("setToken");
        }
      });
    },
    createQuestion({ commit, state }) {
      axios({
        url: "/question/create",
        method: "post",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          title: state.formQuestion.title,
          description: state.formQuestion.description
        }
      })
        .then(response => {
          let { data } = response;
          router.push("/question/my");
          Swal.fire({
            type: "success",
            text: "question submited"
          });
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    fetchAllQuestion({ commit, state }) {
      axios({
        url: "/question/all",
        method: "get",
        baseURL: SERVER
      })
        .then(response => {
          let { data } = response;
          commit("setAllQuestions", data);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    fetchMyQuestion({ commit, state }) {
      axios({
        url: "/question/my",
        method: "get",
        baseURL: SERVER,
        headers: {
          token: state.token
        }
      })
        .then(response => {
          let { data } = response;
          commit("setMyQuestions", data);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    getQuestionDetail({ commit, state }, payload) {
      axios({
        url: `/question/show/${payload}`,
        method: "get",
        baseURL: SERVER
      })
        .then(response => {
          let { data } = response;
          commit("updateQuestionDetail", data);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    addAnswer({ dispatch, commit, state }, payload) {
      Swal.fire({
        title: "process your answer",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        method: "post",
        url: "/answer/create",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          description: state.formAnswer.description,
          questionId: payload.questionId
        }
      })
        .then(({ data }) => {
          Swal.close();
          state.formAnswer.description = "";
          dispatch("getQuestionDetail", payload.questionId);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    upvoteQ({ dispatch, commit, state }, _id) {
      Swal.fire({
        title: "process your vote",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        url: "/question/upvote",
        method: "post",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          _id
        }
      })
        .then(({ data }) => {
          Swal.close();
          dispatch("getQuestionDetail", _id);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    downvoteQ({ dispatch, commit, state }, _id) {
      Swal.fire({
        title: "process your vote",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        url: "/question/downvote",
        method: "post",
        baseURL: SERVER,
        headers: {
          token: state.token
        },
        data: {
          _id
        }
      })
        .then(({ data }) => {
          Swal.close();
          dispatch("getQuestionDetail", _id);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    },
    getTop({ commit }) {
      axios({
        url: "/cron/top",
        method: "get",
        baseURL: SERVER
      })
        .then(({ data }) => {
          commit("setTop", data);
        })
        .catch(err => {
          Swal.fire({
            type: err.response.data.type,
            text: err.response.data.message
          });
        });
    }
  }
});
