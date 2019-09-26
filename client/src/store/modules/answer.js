import myaxios from '@/configs/axios.js'
import router from '@/router'
import Vue from 'vue';

const state = {}

const mutations = {}

const actions = {
  // createAnswer({ commit }, payload) {
  //   const questionId = router.currentRoute.params.id
  //   commit('loadingStart')

  //   return myaxios.post('/answers')
  //     .then(({ data }) => {
  //       console.log(data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //     .finally(() => {
  //       commit('loadingFinished')
  //     })
  // }

  answerUp({ commit, dispatch }, payload) {
    commit('loadingStart')

    return myaxios.patch(`answers/${payload}/upvote`)
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

  answerDown({ commit, dispatch }, payload) {
    commit('loadingStart')

    return myaxios.patch(`answers/${payload}/downvote`)
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

  deleteAnswer({ commit, dispatch }, payload) {
    commit('loadingStart')

    return myaxios.delete(`answers/${payload}`)
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
  }
}

const getters = {}

export default { state, mutations, actions, getters }
