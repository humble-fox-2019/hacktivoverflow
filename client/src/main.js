import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store'
 
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

Vue.use(BootstrapVue)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
