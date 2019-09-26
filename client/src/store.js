import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : 9,
    isLoggedIn : true,
    questions : [
      {
        title : 'Why birds can fly?',
        description : "Whyyy??",
        upvotes : 0,
        downvotes : 1,
        answers : 5,
        tags : ['birds','error','nature','self-reading']
      },
      {
        title : 'Why this query returns error 404?',
        description : "I want to know",
        upvotes : 5,
        downvotes : 0,
        answers : 7,
        tags : ['computer','error','query','sql','stress']
      },
      {
        title : 'INVALID_PROCESS_DETACH_ATTEMPT???',
        description : "What is this?",
        upvotes : 1001,
        downvotes : 102,
        answers : 23,
        tags : ['error','bsod','computer']
      },
      {
        title : 'Language pack for Netbeans',
        description : "Any Indonesian language pack available for this program",
        upvotes : 9,
        downvotes : 0,
        answers : 3,
        tags : ['Netbeans','Java','language','Indonesian','language pack']
      }
    ],
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
      state.user = 'Anonymous'
    },
    login : function (state){
      state.isLoggedIn = true
      state.user = 9
    }
  },
  actions: {
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
        url : `http://localhost:3000/questions?title_like=${context.state.query}`
      })
      .then(({ data })=>{
        console.log(data)
        context.commit('setSearchResults', data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getQuestion : function (context, id) {
      return axios({
        method : 'GET',
        url : `http://localhost:3000/questions/${id}`
      })
    },
    getAnswers : function (context, id) {
      return axios({
        method : 'GET',
        url : `http://localhost:3000/answers?qId=${id}`
      })
    },
    getImprovements : function (context, id) {
      return axios({
        method : 'GET',
        url : `http://localhost:3000/improvements?aId=${id}`
      })
    },
    submitAnswer : function (context, packet) {
      return axios({
        method : 'POST',
        url : `http://localhost:3000/answers`,
        data : {
            id : packet.id,
            qId : packet.qId,
            description : packet.description,
            upvotes : 0,
            downvotes : 0,
            owner : packet.owner
        }
      })
    },
    submitQuestion : function (context, packet) {
      return axios({
        method : 'POST',
        url : `http://localhost:3000/questions`,
        data : {
            id : packet.id,
            title : packet.title,
            description : packet.description,
            upvotes : 0,
            downvotes : 0,
            answers : 0,
            owner : packet.owner,
            tags : []
        }
      })
    },
    updateVote : function (context, packet) {
      return axios({
        method : 'PATCH',
        url : `http://localhost:3000/${packet.voteOf}/${packet.id}`,
        data : {
            [packet.voteType] : packet.value
        }
      })
    }
  }
})
