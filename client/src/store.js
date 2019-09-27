import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : 'Anonymous',
    isLoggedIn : false,
    query : "",
    searchResults : []
  },
  mutations: {
    setQuery : function (state,query) {
      state.query = query
    },
    getQuery : function (state){
      return state.query
    },
    getQuestions : function (state){
      return state.questions
    },
    setSearchResults : function (state, results){
      state.searchResults = results
    },
    logout : function (state){
      state.isLoggedIn = false
      state.searchResults = []
      localStorage.clear('token')
      state.user = 'Anonymous'
    },
    login : function (state,username){
      state.isLoggedIn = true
      state.user = username
    }
  },
  actions: {
    getIn : function (context,packet) {
      console.log(packet)
      axios({
        method : 'POST',
        url : 'http://localhost:3000/user/log',
        data : {
          username : packet.username,
          email : packet.email,
          password : packet.password
        }
      })
      .then(({ data })=>{
          localStorage.setItem('token',data.token)
          context.commit('login',data.username)
          console.log('logged-in')
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    displayQuestions : function (context) {
      let match = []
      for (let i = 0; i < context.state.questions.length; i++) {
        if (context.state.questions[i].title.toUpperCase().includes(context.state.query.toUpperCase())){
          match.push(context.state.questions[i])
        }
      }
      context.commit('setSearchResults', match) 
    },
    getQuestions : function (context) {
      axios({
        method : 'GET',
        url : `http://localhost:3000/questions/search?q=${context.state.query}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        context.commit('setSearchResults', data.questions)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getQuestion : function (context, id) {
      return axios({
        method : 'GET',
        url : `http://localhost:3000/questions/question/${id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
    },
    getAnswers : function (context, id) {
      return axios({
        method : 'GET',
        url : `http://localhost:3000/answers/search?qid=${id}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
    },
    /* getImprovements : function (context, id) {
      return axios({
        method : 'GET',
        url : `http://localhost:3000/improvements?aId=${id}`
      })
    }, */
    submitAnswer : function (context, packet) {
      return axios({
        method : 'POST',
        url : `http://localhost:3000/answers`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
            qId : packet.qId,
            description : packet.description
        }
      })
    },
    submitQuestion : function (context, packet) {
      return axios({
        method : 'POST',
        url : `http://localhost:3000/questions`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
            title : packet.title,
            description : packet.description,
        }
      })
    },
    updateVote : function (context, packet) {
      return axios({
        method : 'PATCH',
        url : `http://localhost:3000/${packet.voteOf}/${packet.voteOfSingular}/${packet.id}/vote`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
            [packet.voteType] : packet.value
        }
      })
    }
  }
})
