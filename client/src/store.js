import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let baseUrlServer = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    isLogin: false,
    menuShow: false,
    allQuestions: [],
    detailQuestion: {},
    content: "",
    title: ""
  },
  mutations: {
    showMenu(state, payload) {
      state.menuShow = payload
    },
    registerSuccess(state, payload) {
      state.isLogin = payload
    },
    LoginSuccess(state, payload) {
      state.isLogin = payload
    },
    LogoutSuccess(state, payload) {
      state.isLogin = payload
    },
    setAllQuestions(state, payload) {
      state.allQuestions = payload
    },
    setDetail(state, payload) {
      state.detailQuestion = payload
    },
    setContent(state, payload) {
      state.content = payload
    },
    setTitle(state, payload) {
      state.title = payload
    }
  },
  actions: {
    getRegister(context, payload) {
      let name = payload.name;
      let email = payload.email;
      let password = payload.password;
      Swal.fire({
        title: `Creating Your Account...`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrlServer}/users/register`,
        data: {
          name,
          email,
          password
        }
      })
        .then(({ data }) => {
          Swal.close();
          Swal.fire("Success!", "Your Account is Created!", "success");
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          context.commit('registerSuccess', true)
          this.$route.push('/')

        })
        .catch(error => {
          let msg = error.response.data.message || "Fail to Register";
          Swal.fire("Error!", msg, "error");
        })
    },
    getLogin(context, payload) {
      let email = payload.email;
      let password = payload.password;
      Swal.fire({
        title: `Loggin In ......`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();

      Axios({
        url: `${baseUrlServer}/users/login`,
        method: `post`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          context.commit('LoginSuccess', true)
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id)
          Swal.close();
          Swal.fire("Success!", data.message, "success");
        })
        .catch(error => {
          console.log(error)
          let msg = error.response.data.message || "Wrong Email/Password";
          Swal.fire("Error!", msg, "error");
        })
    },
    getLogout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      context.commit('LogoutSuccess', false)
      Swal.fire("Success!", "Logged Out Success!", "success");
    },
    getAllQuestion(context) {
      Axios({
        method: `get`,
        url: `${baseUrlServer}/questions`
      })
        .then(({ data }) => {
          context.commit('setAllQuestions', data)
          context.commit('setDetail', data[0])
        })
        .catch(error => {
          console.log(error)
        })
    },
    postQuest(context) {
      let title = state.title
      let description = state.content
      Swal.fire({
        title: `Creating Your Question...`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrlServer}/questions`,
        data: {
          title,
          description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close();
          Swal.fire("Success!", 'Create Question Success', "success");

        })
        .catch(error => {
          console.log(error)
          let msg = error.response.data.message
          Swal.fire("Error!", msg, "error");
        })
    }

  }
})
