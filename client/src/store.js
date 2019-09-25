import Vue from 'vue'
import Vuex from 'vuex'
import axios from './configs/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},

  },
  mutations: {
    SIGNUP(state, data) {
      localStorage.setItem('token', data.token)
      state.auth = data
    },
    SIGNIN(state, data) {
      localStorage.setItem('token', data.token)
      state.auth = data
    }
  },
  actions: {
    signup({dispatch, commit}, payload) {
      return new Promise((res, rej) => {
        axios({
          url: '/users/signup',
          method: 'POST',
          data: payload
        })
        .then(({ data }) => {
          console.log(data)
          commit('SIGNUP', data)
          res('Signup success!')
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
            rej(err.response.data.errors)
          }      
        })
      })
    },

    signin({dispatch, commit}, payload) {
      return new Promise((res, rej) => {
        axios({
          url: '/users/signin',
          method: 'POST',
          data: payload
        })
        .then(({ data }) => {
          console.log(data)
          commit('SIGNIN', data)
          res('Signin success!')
        })
        .catch(err => {
          if (err.response) {
            rej(err.response.data.errors)
          }
        })
      })
    }
  }
})
