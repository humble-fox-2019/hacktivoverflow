import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sign',
      component: () => import(/* webpackChunkName: "sign" */ './views/Sign.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "sign" */ './views/Home.vue'),
      children: [
        {
          path: 'post',
          name: 'post',
          component: () => import(/* webpackChunkName: "post" */ './views/Post.vue'),
        },
        {
          path: 'feeds',
          name: 'feed',
          component: () => import(/* webpackChunkName: "feed" */ './views/Feed.vue'),
        },
        {
          path: 'questions',
          name: 'question',
          component: () => import(/* webpackChunkName: "question" */ './views/Question.vue'),
        },
        {
          path: ':id',
          name: 'detail',
          component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import(/* webpackChunkName: "edit" */ './views/Edit.vue'),
        },
      ]
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
