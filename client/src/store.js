import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from './api/axios';
import Swal from 'sweetalert2'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
      isLogin : false,
      allQuestion : [],
      myQuestion : [],
      user : null,
      searchQuestions : []
    },
    mutations: {
        setIsLogin( state , status ) {
            state.isLogin = status;
        },
        setAllQuestion ( state , questions ) {
            state.allQuestion = questions
        },
        setMyQuestion ( state , questions ) {
            state.myQuestion = questions;
        },
        setUser( state, user ) {
            state.user = user
        },
        setUserTag ( state, tags ) {
            state.user.tags = tags
        },
        setSearchQuestion( state, questions ) {
            state.searchQuestions = questions
        }
    },
    actions: {
        login({ commit , state } , payload ){
            return axiosInstance({
                method: 'POST',
                url : "/login",
                data : payload
            })
        },
        register({ commit , state } , payload ) {
            return axiosInstance({
                method:"POST",
                url : "/register",
                data : payload 
            })
        },
        fetchAllQuestion ({ commit , state }) {
            axiosInstance({
                method :"GET",
                url :"/questions"
            })
            .then( response => {
                commit('setAllQuestion' , response.data )
            })
            .catch( console.log )
        },
        fetchMyQuestion({ commit , state}) {
            const token = localStorage.getItem('token')
            axiosInstance({
                method: "GET",
                url : "/questions/user",
                headers : {
                    token
                }
            })
            .then( response => {
                commit('setMyQuestion' , response.data.questions )
            })
            .catch( console.log )
        },
        addQuestion({ commit , state }, payload ) {
            const token = localStorage.getItem('token');
            return axiosInstance({
                method:"POST",
                url : "/questions",
                headers : {
                    token
                },
                data : payload
            })
            
        },
        deleteQuestion ({ commit , state } , questionId ) {
            const token = localStorage.getItem('token')
            return axiosInstance({
                url : `/questions/${ questionId }`,
                method:"DELETE",
                headers : {
                    token
                }
            })
        },
        editQuestion({ commit , state } , payload ) {
            const token = localStorage.getItem('token')
            return axiosInstance({
                url : `/questions/${ payload.questionId }`,
                method:"PUT",
                headers : {
                    token
                },
                data : {
                    title : payload.title,
                    description : payload.description,
                    tags : payload.tags
                }
            })
        },
        updateAnswer({ commit , state } , { answerId , title ,description }) {
            const token = localStorage.getItem('token');
            return axiosInstance({
                url : `/answers/${ answerId }`,
                method: "PUT",
                headers : { token },
                data : {
                    title,
                    description
                }
            })
        },
        deleteAnswer({ commit , state }, answerId ) {
            const token = localStorage.getItem('token');
            return axiosInstance({
                url : `/answers/${ answerId }`,
                method: "DELETE",
                headers : {
                    token
                }
            })
        },
        updateUserTag({ commit , state }, tags ) {
            const token = localStorage.getItem('token')
            return axiosInstance({
                url : `/tags`,
                method: "PATCH",
                headers: { 
                    token 
                },
                data : { 
                    tags 
                }
            })
        },
        fetchUserTag({ commit , state }) {
            const token = localStorage.getItem('token');
            return axiosInstance({
                url : `/tags`,
                method : "GET",
                headers : {
                    token
                }
            })
        },
        fetchSearchQuestion({ commit ,state } , keyword ) {
            return axiosInstance({
                method:"GET",
                url : `/questions?search=${ keyword }`
            })
        }
    }
})
