import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuestionDetail from './views/QuestionDetail.vue'
import Ask from './views/Ask.vue'
import Account from './views/Account.vue'
import EditQuestion from './views/EditQuestion.vue'

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
      path: '/question/:id',
      name: 'questionDetail',
      component: QuestionDetail
    },
    {
      path: '/ask',
      name: 'AskQuestion',
      component: Ask
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/edit-question/:id',
      name: 'EditQuestion',
      component: EditQuestion
    }
  ]
})
