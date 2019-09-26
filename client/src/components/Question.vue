<template>
    <div class="card mt-4">
        <div class="row">
            <div class="col-1" style="display:flex; justify-content:center; align-items:center; flex-direction:column">
                <div class="row pb-3 vote" @click.prevent="upVoteQuestion()"><i class="far fa-thumbs-up"></i></div>
                <div class="row">{{ question.upVote.length - question.downVote.length }}</div>
                <div class="row pt-3 vote" @click.prevent='downVoteQuestion()'><i class="far fa-thumbs-down"></i></div>
            </div>
            <div class="col-11">
                <div class="flex">
                    <div class="title">{{ question.title }}</div> 
                    <div class="flex-right">
                        <div class="box"> <i class="fas fa-angle-up"></i> {{ question.upVote.length }}</div>
                        <div class="box"> <i class="fas fa-angle-down"></i> {{ question.downVote.length }}</div>
                    </div>
                </div>
                <hr>
                <div class="description" v-html="question.description"></div>
                <div class="footer">
                    <div class="username">Asked by : {{ question.userId.username }}</div>
                    <div>{{ date }}</div>
                </div>
                <div class="footer">
                    Answered {{ question.answers.length }}
                </div>
                <div v-if="question.tags" style="display:flex">
                    <div v-for="(tag , index) in question.tags" :key='index' class="tag">{{tag}}</div>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../api/axios'
import Swal from 'sweetalert2';
export default {
    name: "Question",
    props: ["question"],
    computed: {
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
    methods : {
        upVoteQuestion(  ) {
            const questionId = this.question._id
            const token = localStorage.getItem('token')
            axiosInstance({
                method : "PATCH",
                url : `/questions/${ questionId }/up`,
                headers : {
                    token
                }
            })
            .then( response => {
                this.$store.dispatch('fetchAllQuestion')
                this.$store.dispatch('fetchMyQuestion')
                this.$emit('fetchSearch')
                // this.fetchDetail();
            })
            .catch( err => {
                Swal.fire('Error', err.response.data , 'error')
            })
        },
        downVoteQuestion( ) {
            const questionId = this.question._id
            const token = localStorage.getItem('token')
            axiosInstance({
                method : "PATCH",
                url : `/questions/${ questionId }/down`,
                headers : {
                    token
                }
            })
            .then( response => {
                this.$store.dispatch('fetchAllQuestion')
                this.$store.dispatch('fetchMyQuestion')

                this.$emit('fetchSearch')
            })
            .catch( err => {
                Swal.fire('Error', err.response.data , 'error')
            })
        },
    },
};
</script>

<style scoped>
.description {
    padding: 20px;
}
.vote:hover {
    color: black;
}
.tag{
    display:block;
    font-size: 12px;
    color:black;
    padding:5px 10px;
    margin: 4px;
    border-radius: 5px;
    background-color: lightblue;
    color: black;
}
.flex-right {
    display: flex;
    justify-content: flex-end;
}
.btn {
    background: none;
    border: none;
    font-size: 12px;
}
.btn:hover{
    color: blue;
}
.card {
  padding: 20px;
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
.flex-right {
    display:flex;
    justify-content: flex-end;
}
.box {
    padding: 10px;
}
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>