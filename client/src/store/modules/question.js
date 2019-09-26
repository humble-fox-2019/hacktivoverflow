import myaxios from '@/configs/axios.js'
import router from '@/router'
import Vue from 'vue';

const state = {
  question: {},
  questions: []
}

const mutations = {
  addToQuestion(state, payload) {
    state.question = payload
  },

  addToQuestions(state, payload) {
    state.questions = payload
  },

  resetQuestion(state, payload) {
    state.question = ''
  }
}

const actions = {
  createQuestion({ commit }, payload) {
    return myaxios.post('questions', payload)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally(() => {
        commit('loadingFinished')
        Vue.$toast.info('Question succesfully created')
        router.push('/questions')
      })
  },

  fetchQuestions({ commit }) {
    commit('loadingStart')

    return myaxios.get('questions')
      .then(({ data }) => {
        commit('addToQuestions', data.questions)
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  },

  fetchSingleQuestion({ commit }) {
    const questionId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.get(`questions/${questionId}`)
      .then(({ data }) => {
        console.log(data.question.answers)
        commit('addToQuestion', data.question)
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  },

  addAnswer({ commit, dispatch }, payload) {
    const questionId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.patch(`questions/${questionId}/add-answer`, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch('fetchSingleQuestion')
        // commit('addToQuestion', data.question)
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  },

  questionUp({ commit, dispatch }) {
    const questionId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.patch(`questions/${questionId}/upvote`)
      .then(({ data }) => {
        console.log(data)
        dispatch('fetchSingleQuestion')
        // commit('addToQuestion', data.question)
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  },

  questionDown({ commit, dispatch }) {
    const questionId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.patch(`questions/${questionId}/downvote`)
      .then(({ data }) => {
        console.log(data)
        dispatch('fetchSingleQuestion')
        // commit('addToQuestion', data.question)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  },

  editQuestion({ commit, dispatch }, payload) {
    const questionId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.put(`questions/${questionId}`, payload)
      .then(({ data }) => {
        console.log(data)
        dispatch('fetchQuestions')
        // commit('addToQuestion', data.question)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        commit('loadingFinished')
        Vue.$toast.info('Question succesfully created')
        router.push('/questions')
      })
  },

  deleteQuestion({ commit, dispatch }) {
    const questionId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.delete(`questions/${questionId}`)
      .then(({ data }) => {
        console.log(data)
        dispatch('fetchQuestions')
        // commit('addToQuestion', data.question)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        commit('loadingFinished')
        Vue.$toast.info('Question succesfully deleted')
        router.push('/questions')
      })
  }
}

const getters = {
  question: state => state.question,
  questions: state => state.questions
}

export default { state, mutations, actions, getters }
