import Vue from 'vue'
import Vuex from 'vuex'
// import filter from './modules/filter'
// import thread from './modules/thread'
// import home from './modules/home'
import axios from './config/axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    threads: [],
    login: "",
    sort: ['Last Update', 'Title', 'Poster', 'Created Date'],
    order: ['Ascending', 'Descending'],
    currentThread: {}
  },
  mutations: {
    fillThreads(state, payload) {
      state.threads = []
      payload.forEach(el => state.threads.push(el))
      // console.log(state.threads);
    },
    clearThreads(state) {
      state.threads = []
    },
    generateThreadPage(state, payload) {
      state.currentThread = payload
    }
  },
  actions: {
    fetchThreads({ commit }) {
      axios.get('/threads/')
        .then(({ data }) => {
          commit('fillThreads', data)
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Error fetching data',
            text: err.response.message
          })
        })
    },
    fetchCurrentThread({ commit }, id) {
      axios.get(`/threads/${id}`)
        .then(({ data }) => {
          commit('generateThreadPage', data)
          return data
        }).catch(err => {
          swal.fire({
            type: 'error',
            title: 'Error fetching data',
            text: err.response.message
          })
        })
    }
  },
  getters: {
    getThreads(state) {
      return state.threads
    }
  }
})
