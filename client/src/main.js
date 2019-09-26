import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tw-output.css'

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/index.css'
Vue.use(VueToast)

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
Vue.use(VuejsDialog)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
