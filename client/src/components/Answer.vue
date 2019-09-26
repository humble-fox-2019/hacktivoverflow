<template>
  <div class="mt-5" v-if="answer">
        <div class="row">
            <div class="col-1" style="display:flex; justify-content:center; align-items:center; flex-direction:column">
                <div class="row pb-3" @click.prevent="upVoteAnswer()"><i class="far fa-thumbs-up"></i></div>
                <div class="row">{{ answer.upVote.length - answer.downVote.length }}</div>
                <div class="row pt-3" @click.prevent="downVoteAnswer()"><i class="far fa-thumbs-down"></i></div>
            </div>
            <div class="col-11">
                <div class="title">{{ answer.title }}</div> <hr>
                <div class="description" v-html="answer.description"></div>
                <div class="footer">
                    <div class="username" v-if="isMine">Answered by : Me</div>
                    <div class="username" v-else>Answered by : {{ answer.userId.username }}</div>
                    <div>{{ date }}</div>
                </div>
                <div v-if="isMine"> 
                    <div style="margin-top: 20px;">
                        <button class="btn btn-delete" @click="deleteAnswer(`${answer._id}`)">delete</button>
                        <button class="btn btn-edit" @click="showEditAnswer()">edit</button> 
                    </div>
                    <div>
                        <b-modal size="lg" v-model="modalShow" @ok='editAnswer(`${ answer._id}`)' ok-only >
                            <form class="p-3" >
                                <h2>Edit Answer</h2>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Answer Title" v-model="title">
                                </div>
                                <div class="form-group">
                                    <wysiwyg v-model="description" style="width:100%"/>

                                    <!-- <textarea name="description" class="form-control" id="" cols="30" rows="10" v-model="description" placeholder="Your answer here.."></textarea> -->
                                    <!-- <input type="text" class="form-control" placeholder="Your answer here..." v-model="description"> -->
                                </div>
                            </form>
                        </b-modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2'
export default {
    name : "Answer",
    props : ['answerId'],
    data() {
        return {
            answer : null,
            modalShow : false,
            title : '',
            description : ''
        }
    },
    computed : {
        date() {
            let event = new Date(this.answer.createdAt);
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            return event.toLocaleString("en", options);
        },
        isMine() {
            return this.$store.state.user.username == this.answer.userId.username
        }
    },
    methods :{
        showEditAnswer() {
            this.modalShow = !this.modalShow
            if ( !this.modalShow ) return

            this.title = this.answer.title 
            this.description = this.answer.description
        },
        editAnswer( answerId ) {
            const token = localStorage.getItem('token')
            this.$store.dispatch('updateAnswer' , {
                answerId,
                title : this.title,
                description : this.description
            })
            .then( response => {
                Swal.fire( 'Update Success', '' , 'success' )
                this.fetchAnswer()
            })
            .catch( err =>{
                if ( err.response.data ) 
                    Swal.fire('Update Error', err.response.data , 'error')
                else 
                    console.log( err.resposne )
            })
        },
        fetchAnswer() {
            const token = localStorage.getItem('token')
            const answerId = this.answerId
            axiosInstance({
                url : `/answers/detail/${ answerId }`,
                method: "GET",
                headers : {
                    token
                }
            })
            .then( response => {
                this.answer = response.data
            })
            .catch( console.log )
        },
        upVoteAnswer(){
            const answerId = this.answerId;
            const token = localStorage.getItem('token')
            axiosInstance({
                url : `/answers/${ answerId }/up`,
                method : "PATCH",
                headers : { token }
            })
            .then( response => {
                this.fetchAnswer()
            })
            .catch( err => {
                if ( err.response.data )
                    Swal.fire('Error' , err.response.data , 'error')
                else console.log( err )
            })
        },
        downVoteAnswer(){
            const answerId = this.answerId;
            const token = localStorage.getItem('token')
            axiosInstance({
                url : `/answers/${ answerId }/down`,
                method : "PATCH",
                headers : { token }
            })
            .then( response => {
                this.fetchAnswer()
            })
            .catch( err => {
                if ( err.response.data )
                    Swal.fire('Error' , err.response.data , 'error')
                else console.log( err )
            })
        },
        deleteAnswer( answerId ) {
             Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if ( result.value ) {
                    const token = localStorage.getItem('token')
                    this.$store.dispatch('deleteAnswer', answerId)
                    .then( response => {
                        Swal.fire( 'Delete Success', '' , 'success' )
                        this.fetchAnswer()
                    })
                    .catch( err =>{
                        if ( err.response.data ) 
                            Swal.fire('Delete Error', err.response.data , 'error')
                        else 
                            console.log( err.resposne )
                    })
                }
            })
            
        }
    },
    created() {
        this.fetchAnswer()
    }
}
</script>

<style scoped>
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
    padding:10px 10px 20px 10px;
}
.description {
    padding: 20px;
}
.btn {
    padding: 5px 10px;
}
.btn-delete{
    margin-right: 20px;
    border-radius: 20px;
    background-color: red;
    color: white;
}
.btn-delete:hover {
    background-color: white;
    color :black;
}
.btn-edit {
    border-radius: 20px;
    background-color: darkblue;
    color:white;
}
.btn-edit:hover {
    background-color:cornsilk;
    color :black;
}
</style>