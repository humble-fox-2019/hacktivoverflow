import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    questionList: [],
    token: false,
    user_login: ''
  },
  mutations: {
    setQuestionList (state, payload) {
      state.questionList = payload
    },
    setToken (state, payload) {
      state.token = payload
    },

    setUserLogin (state, payload) {
      state.user_login = payload
    },
    setErrorMessage (state, payload) {
      state.errorMessage = payload
    }
  },
  actions: {
    getAllQuestion (context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/question/`
      })
        .then(({ data }) => {
          context.commit('setQuestionList', data.questions)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    login (context, data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/user/login`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          let token = result.data.token
          let _id = result.data._id
          localStorage.setItem('token', token)
          localStorage.setItem('_id', _id)
          Swal.fire(result.data.message, '', 'success')
          context.commit('setToken', localStorage.token)
          context.commit('setUserLogin', result.data.email)
        })
        .catch((err) => {
          Swal.fire({ 
          title: 'Please login',
          text: err.response.data.message,
          type: 'error',
          confirmButtonText: 'Cool'})
        })
    },
    putToken (context) {
      if (localStorage.token) {
        let token = localStorage.token
        context.commit('setToken', token)
      }
    },
    removeToken (context) {
      context.commit('setToken', false)
    }
  }
})
