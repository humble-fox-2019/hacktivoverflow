import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateQuestion from './views/CreateQuestion.vue'
import MyQuestion from './views/MyQuestion.vue'
import ShowQuestion from './views/ShowQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/question/create',
      name: 'CreateQuestion',
      component: CreateQuestion
    },
    {
      path: '/question/my',
      name: 'MyQuestion',
      component: MyQuestion
    },
    {
      path: '/question/:id',
      name: 'ShowQuestion',
      component: ShowQuestion
    }
  ]
})
