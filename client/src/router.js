import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuestionList from './views/QuestionList.vue'
import Login from './views/Login.vue'
import AskQuestion from './views/AskQuestion.vue'
import QuestionDetail from './components/QuestionDetail.vue'
import MyQuestion from './views/MyQuestion.vue'
import SearchResult from './views/SearchResult.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children : [
        {
            path : '/questions',
            name :'QuestionList',
            component : QuestionList
        },
        {
            path : '/ask',
            name : 'AskQuestion',
            component : AskQuestion
        },
        {
            path : '/questions/:id',
            name : 'QuestionDetail',
            component : QuestionDetail
        },
        {
            path : '/myQuestion',
            name : 'MyQuestion',
            component : MyQuestion
        },
        {
            path: '/search/:id',
            name : 'SearchResult',
            component : SearchResult
        }
      ]
    },
    {
      path : '/login',
      name : 'Login',
      component : Login
    }
  ]
})
