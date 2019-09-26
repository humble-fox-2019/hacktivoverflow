import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue')
    },
    {
      path: '/ask',
      name: 'ask',
      component: () => import('./views/Ask.vue')
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import('./views/Comment.vue')
    }
  ]
})
