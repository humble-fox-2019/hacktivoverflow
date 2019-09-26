import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from './router';

//const base_url = "http://localhost:3000"
const base_url = "http://3.15.232.156"

Vue.use(Vuex)
function swal(text) {
    Swal.fire({
        type: 'success',
        title: `${text}`,
        showConfirmButton: false,
        timer: 2000
    })
}
function swalerr(text, err) {
    Swal.fire({
        type: 'error',
        title: `${text}`,
        text: `${err}`,
        showConfirmButton: true
    })
}

export default new Vuex.Store({
    state: {
        isLogin: false,
        questions: [],
        oneQuestion: {},
    },
    mutations: {
        SETISLOGIN(state, payload) {
            state.isLogin = payload
        },
        SETQUESTION(state, payload) {
            state.questions = payload
        },
        SETONEQUESTION(state, payload) {
            state.oneQuestion = payload
        },
    },
    actions: {
        signIn({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${base_url}/user/signin`,
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(({ data }) => {
              console.log(data)
                //localStorage.setItem('id', data._id)
                localStorage.setItem('token', data.token)
                Swal.close()
                swal('Login Success')
                setTimeout(() => {
                    commit('SETISLOGIN', true)
                    router.push('/dashboard')
                }, 2000)
            })
            .catch(err => {
                swalerr('Login Fail', err.response.data.message)
            })
        },
        signUp ({ commit }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${base_url}/user/signup`,
                data: {
                    email: payload.email,
                    name: payload.name,
                    password: payload.password
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Register Success')
            })
            .catch(err => {
                console.log(err.response.data)
                let message = err.response.data.errArray.join("\n")
                swalerr('Register user fail', message)
            })
        },
        signOut ({ commit }, payload) {
            swal('Logout Success')
            setTimeout(() => {
                localStorage.clear()
                commit('SETISLOGIN', false)
                router.push('/')
            },2000)
        },
        fetchQuestion ({ commit }, payload) {
          let token = localStorage.getItem('token')
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'get',
                url: `${base_url}/question`,
                headers: {
                    token
                }
            })
            .then(({ data }) => {
                Swal.close()
                commit('SETQUESTION', data)
            })
            .catch(err => {
              swalerr('Fetch question failed', err.response.data.message)
            })
        },
        findOneQuestion ({ commit }, payload) {
            axios({
                method: 'get',
                url: `${base_url}/question/${payload}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                commit('SETONEQUESTION', data)
            })
            .catch(err => {
              swalerr('Find one question failed', err.response.data.message)
            })  
        },
        upvotes({commit, dispatch},payload){
          console.log("upvotes store")
          console.log(payload)
          let target = ""
          if(payload.target === "voteQuestion"){
            target = "question"
          } else {
            target = "answer"
          }
          axios({
            method: 'patch',
            url: `${base_url}/${target}/upvote/${payload.id}`,
            headers:{
              token: localStorage.token
            }
          }).then(({data})=>{
            let id = ''
            if(payload.target === "voteQuestion"){
              id = data._id
            } else {
              id = data.questionId
            }
            dispatch('findOneQuestion', id)
          }).catch(err=>{
            console.log(err.response)
            swalerr('Upvote failed', err.response.data.message)
          })
        },
        downvotes({commit, dispatch},payload){
          console.log('downvotes store')
          let target = ""
          if(payload.target === "voteQuestion"){
            target = "question"
          } else {
            target = "answer"
          }
          console.log(target)
          axios({
            method: 'patch',
            url: `${base_url}/${target}/downvote/${payload.id}`,
            headers:{
              token: localStorage.token
            }
          }).then(({data})=>{
            let id = ''
            if(payload.target === "voteQuestion"){
              id = data._id
            } else {
              id = data.questionId
            }
            dispatch('findOneQuestion', id)
          }).catch(err=>{
            swalerr('Downvote failed', err.response.data.message)
          })
        },
        createAnswer ({ commit, dispatch }, payload) {
            console.log(payload, "ini di createanswer")
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${base_url}/answer`,
                data: {
                    description: payload.description,
                    questionId: payload.questionId
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Successfully create answer')
                dispatch('findOneQuestion', data._id)
            })
            .catch(err => {
                swalerr('Created Answer failed', err.response.data.message)
            })
        },
        userQuestion ({ commit,dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'get',
                url: `${base_url}/question/mine`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
              console.log(data)
                Swal.close()
                commit('SETQUESTION', data)
            })
            .catch(err => {
              swalerr('Fail go to your question', err.response.data.message)
            })
        },
        deleteUserQuestion ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'delete',
                url: `${base_url}/question/${payload}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Succes delete question')
                dispatch('userQuestion')
                // setTimeout(() => {
                  
                // }, 2000)
            })
            .catch(err => {
              swalerr('Fail delete question', err.response.data.message)
            })
        },
        editQuestion ({ commit, dispatch }, payload) {
          //console.log(localStorage.token)
            Swal.fire({
                title: 'please wait a mniute..'
            })
            Swal.showLoading()
            axios({
                method: 'patch',
                url: `${base_url}/question/${payload.id}`,
                data: {
                    title: payload.title,
                    description: payload.descriprion
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {

                Swal.close()
                swal('Sucess update question')
                    dispatch('userQuestion')
            })
            .catch(err => {
                swalerr('Fail update question', err.response.data.message)
            })
        },
        createQuestion ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${base_url}/question`,
                data: {
                    title: payload.title,
                    description: payload.description,
                    tags: payload.tags
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Sucessfully create Question')
                setTimeout(() => {
                    router.push('/user')
                }, 1700)
            })
            .catch(err => {
               swalerr('Failed create Question', err.response.data.message)
            })
        },
        editAnswer ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'put',
                url: `${base_url}/${payload.id}`,
                data: {
                    title: payload.title,
                    question: payload.question
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('succesfully update answer')
                setTimeout(() => {
                    dispatch('findOneQuestion', payload.question)
                    router.push(`/dashboard/${payload.question}`)
                }, 1700)
            })
            .catch(err => {
                swalerr('Failed update answer', err.response.data.message)
            })
        },
    }
})
