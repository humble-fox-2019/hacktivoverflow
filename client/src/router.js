import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'question',
      component: () => import('./views/Questions.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/CreateQuestion.vue')
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('./views/EditQuestion.vue')
    },
    {
      path: '/question/:id',
      name: 'read',
      component: () => import('./views/Read.vue')
    },
    {
      path : '/changeAnswer/:id',
      name : 'edit-answer',
      component: () => import('./views/EditAnswer.vue')
    }
  ]
})
