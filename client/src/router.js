import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'
import userQuestions from './views/userQuestions.vue'
import questionDetail from "./views/questionDetail.vue"
import userAnswers from "./views/userAnswers.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path : '/auth',
      name : 'LoginRegister',
      component : LoginRegister
    },
    {
      path : "/userquestions",
      name : 'userquestions',
      component : userQuestions
    },
    {
      path: '/userAnswers',
      name: 'userAnswers',
      component : userAnswers
    },
    {
      path : "/question/:id",
      name : "question detail",
      component : questionDetail
    }
  ]
})
