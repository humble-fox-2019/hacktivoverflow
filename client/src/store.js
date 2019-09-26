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
      console.log(state.token, '<<<!')
    },

    setUserLogin (state, payload) {
      state.user_login = payload
    },
    setErrorMessage (state, payload) {
      // console.log(payload);
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
          console.log(data.questions)
          context.commit('setQuestionList', data.questions)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    login (context, data) {
      console.log('hereee')
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/user/login`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          console.log(result.data)
          let token = result.data.token
          let _id = result.data._id
          localStorage.setItem('token', token)
          localStorage.setItem('_id', _id)
          console.log('ini result login ===>', result)
          Swal.fire(result.data.message, '', 'success')
          context.commit('setToken', localStorage.token)
          // console.log(localStorage.getItem);
          context.commit('setUserLogin', result.data.email)
          // router.push('/about');
        })
        .catch((err) => {
          console.log(err)
          console.log('errrorrr')
          console.log(err.response)
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
    },
  }
})