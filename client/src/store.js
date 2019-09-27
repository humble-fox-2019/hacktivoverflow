import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const server_url = "http://13.250.110.115"

export default new Vuex.Store({
  state: {
    isLogin: false,
    allQuestions: [],
    userTags: [],
    selectedTag :"",
    userQuestions: [],
    questionDetail: {
      UserId: {},
      answers: [],
      tags: [],
      downvotes: [],
      upvotes: []
    },
    userAnswers: [],
    textSearch:""
  },
  mutations: {

    LOGIN_STATUS(state, payload) {
      state.isLogin = payload
    },
    ALL_QUESTIONS(state, payload) {
      state.allQuestions = payload
    },
    USER_TAGS(state, payload) {
      state.userTags = payload
    },
    USER_QUESTIONS(state, payload) {
      state.userQuestions = payload
    },
    QUESTION_DETAIL(state, payload) {
      state.questionDetail = payload
    },
    USER_ANSWERS(state, payload) {
      state.userAnswers = payload
    },
    SEARCH_QUESTION(state, payload){
      state.textSearch = payload
    },
    SELECTED_TAG(state, payload){
      state.selectedTag = payload
    }
  },
  actions: {

    login({ commit, dispatch }, payload) {

      return new Promise((resolve, reject) => {
        axios({
          url: `${server_url}/users/login`,
          method: "POST",
          data: payload
        })
          .then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.username)
            commit("LOGIN_STATUS", true)
            commit("USER_TAGS", response.data.tags)
            resolve("success")
          })
          .catch(err => {
            // console.log(err.response.data)
            reject(err)
          })
      })
    },
    register({ commit }, payload) {

      return new Promise((resolve, reject) => {
        axios({
          url: `${server_url}/users/register`,
          method: "POST",
          data: payload
        })
          .then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.username)
            // commit("ALL_SHITS", motor)
            commit("LOGIN_STATUS", true)
            commit("USER_TAGS", response.data.tags)
            resolve("success")
          })
          .catch(err => {
            // console.log(err.response.data)
            reject(err)
          })
      })
    },
    getAllquestions({ commit }) {

      let token = localStorage.getItem("token")

      axios({
        url: `${server_url}/questions`,
        method: "GET",
        headers: { token }
      })
        .then(response => {
          console.log(response.data)
          commit("ALL_QUESTIONS", response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    createQuestion({ dispatch }, payload) {

      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token")
        axios({
          url: `${server_url}/questions`,
          method: "POST",
          headers: { token },
          data: payload
        })
          .then(response => {
            console.log(response.data)
            resolve("success")
            dispatch("getAllquestions")
          })
          .catch(err => {
            // console.log(err.response.data)
            reject(err)
          })
      })
    },
    addTags({ commit, dispatch }, payload) {

      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token")
        axios({
          url: `${server_url}/users/update`,
          method: "PATCH",
          headers: { token },
          data: payload
        })
          .then(response => {
            console.log(response.data)
            dispatch("getTags")
            resolve("success")
          })
          .catch(err => {
            console.log(err.response.data)
            reject(err)
          })
      })
    },
    getTags({ commit }) {

      let token = localStorage.getItem("token")

      axios({
        url: `${server_url}/users/data`,
        method: "GET",
        headers: { token }
      })
        .then(response => {
          commit("USER_TAGS", response.data.tags)
          // resolve("success")
        })
        .catch(err => {
          console.log(err)
          // reject(err)
        })
    },
    getUserQuestions({ commit }) {
      let token = localStorage.getItem("token")

      axios({
        url: `${server_url}/questions/user`,
        method: "GET",
        headers: { token }
      })
        .then(response => {
          console.log(response.data)
          commit("USER_QUESTIONS", response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    editQuestions({ dispatch }, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token")

        let id = payload.id
        let updatedData = {
          title: payload.title,
          description: payload.description,
          tags: payload.tags
        }
        axios({
          url: `${server_url}/questions/${id}`,
          method: "PATCH",
          headers: { token },
          data: updatedData
        })
          .then(response => {
            console.log(response.data)
            dispatch("getUserQuestions")
            resolve("success")
          })
          .catch(err => {
            console.log(err.response.data)
            reject(err)
          })
      })
    },
    deleteQuestion({ dispatch }, payload) {

      Vue.swal.showLoading()
      let token = localStorage.getItem("token")
      axios({
        url: `${server_url}/questions/${payload}`,
        method: "DELETE",
        headers: { token }
      })
        .then(response => {
          console.log(response.data)
          Vue.swal.close()
          Vue.swal.fire({
            type: "success",
            title: "Successfully delete question"
          })
          dispatch("getUserQuestions")
        })
        .catch(err => {
          Vue.swal.close()
          let message = err.response.data && err.response.data.message || "failed to delete question"
          Vue.swal.fire({
            type: "error",
            title: "failed to delete question",
            text: message
          })
          console.log()
        })
    },
    getOneQuestion({ commit, dispatch }, payload) {

      let id = payload
      let token = localStorage.getItem("token")
      axios({
        url: `${server_url}/questions/${id}`,
        method: "GET",
        headers: { token }
      })
        .then(response => {
          console.log(response.data)
          commit("QUESTION_DETAIL", response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    createAnswer({ dispatch }, payload) {

      return new Promise((resolve, reject) => {

        let token = localStorage.getItem('token')
        let QuestionId = payload.QuestionId
        axios({
          url: `${server_url}/answers`,
          method: "POST",
          headers: { token },
          data: payload
        })
          .then(response => {
            console.log(response.data)
            dispatch("getOneQuestion", QuestionId)
            resolve("success")
          })
          .catch(err => {
            console.log(err.response.data)
            reject(err)
          })
      })
    },
    upvote({ dispatch }, payload) {
      Vue.swal.showLoading()
      let token = localStorage.getItem("token")
      let { id, routes } = payload
      let updatedData = { id }
      let QuestionId = ""

      if (routes === "questions") {
        QuestionId = id
      }
      else {
        QuestionId = payload.QuestionId
      }
      axios({
        url: `${server_url}/${routes}/upvote`,
        method: 'POST',
        headers: { token },
        data: updatedData
      })
        .then(response => {
          // console.log(response.data)
          dispatch("getOneQuestion", QuestionId)
          Vue.swal.close()
          Vue.swal.fire({
            type: "success",
            title: "successfully upvote"
          })
        })
        .catch(err => {
          let message = err.response.data && err.response.data.message || "failed to upvote"
          Vue.swal.close()
          Vue.swal.fire({
            type: "error",
            title: "failed to upvote question",
            text: message
          })
        })

    },
    downvote({ dispatch }, payload) {

      Vue.swal.showLoading()
      let token = localStorage.getItem("token")
      let { id, routes } = payload
      let updatedData = { id }
      let QuestionId = ""

      if (routes === "questions") {
        QuestionId = id
      }
      else {
        QuestionId = payload.QuestionId
      }

      axios({
        url: `${server_url}/${routes}/downvote`,
        method: 'POST',
        headers: { token },
        data: updatedData
      })
        .then(response => {
          dispatch("getOneQuestion", QuestionId)
          console.log(response.data)
          Vue.swal.close()
          Vue.swal.fire({
            type: "success",
            title: "successfully downvote"
          })
        })
        .catch(err => {
          let message = err.response.data && err.response.data.message || "failed to downvote"
          Vue.swal.close()
          Vue.swal.fire({
            type: "error",
            title: "failed to downvote question",
            text: message
          })
        })
    },
    getUserAnswers({ commit }) {

      let token = localStorage.getItem("token")

      axios({
        url: `${server_url}/answers`,
        method: "GET",
        headers: { token }
      })
        .then(response => {
          // console.log(response.data)
          commit("USER_ANSWERS", response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    editAnswers({ dispatch }, payload) {

      return new Promise((resolve, reject) => {

        let token = localStorage.getItem("token")
        let id = payload.id
        let updatedData = {
          title: payload.title,
          description: payload.description
        }
        axios({
          url: `${server_url}/answers/${id}`,
          method: "PATCH",
          headers: { token },
          data: updatedData
        })
          .then(response => {
            dispatch("getUserAnswers")
            resolve("success")
            // console.log(response.data)
          })
          .catch(err => {
            // console.log(err.response.data)
            reject(err)
          })
      })

    },
    deleteAnswer({ dispatch }, payload) {

      let id = payload.id
      let QuestionId = payload.QuestionId
      Vue.swal.showLoading()
      let token = localStorage.getItem("token")
      axios({
        url: `${server_url}/answers/${id}`,
        method: "DELETE",
        headers: { token },
        data : {QuestionId}
      })
        .then(response => {
          console.log(response.data)
          Vue.swal.close()
          Vue.swal.fire({
            type: "success",
            title: "Successfully delete Answer"
          })
          dispatch("getUserAnswers")
        })
        .catch(err => {
          Vue.swal.close()
          let message = err.response.data && err.response.data.message || "failed to delete answer"
          Vue.swal.fire({
            type: "error",
            title: "failed to delete answer",
            text: message
          })
          // console.log()
        })
    }
  }
})
