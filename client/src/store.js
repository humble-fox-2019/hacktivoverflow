import Vue from 'vue'
import Vuex from 'vuex'
import axios from './api/server.js'
import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions : [],
    isLogin: false,
    isLoading: false,
    loadingText: '',
    user: {},
    title: 'Questions'
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions
    },
    pushQuestion(state, question) {
      state.questions.unshift(question)
    },
    setUser(state, user) {
      state.user = user
      state.isLogin = true
    },
    logout(state) {
      localStorage.clear()
      state.isLogin = false
      state.user = {}
    },
    setWatchTag(state, tags) {
      state.user.watchTags = tags
    }
  },
  actions: {
    getAllQuestion(context, payload) {
      context.state.isLoading = true
      context.state.loadingText = 'Fetching question'
      axios.get('/question')
        .then(({data}) => {
          context.commit('setQuestions', data.questions)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally( _ => {
          context.state.isLoading = false
          context.state.loadingText = ''
        })
    },
    searchByTitle(context, text) {
      context.state.isLoading = true
      context.state.loadingText = 'Fetching question'
      axios.get(`/question/search?q=${text}`)
        .then(({data}) => {
          context.commit('setQuestions', data.questions)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally( _ => {
          context.state.isLoading = false
          context.state.loadingText = ''
        })
    },
    getQuestionByTag(context, tag) {
      context.state.isLoading = true
      context.state.loadingText = 'Fetching question'
      axios.get(`/question/tag/${tag}`)
        .then(({data}) => {
          console.log(data)
          context.commit('setQuestions', data.questions)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally( _ => {
          context.state.isLoading = false
          context.state.loadingText = ''
        })
    },
    postQuestion(context, question) {

      context.state.isLoading = true
      context.state.loadingText = 'Post your question'

      axios.post('/question', question, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          context.commit('pushQuestion', data.question)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally( _ => {
          context.state.isLoading = false
          context.state.loadingText = ''
        })
    },
    signup(context, user) {

      context.state.isLoading = true
      context.state.loadingText = 'Creating your account'

      axios.post('/user/signup', user)
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        context.dispatch('getUserData')
        if(user.path) {
          router.push(user.path)
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally( _ => {
        context.state.isLoading = false
        context.state.loadingText = ''
      })
    },
    signin(context, user) {

      context.state.isLoading = true
      context.state.loadingText = 'Signin'

      axios.post('/user/signin', user)
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        context.dispatch('getUserData')
        if(user.path) {
          router.push(user.path)
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally( _ => {
        context.state.isLoading = false
        context.state.loadingText = ''
      })
    },
    getUserData(context) {
      axios.get('/user/get-user-data', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data)
        context.commit('setUser', data.user)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    addTag(context, tag) {
      axios.put('/user/add-tag', {
        tag: tag
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('setWatchTag', data.tags)
      })
    },
    removeTag(context, tag) {
      console.log(tag)
      axios.put('/user/remove-tag', {
        tag: tag
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('setWatchTag', data.tags)
      })
    }
  }
})
