import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Questions from '@/views/Question.vue'
import Ask from '@/views/Ask.vue'
import QuestionDetail from '@/views/QuestionDetail.vue'
import AnswerEdit from '@/views/AnswerEdit.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/questions', name: 'questions', component: Questions, meta: { requiresAuth: true } },
    { path: '/questions/ask', name: 'ask', component: Ask, meta: { requiresAuth: true } },
    { path: '/questions/detail/:id', name: 'question-detail', component: QuestionDetail, meta: { requiresAuth: true } },
    { path: '/questions/edit/:id', name: 'question-edit', component: Ask, meta: { requiresAuth: true } },
    { path: '/answers/edit/:id', name: 'answer-edit', component: AnswerEdit, meta: { requiresAuth: true } },
    { path: '*', redirect: '/dashboard' }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.getters.isLogin) {
      next()
      return
    } else {
      if (Store.getters.isLogin) {
        next('/dashboard')
      }
    }
    // if (router.currentRoute.name !== 'login') next('/login')
  } else {
    next()
  }
})

export default router
