import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Account from './views/account.vue'
import Detail from './views/firstPage.vue'
import Ask from './views/secondPage.vue'
import Menu from './components/menu.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/questions/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/ask',
      name: 'ask',
      component: Ask
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    }
  ]
})
