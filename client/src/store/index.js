import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import question from './modules/question'
import answer from './modules/answer'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, question, answer }
});
