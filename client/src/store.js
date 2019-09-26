import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import {
//   stat
// } from 'fs';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    questions: [],
    findOne: []
  },
  mutations: {
    GET_QUESTIONS(state, payload) {
      state.questions = payload
      // console.log(state.questions)
    },
    GET_ONEQUESTION(state, payload) {
      state.findOne = payload
      // console.log(state.findOne, '<<< HASIL FIND ONE QUESTION')
    }

  },
  actions: {
    registerUser(
      context, payload) {

      return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: `${context.state.baseUrl}/user/register`,
            data: payload
          })
          .then(({
            data
          }) => {
            resolve('Congratulation Creating User Successful')
            localStorage.setItem('token', data.token)
          })
          .catch(({
            response
          }) => {
            reject(response.data.message)
          })
      })
    },

    loginUser(
      context, payload) {
      console.log(payload, '<<< ISI PAYLOADNYA')
      axios({
          method: 'post',
          url: `${context.state.baseUrl}/user/signIn`,
          data: payload
        })
        .then(({
          data
        }) => {
          // console.log(data.token, '<<< DATA TOKEN ')
          // resolve('berhasil login')
          localStorage.setItem('token', data.token)
        })
        .catch(err => {
          // console.log(err, 'DISINI ERRORNYA DARI STORE JS BAGIAN MAINTENANCE')
        })
    },

    createQuestion(context, payload) {
      // console.log(payload, '<<< ISI PAYLOADNYA')
      axios({
          method: 'post',
          url: `${context.state.baseUrl}/question`,
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data, 'alhamdulillah berhasil di create')
        })
        .catch(err => {
          // console.log(err, 'ERRORNYA TERDAPAT DI BAGIAN CREATE QUESTION')
        })
    },

    fetchQuestion(context, payload) {

      axios({
          method: 'get',
          url: `${context.state.baseUrl}/question`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          context.commit('GET_QUESTIONS', data)
        })
        .catch(err => {
          // console.log(err, '<< INI ERRORNYA')
        })
    },
    fetchOneQuestion(context, payload) {
      // console.log('masuk ke bagian fetching one')
      axios({
          method: 'get',
          url: `${context.state.baseUrl}/question/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data, '<< BERHASIL MASUK KE BAGIAN DATANYA DISINI')
          context.commit('GET_ONEQUESTION', data)
        })
        .catch(err => {
          // console.log(err, '<< INI ERRORNYA')
        })
    },
    createAnswer(context, payload) {
      // console.log('berhasil masuk ke bagian create answer')
      // console.log(payload.content, '<<< DESIGN INI NYA')

      axios({
          method: 'post',
          url: `${context.state.baseUrl}/answer/${payload.questionId}`,
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log('masuuuuukkk ke berhasilaaan')
          // console.log(data, '<<< ini datanya masuk ke kirim')
        })
        .catch(err => {
          // console.log(err, '<<< INI DATANYA YG ERROR DI CREATE ANSWER ')
        })
    },

    findAllAnswer(context, payload) {

    }





  }
})