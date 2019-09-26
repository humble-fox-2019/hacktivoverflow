import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feeds: [],
    questions: [],
    answers: [],
  },
  mutations: {
    fetchAnswer(state, data) {
      state.answers = data;
    },
    fetchFeed(state, data) {
      state.feeds = data;
    },
    fetchQuestion(state, data) {
      state.questions = data;
    },
  },
  actions: {
    fetchAnswer(context, id) {
      const token = localStorage.getItem('token');
      axios({
        url: `${url}/answers/${id}`,
        method: 'get',
        headers: {
          token
        }
      })
        .then(({ data }) => {
          context.commit('fetchAnswer', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    searchTag(context, tag) {
      const token = localStorage.getItem('token');
      axios({
        url: `${url}/questions/tag?tag=${tag}`,
        method: `get`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          context.commit('fetchFeed', data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    fetchFeed(context) {
      const token = localStorage.getItem('token');
      axios({
        url: `${url}/questions`,
        method: 'get',
        headers: {
          token
        }
      })
        .then(({ data }) => {
          context.commit('fetchFeed', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    fetchQuestion(context) {
      const token = localStorage.getItem('token');
      axios({
        url: `${url}/questions/user`,
        method: 'get',
        headers: {
          token
        }
      })
        .then(({ data }) => {
          context.commit('fetchQuestion', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
  },
});
