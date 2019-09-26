import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import wysiwyg from "vue-wysiwyg";
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.use(Vuesax)
Vue.use(wysiwyg, {
  hideModules: { "table": true, "image": true },
  maxHeight: "500px",
  forcePlainTextOnPaste: false
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
