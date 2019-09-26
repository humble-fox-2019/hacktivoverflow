import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';
import axios from '@/apis/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: {},
    question: {},    
    questions: []
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    CLEAR_TOKEN: (state, payload) => {
      state.token = ""
    },
    SET_USER: (state, payload) => {
      state.user = payload
    },
    CLEAR_USER: (state, payload) => {
      state.user = {}
    },
    SET_QUESTIONS: (state, payload) => {
      state.questions = payload
    },
    SET_QUESTION: (state, payload) => {
      state.question = payload
    }
  },
  actions: {
    FETCH_QUESTION({ commit, state }, id) {
      axios({
        url: '/questions/' + id
      })
        .then(({ data }) => {
        commit('SET_QUESTION', data)
      })
      .catch(({ response }) => console.log(response))
    },
    FETCH_QUESTIONS({ commit, state }) {
      axios({
        url: '/questions',
        method: 'get'
      }).then(({data}) => {
        commit('SET_QUESTIONS', data);
        
      })
      .catch(({ response }) => console.log(response))
    }
  },
});
