<template>
    <div v-if="question">
        <div class="card mt-4">
            <h1 class="header">Question</h1>
            <!-- <div class="row">
                <div class="col-1" style="display:flex; justify-content:center; align-items:center; flex-direction:column">
                    <div class="row pb-3 icon" @click.prevent="upVoteQuestion(`${ question._id }`)"><i class="far fa-thumbs-up"></i></div>
                    <div class="row">{{ question.upVote.length - question.downVote.length }}</div>
                    <div class="row pt-3 icon" @click.prevent="downVoteQuestion(`${ question._id }`)"><i class="far fa-thumbs-down"></i></div>
                </div>
                <div class="col-11">
                    <div class="title">{{ question.title }}</div> <hr>
                    <div class="description">{{ question.description }}</div>
                    <div class="footer">
                        <div class="username">Asked by : {{ question.userId.username }}</div>
                        <div>{{ date }}</div>
                    </div>
                </div>
            </div> -->
            <Question :question='question'></Question>
            <hr>
            <h1 class="header">Answer</h1>
            <div v-for="(answerId , index) in question.answers" :key="index">
                <Answer :answerId="answerId"></Answer>
            </div>
            
            
            <div class="mt-5" v-if="this.$store.state.isLogin">
                <form @submit.prevent="answerQuestion()">
                    <h3 style="font-size: 20px; color:black; text-align:center">Answer Here</h3>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Title" v-model="title">
                    </div>
                    <div class="form-group">
                        <wysiwyg v-model="description" />
                        <!-- <textarea name="description" class="form-control" id="" cols="30" rows="10" v-model="description" placeholder="Your answer here.."></textarea> -->
                        <!-- <input type="text" class="form-control" placeholder="Your answer here..." v-model="description"> -->
                    </div>
                    <div class="flex-right">
                        <button type="submit" class="btn">Submit Answer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2'

import Answer from '../components/Answer'
import Question from '../components/Question'
export default {
    name : "QuestionDetail",
    data () {
        return {
            question : null,
            title : "",
            description : ""
        }
    },
    components : {
        Answer,
        Question
    },
    computed : {
        date() {
            let event = new Date(this.question.createdAt);
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            return event.toLocaleString("en", options);
        }
    },
    watch : {
        question : function( val ){
            this.fetchDetail()
        }
    },
    methods : {
        upVoteQuestion( questionId ) {
            const token = localStorage.getItem('token')
            axiosInstance({
                method : "PATCH",
                url : `/questions/${ questionId }/up`,
                headers : {
                    token
                }
            })
            .then( response => {
                this.fetchDetail();
            })
            .catch( err => {
                Swal.fire('Error', err.response.data , 'error')
            })
        },
        downVoteQuestion( questionId ) {
            const token = localStorage.getItem('token')
            axiosInstance({
                method : "PATCH",
                url : `/questions/${ questionId }/down`,
                headers : {
                    token
                }
            })
            .then( response => {
                this.fetchDetail();
            })
            .catch( err => {
                Swal.fire('Error', err.response.data , 'error')
            })
        },
        answerQuestion() {
            const token = localStorage.getItem('token')
            axiosInstance({
                url : `/answers`,
                method : "POST",
                headers : {
                    token
                },
                data : { 
                    questionId : this.question._id,
                    title : this.title,
                    description : this.description
                }
            })
            .then( response => {
                this.title = ""
                this.description = ""
                this.fetchDetail()
            })
            .catch( err => {
                if ( err.response.data[0])
                    Swal.fire('Answer Error', err.response.data[0] , 'error')
                else 
                    console.log( err )
            } )
        },
        fetchDetail () {
            const questionId = this.$route.params.id
            axiosInstance({
                url : `/questions/detail/${ questionId }`,
                method : "GET"
            })
            .then( response => {
                this.question = response.data.question
            })
            .catch( console.log )
        }
    },
    created() {
        this.fetchDetail()
    }
}
</script>

<style scoped>
.bg {
    background-color: white;
}
.flex-right {
    display: flex;
    justify-content: flex-end;
}
.btn {
    background-color: rgb(63, 63, 63);
    border: none;
    border-radius: 20px;
    font-size: 12px;
    color: white;
}
.btn:hover{
    background-color: black;
    color: white;
}
.card {
  padding: 20px;
}
input[type='text'] {
    border-radius: 20px;
    outline: none;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.footer {
    margin-top:10px;
    font-size: 12px;
}
.username {
  font-size: 12px;
  color: black;
  font-weight: bold;
}
.icon:hover {
    color: black;
    font-weight: bolder;
}
.header { 
    color:black;
    font-size: 30px;
    padding:10px;
}
</style>