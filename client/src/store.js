import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let baseUrlServer = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    isLogin: false,
    menuShow: false,
    allQuestions: [],
    detailQuestion: {
      _id: "",
      title: "",
      description: "",
      answer: [],
      upvote: [],
      downvote: []
    },
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
          router.push('/')

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
          router.push('/')
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
      Swal.fire("Success!", "Logged Out Success!", "success")
    },
    getAllQuestion(context) {
      Axios({
        method: `get`,
        url: `${baseUrlServer}/questions`
      })
        .then(({ data }) => {
          context.commit('setAllQuestions', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    postQuest(context) {
      let title = this.state.title
      let description = this.state.content
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
          router.push('/')
        })
        .catch(error => {
          console.log(error)
          let msg = error.response.data.message
          Swal.fire("Error!", msg, "error");
        })
    },
    questionUpvote(context, id) {
      Axios({
        method: `patch`,
        url: `${baseUrlServer}/questions/${id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          console.log(`upvote question success`)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          console.log(`upvote question error`)
        })
    },
    questionDownvote(context, id) {
      Axios({
        method: `patch`,
        url: `${baseUrlServer}/questions/${id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          console.log(`downvote question success`)
          router.push('/')


        })
        .catch(err => {
          console.log(err)
          console.log(`downvote question error`)
        })
    },
    answerUpvote(context, id) {
      Axios({
        method: `patch`,
        url: `${baseUrlServer}/answers/${id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    answerDownvote(context, id) {
      Axios({
        method: `patch`,
        url: `${baseUrlServer}/answers/${id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    questionById(content, payload) {
      Axios({
        method: `get`,
        url: `${baseUrlServer}/questions/${payload._id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.state.detailQuestion = data
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
})
