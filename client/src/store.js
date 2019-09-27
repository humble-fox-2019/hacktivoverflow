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

    deleteQuestion(context, payload) {
      axios({
          method: 'delete',
          url: `${cotext.state.baseUrl}/question/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
          context.dispatch('fetchQuestion')
        })
        .catch(err => {
          console.log(err, '<< error dari delete question storage ')
        })

    },
    upVoteQuestion(context, payload) {
      axios({
          method: 'post',
          url: `${context.state.baseUrl}/question/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data, 'Successfully upvote')
          context.dispatch('fetchOneQuestion', payload)
        })
        .catch(err => {
          console.log(err, '<< ini hasil dari err upvotequestionnya')
        })
    },
    downvoteQuestion(context, payload) {
      axios({
          method: 'post',
          url: `${context.state.baseUrl}/question/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          context.commit('fillQuestionForEdit', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    editPage(context, payload) {
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
          context.commit('fillQuestionForEdit', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateQuestion(context, payload) {

      axios({
          method: 'put',
          url: `${context.state.baseUrl}/question/${payload}`,
          data: {
            title: payload.question.title,
            content: payload.question.content
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data, '<< ini datanya dari updateQuestion di storage')
          context.dispatch('fetchQuestion')
        })
        .catch(err => {
          console.log(err, '<< errornya dari storage')
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
          context.dispatch('findAllAnswer', data.questionId)
        })
        .catch(err => {
          // console.log(err, '<<< INI DATANYA YG ERROR DI CREATE ANSWER ')
        })
    },

    findAllAnswer(context, payload) {
      axios({
          method: 'post',
          url: `${context.state.baseUrl}/amswer/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          context.commit('fillAnswers', data)
        })
        .catch(err => {
          console.log(err, '<< ini errornya dari findAllAnswer Storage')
        })
    },

    deleteAnswer(context, payload) {
      axios({
          method: 'delete',
          url: `${context.state.baseUrl}/answer/${payload.questionId}/${payload.answerId}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          context.dispatch('fetchAnswer', payload.questionId)
        })
        .catch(err => {
          console.log(err, '<< errornya dari delete answer')
        })
    }
  }
})