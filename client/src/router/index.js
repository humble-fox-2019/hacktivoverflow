import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Questions from '@/views/Question.vue'
import Ask from '@/views/Ask.vue'
import QuestionDetail from '@/views/QuestionDetail.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/questions', name: 'questions', component: Questions, },
    { path: '/questions/ask', name: 'ask', component: Ask },
    { path: '/questions/detail/:id', name: 'question-detail', component: QuestionDetail },
    { path: '/questions/edit/:id', name: 'question-edit', component: Ask }
  ],
});

export default router
