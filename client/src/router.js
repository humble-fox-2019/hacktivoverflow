import Vue from 'vue'
import Router from 'vue-router'
import UserQuestion from './views/UserQuestion.vue'
import Dashboard from './views/Dashboard.vue'
import LoginPage from './views/LoginPage'
import Detail from './views/Detail.vue'
import CreateQuestion from './views/CreateQuestion.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loginpage',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
    },
    {
        path: '/user',
        name: 'userQuestion',
        component: UserQuestion
    },{
        path: '/createquestion',
        name: 'createquestion',
        component: CreateQuestion
    }
  ]
})
