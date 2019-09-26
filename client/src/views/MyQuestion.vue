<template>
    <div class="bg">
        <div class="header">
            <div>My Question</div>
            <div class="horizontal-line"></div>
        </div>
        <div v-for="question in this.$store.state.myQuestion" :key="question._id">
            <Question :question='question'>
                <div class="flex">
                    <div>
                        <button class="btn btn-delete" @click.prevent="deleteQuestion(`${question._id}`)">Delete</button>
                        <!-- <button class="btn btn-edit" @click.prevent="">Edit</button> -->
                        <b-button id="show-btn" style="background-color: darkblue; border-radius:20px;" @click="fetchOneQuestion(`${question._id}`)">Edit</b-button>
                        <div>
                            <b-modal v-model="modalShow" @ok='editQuestion(`${question._id}`)' ok-only>
                                <form class="p-3" >
                                    <h2>Edit Question</h2>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Question Title" v-model="title">
                                    </div>
                                    <div class="form-group">
                                        <wysiwyg v-model="description" />

                                        <!-- <textarea name="description" id="" cols="30" rows="10" class="form-control" v-model="description" placeholder="Your question here..."></textarea> -->
                                        <!-- <input type="text" class="form-control" placeholder="Your question here..." v-model="description"> -->
                                    </div>
                                    <div class="form-group">
                                        <vue-tags-input
                                        v-model="tag"
                                        :tags="tags"
                                        @tags-changed="newTags => tags = newTags"
                                        style="border-radius:20px;"
                                        />
                                    </div>
                                </form>
                            </b-modal>
                        </div>
                    </div>
                    <div>
                        <button class="btn" @click.prevent="questionDetail(`${question._id}`)">Show Detail</button>
                    </div>
                </div>
            </Question>
        </div>
    </div>
</template>

<script>
import Question from '../components/Question'
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2'

import VueTagsInput from '@johmun/vue-tags-input';

export default {
    name : "MyQuestion",
    data () {
        return {
            tag: '',
            tags: [],
            title : '',
            description: '',
            modalShow: false
        }
    },  
    methods: {
        questionDetail( questionId ) {
            this.$router.push(`/questions/${ questionId }`)
        },
        deleteQuestion ( questionId  ) {
            const token = localStorage.getItem('token')
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
                    this.$store.dispatch('deleteQuestion' , questionId )
                    .then( response => {
                        this.$store.dispatch('fetchMyQuestion')
                        Swal.fire('Delete Success', '', 'success')
                    })
                    .catch( console.log )
                        
                }
            })
        },
        editQuestion( questionId ) {
            let myTags = []
            this.tags.forEach( tag => {
                myTags.push( tag.text )
            })
            console.log( this.tags )
            this.$store.dispatch('editQuestion' , {
                questionId,
                title : this.title,
                description : this.description,
                tags: myTags
            })
            .then( response => {
                Swal.fire('Edit Success' , '' , 'success')
                this.$store.dispatch('fetchMyQuestion')
            })
            .catch( err => {
                if( err.response.data ) 
                    Swal.fire('Edit Error' , err.response.data , 'error')
                else 
                    console.log( err ) 
            })
        },
        fetchOneQuestion( questionId ) {
            this.modalShow = !this.modalShow
            if ( !this.modalShow ) return
            const token = localStorage.getItem('token')
            axiosInstance({
                url : `/questions/detail/${ questionId }`,
                method : 'GET'
            })
            .then( response => {
                let question = response.data.question;
                this.title = question.title;
                this.description = question.description;
                this.tags = []
                question.tags.forEach(( tag, index ) => {
                    this.tags.push({ text : tag})
                })
            })
            .catch( console.log )
        }
    },
    created () {
        this.$store.dispatch('fetchMyQuestion')
    },
    components : {
        Question,
        VueTagsInput
    }
}
</script>

<style scoped>
.header {
    font-size: 25px;
    color: black;
    font-weight: bolder
}
.horizontal-line {
    width: 100%;
    height: 2px;
    background-color: rgb(40, 40, 221);
}
.bg {
    padding: 20px;
    background-color: white
}
.flex {
    display: flex;
    justify-content: space-between;
    margin-top:10px;

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
.btn-edit , .show-btn{
    border-radius: 20px;
    background-color: darkblue;
    color:white;
}
.btn-edit:hover , .show-btn:hover{
    background-color:cornsilk;
    color :black;
}
input {
    border-radius: 20px;
}
</style>