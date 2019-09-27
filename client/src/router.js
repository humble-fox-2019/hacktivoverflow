import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import answerpage from './views/answerPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/loginRegister',
      name: 'loginRegister  ',
      component: () => import( /* webpackChunkName: "loginRegister" */ './views/loginRegister.vue')

    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [, {
        path: 'all',
        name: 'allQuestions',
        component: () => import( /* webpackChunkName: "allQuestions" */ './views/questions.vue')

      }, {
        path: ':id',
        name: 'answerpage',
        component: () => import( /* webpackChunkName: "answerPage" */ './views/answerPage.vue')
      }]
    },

  ]
})