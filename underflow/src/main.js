import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import wysiwyg from "vue-wysiwyg";

Vue.config.productionTip = false

Vue.use(wysiwyg, {
  bold: true,
  italic: true,
  underline: true,
  link: true,
  code: true,
  removeFormat: true,
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
