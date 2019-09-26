import myaxios from '@/configs/axios.js'
import router from '@/router'
import Vue from 'vue';

const state = {
  user: {},
  token: '',
  isLogin: false,
  isLoading: false,
}

const mutations = {
  loadingStart(state) {
    state.isLoading = true
  },

  loadingFinished(state) {
    state.isLoading = false
  },

  auth_success(state, payload) {
    state.user = payload.user
    state.token = payload.token
    state.isLogin = true
  },

  userSignOut(state) {
    localStorage.removeItem('token')
    delete myaxios.defaults.headers.token

    Vue.$toast.info(`Good bye, ${state.user.name}!`)

    state.user = ''
    state.token = ''
    state.isLogin = false

    router.push('/login')
  }
}

const actions = {
  userSignUp({ commit }, payload) {
    commit('loadingStart')

    return myaxios.post('/users/register', payload)
      .then(({ data }) => {
        const { user, token } = data

        localStorage.setItem('token', token)
        myaxios.defaults.headers.token = token
        commit('auth_success', { user, token })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        commit('loadingFinished')
        router.push('/dashboard')
        Vue.$toast.info(`Nice to meet you, ${state.user.name}!`)
      })
  },

  userSignIn({ commit, state }, payload) {
    commit('loadingStart')

    return myaxios.post('/users/login', payload)
      .then(({ data }) => {
        const { user, token } = data

        localStorage.setItem('token', token)
        myaxios.defaults.headers.token = token
        commit('auth_success', { user, token })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        commit('loadingFinished')
        router.push('/dashboard')
        Vue.$toast.info(`Welcome ${state.user.name}!`)
      })
  },

  checkToken({ commit }) {
    const token = localStorage.getItem('token')
    myaxios.defaults.headers.token = token

    if (token) {
      commit('loadingStart')

      return myaxios.get('/users')
        .then(({ data }) => {
          commit('auth_success', { user: data, token })
          // router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
          console.log(err.response.data)
        })
        .finally(() => {
          commit('loadingFinished')
          Vue.$toast.info(`Welcome back, ${state.user.name}!`)
        })

    } else {
      router.push('/login')
    }
  }
}
const getters = {
  user: state => state.user,
  isLogin: state => !!state.token,
  isLoading: state => state.isLoading
}

export default { state, mutations, actions, getters }
