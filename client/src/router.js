import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

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
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/question/add',
      name: 'Addquestion',
      component: () => import('./views/Addquestion.vue'),
    },
    {
      path: '/question/edit/:id',
      name: 'Editquestion',
      component: () => import('./views/Editquestion.vue'),
    },
    {
      path: '/answer/edit/:id',
      name: 'Editanswer',
      component: () => import('./views/Editanswer.vue'),
    },
    {
      path: '/question/:id',
      name: 'Detailquestion',
      component: () => import('./views/Detailquestion.vue'),
    }
  ],
});
