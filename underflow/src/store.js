import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
import thread from './modules/thread'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    filter,
    thread
  }
})
