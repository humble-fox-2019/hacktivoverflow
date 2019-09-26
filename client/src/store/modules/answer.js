import myaxios from '@/configs/axios.js'
import router from '@/router'
import Vue from 'vue';

const state = {
  answer: {}
}

const mutations = {
  addToAnswer(state, payload) {
    state.answer = payload
  }
}

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
  fetchSingleAnswer({ commit }) {
    const answerId = router.currentRoute.params.id
    commit('loadingStart')

    return myaxios.get(`answers/${answerId}`)
      .then(({ data }) => {
        console.log(data.answer)
        commit('addToAnswer', data.answer)
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  },

  answerUp({ commit, dispatch }, payload) {
    commit('loadingStart')

    return myaxios.patch(`answers/${payload}/upvote`)
      .then(({ data }) => {
        console.log(data)
        Vue.$toast.info('Upvote success')
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
        Vue.$toast.info('Downvote success')
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

  editAnswer({ commit, state }, payload) {
    const answerId = router.currentRoute.params.id

    commit('loadingStart')

    return myaxios.patch(`answers/${answerId}`, payload)
      .then(({ data }) => {
        console.log(data)
        Vue.$toast.info('Answer succesfully edited')
        commit('addToAnswer', data.answer)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        Vue.$toast.info('Answer succesfully updated!')
        commit('loadingFinished')
        router.push('/questions/detail/' + state.answer.questionId)
      })
  },

  deleteAnswer({ commit, dispatch }, payload) {
    commit('loadingStart')

    return myaxios.delete(`answers/${payload}`)
      .then(({ data }) => {
        console.log(data)
        Vue.$toast.info('Answer succesfully deleted')
        dispatch('fetchSingleQuestion')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        commit('loadingFinished')
      })
  }
}

const getters = {
  answer: state => state.answer
}

export default { state, mutations, actions, getters }
