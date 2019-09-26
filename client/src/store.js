import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        listQuestion : [],
        listQuestionTag : [],
        TagsCurrent : '',
        MostVotes : '',
        WatchedTag : []
    },
    mutations : {
        RENDERQUESTION (state , payload){
            state.listQuestion = payload
        },
        AFTERCREATE (state, payload){
            state.listQuestion.unshift(payload);
        },
        RENDERTAG (state,  payload){
            state.listQuestionTag = payload.data
            state.TagsCurrent = payload.tag
        },
        MOSTVOTES (state , payload){
            state.MostVotes = payload
        },
        RENDERWATCHEDTAG (state , payload){
            state.WatchedTag = payload
        },
        NEWTAG (state ,  payload){
            state.WatchedTag.push(payload)
        }
    },
    actions : {
        addQuestion ({state ,  dispatch , commit },payload){
            return new Promise((resolve, reject)=>{
                let {  hastagList ,  title , description } = payload
                axios({
                    method : 'POST',
                    url : 'http://34.87.7.44/question',
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                       tags : hastagList ,  title , description
                    }
                })
                .then(({data})=>{
                    // commit('AFTERCREATE', data)
                    resolve(data)
                    // console.log(data)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        },
        RenderQuestion ({state, dispatch,commit},payload){
            axios({
                method : 'GET',
                url : 'http://34.87.7.44/question',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                commit('RENDERQUESTION' , data)
                console.log(data)
            })
            .catch(console.log)
        },
        loginUser ({state} , payload){
            return new Promise((resolve, reject)=>{
                let {email , password} = payload
                // console.log(payload)
                axios.post('http://34.87.7.44/user/login',{
                    email , password
                })
                .then(({data})=>{
                    resolve(data)
                    // console.log(data ,  'di store')
                    localStorage.setItem('id' , data.user._id)
                    localStorage.setItem('token', data.token);
                })
                .catch(reject)
            })
        },
        registerUser ({state} , payload){
            return new Promise((resolve, reject)=>{
                let {email , password , username} = payload
                // console.log(payload)
                axios.post('http://34.87.7.44/user/register',{
                    email , password , username
                })
                .then(({data})=>{
                    resolve(data)
                })
                .catch(reject)
            })
        },
        addAnswer ({state,commit} , payload){
            return new Promise((resolve,reject)=>{
                let { title ,  question , description } = payload
                axios({
                    method : 'POST',
                    url : 'http://34.87.7.44/answer',
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        title ,  question2 : question  , description
                    }
                })
                .then(({data})=>{
                    resolve(data)
                    console.log(data)
                })
                .catch(reject)
            })
        },

        getAnswer ({commit , state},payload){
            axios({
                method : 'POST',
                url : 'http://34.87.7.44/answer/',
                headers : {
                    token : localStorage.getItem('token')
                },
                data : {
                    title ,  question2 : question  , description
                }
            })
            .then(({data})=>{
                // commit('RENDERQUESTION' , data)
                console.log(data)
            })
            .catch(console.log)
        },

        vote ({commit , state} , payload){
            return new Promise((resolve,reject)=>{
                axios({
                    method : 'PUT',
                    url : `http://34.87.7.44/vote/${payload.id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        num : payload.num
                    }
                })
                .then(({data})=>{
                    // commit('RENDERQUESTION' , data)
                    resolve('dsfdsf')
                    console.log(data)
                })
                .catch(reject)
            })
        },

        answerVote({} , payload){
            return new Promise((resolve,reject)=>{
                axios({
                    method : 'PUT',
                    url : `http://34.87.7.44/vote/${payload.id}/answer`,
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        num : payload.num
                    }
                })
                .then(({data})=>{
                    // commit('RENDERQUESTION' , data)
                    resolve('dsfdsf')
                    console.log(data)
                })
                .catch(reject)
            })
        },

        editQuestion ({dispatch} , payload){
            return new Promise((resolve,reject)=>{
                let {    title , description ,  id , hastagList } = payload
                axios({
                    method : 'PUT',
                    url : `http://34.87.7.44/question/${id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        title , description , tags : hastagList
                    }
                })
                .then(({data})=>{
                    return axios({
                        method : 'GET',
                        url : 'http://34.87.7.44/question',
                        headers : {
                            token : localStorage.getItem('token')
                        }
                    })
                })
                .then(({data})=>{
                    resolve('sukses')
                    commit('RENDERQUESTION' , data)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        },

        deleteQuestion ({dispatch,commit} , payload){
            return new Promise((resolve,reject)=>{
                let {   id } = payload
                axios({
                    method : 'DELETE',
                    url : `http://34.87.7.44/question/${id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=>{
                    return axios({
                        method : 'GET',
                        url : 'http://34.87.7.44/question',
                        headers : {
                            token : localStorage.getItem('token')
                        }
                    })
                })
                .then(({data})=>{
                    resolve('sukses')
                    commit('RENDERQUESTION' , data)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        },

        editAnswer ({commit } , payload){
            return new Promise((resolve,reject)=>{
                console.log(payload)
                let {title, description ,id } = payload
                axios({
                    method : 'PUT',
                    url : `http://34.87.7.44/answer/${id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        title , description
                    }
                })
                .then(({data})=>{
                    return axios({
                        method : 'GET',
                        url : 'http://34.87.7.44/question',
                        headers : {
                            token : localStorage.getItem('token')
                        }
                    })
                })
                .then(({data})=>{
                    resolve('sukses')
                    commit('RENDERQUESTION' , data)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        },

        searchTag ({commit ,  dispatch},payload){
            return new Promise((resolve,reject)=>{
                axios({
                    method : 'GET',
                    url : `http://34.87.7.44/question/searchtag?tag=${payload}`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=>{
                    commit('RENDERTAG' , {data : data.arr ,  tag : payload})
                    console.log(data.arr , ' search')
                    resolve(data.arr)
                })
                .catch(console.log)
            })
        },

        searchTag2 ({commit ,  dispatch , state} , payload){
            return new Promise((resolve,reject)=>{
                axios({
                    method : 'GET',
                    url : `http://34.87.7.44/question`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=>{
                    // console.log(data , ' <<<<')/
                    // let result = data.filter(el =>{
                    //     el.tags.filter(al=> al.name == payload )
                    // })
                    console.log(payload , ' ini payload YYa<<<<<')
                    let result = [];
                    data.forEach(el=>{
                        el.tags.forEach(al=>{
                            // console.log(al.name.split(' ') , ' yyypyppyp')
                            // console.log(al.name.split(' ')[0] == payload , ' tes')
                            if(al.name.split(' ')[0] == payload){
                                result.push(el)
                            }
                        })
                    })
                    commit('RENDERTAG' , {data : result ,  tag : payload})
                    // console.log(result , ' llllllLLLL<<<<L<L<L<L<L<L<L<L<')
                    resolve(result)
                })
                .catch(console.log)
            })
        },

        addWatchedTag({commit ,  state},payload){
            return new Promise((resolve,reject)=>{
                axios({
                    method : 'PATCH',
                    url : 'http://34.87.7.44/user/tag',
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : {
                        newTag : payload
                    }
                })
                .then(({data})=>{
                    resolve(data)
                    console.log(data)
                })
                .catch(reject)
            })
        },

        getWatchedTag({commit , state},payload){
            axios({
                method : 'GET',
                url : 'http://34.87.7.44/user/tag',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data , ' INI DATA !!!!')
                commit('RENDERWATCHEDTAG' ,  data)
            })
            .catch(console.log)
            // return new Promise((resolve,reject)=>{
            // })
        }
    }
})