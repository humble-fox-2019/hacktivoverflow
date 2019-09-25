import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    questionList : []
  },
  mutations: {
    setQuestionList(state, payload){
      state.questionList = payload;
    }
  },
  actions: {
    getAllQuestion (context, data) {
      axios({
        method: 'get',
        url: this.state.baseUrl + '/question/'
      })
        .then(({data}) => {
          console.log(data.questions);
          context.commit('setQuestionList', data.questions)
        })
        .catch(err =>{
          console.log(err.response.data);
        })
    }
  }
})
