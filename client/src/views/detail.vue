<template>
  <div class="container pt-5">
    <div class="pt-5" >
      <div>
        <h1 class="q-title">{{ question.title }}</h1>
      </div>
      <div class="d-flex flex-row justify-content-center">
        <div class="mr-5">
          <p>Asked By {{question.User.username}}</p>
        </div>
        <div class="mr-5">
          <p>{{question.votes + TempNum}} Votes</p>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div class="pt-2 d-flex flex-row justify-content-between">
        <div class="d-flex flex-column mb-3">
          <a @click="upVote(question._id)" >
            <img src="https://image.flaticon.com/icons/svg/25/25223.svg" width="25px;" alt />
          </a>
          <h4 >{{question.votes  }}</h4>
          <a @click="downVote(question._id)" >
            <img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="25px;" alt />
          </a>
        </div>
        <p style="text-aling : left;" class="q-des">{{question.description}}</p>
        <div></div>
      </div>
      <div class="d-flex flex-row justify-content-start">
        <p class="answer-total">{{question.Answer.length}} Answer</p>
      </div>
      <div class="container">
         <!-- <hr /> -->
        <div v-for="q in answer" :key="q._id">
          <hr>
          <div class="d-flex flex-row justify-content-around">
            <div>
              <div class="d-flex flex-row">
                <div class="mr-2">
                  <p> {{q.User.username}}</p>
                </div>
                <div class="mr-2">
                  <p> {{q.User.email}}</p>
                </div>
                <div class="mr-2">
                  <p>{{q.votes  }} Votes</p>
                </div>
              </div>
              <div class="d-flex flex-row">
                <p class="q-title">
                Title : {{q.title}}
                </p>
              </div>
            </div>
            <div class="d-flex flex-column mb-3">
              <a @click="upVoteAnswer(q._id)" >
                <img src="https://image.flaticon.com/icons/svg/25/25223.svg" width="25px;" alt />
              </a>
              <h4 >{{  q.votes }}</h4>
              <a @click="downVoteAnswer(q._id)" >
                <img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="25px;" alt />
              </a>
            </div>
          </div>
          <div>
            <p class="q-title">
              {{q.description}}
            </p>
          </div>
          <div>
            <div v-if="IdUser == q.User._id">
              <img src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png" class="icon-crud" @click="pindahEdit(q._id , q.description , q.title , question._id)"  alt="">
              <!-- <img src="https://image.flaticon.com/icons/png/512/61/61848.png" class="icon-crud" @click="deleteZ(list._id)"  alt=""> -->
            </div>
          </div>
        </div>
        <div class="pt-2">
          <hr />
        </div>
        <h5>Add Your Answer Here</h5>
        <form
          class="form-answer d-flex flex-column justify-content-center mb-5"
          @submit.prevent="addAnswer"
        >
          <div>
            <input type="text" class="mt-2 typeText" placeholder="title" v-model="title" />
          </div>
          <div class="mt-2">
            <textarea class="mt-2 typeArea" placeholder="description answer" v-model="description"></textarea>
          </div>
          <div class="mt-2">
            <input type="submit" class="btn btn-primary" value="Add" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
export default {
  created() {
      this.fetchData()
  },
  data() {
    return {
      question: {},
      answer: [],
      title: "",
      description: "",
      IdUser: localStorage.getItem("id"),
      TempNum: 0,
      TempNumAnswer: 0
    };
  },
  methods: {
    fetchData (){
      axios({
      method: "GET",
      url: `http://localhost:3000/question/${this.$route.params.id}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.question = data;
        console.log(data);
        return axios({
          method: "GET",
          url: `http://localhost:3000/answer/${this.$route.params.id}`,
          headers: {
            token: localStorage.getItem("token")
          }
        });
      })
      .then(({ data }) => {
        this.answer = data;
      })
      .catch(console.log);
    },
    addAnswer() {
      let { question, title, description } = this;
      this.$store
        .dispatch("addAnswer", {
          question,
          title,
          description
        })
        .then(data2 => {
          return axios({
            method: "GET",
            url: `http://localhost:3000/answer/${this.$route.params.id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(({ data }) => {
          this.answer = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    vote(num) {
      this.$store
        .dispatch("vote", {
          id: this.question._id,
          num
        })
        .then(data => {
          this.TempNum++;
        })
        .catch(console.log);
      // console.log('upvote')
    },
    upVote(id){
      axios({
       method : 'PUT',
       url : `http://localhost:3000/vote/${id}/question/upvote`,
       headers : {
           token : localStorage.getItem('token')
       },
     })
     .then(({data})=>{
       this.$swal.fire('succes' , 'Sukses Vote' , 'success')
       this.fetchData()
        console.log(data , ' elslsslslsllsllslllssllslslslls')
        console.log('SUkses uyyyyy !!!!')
     })
     .catch(err=>{
       this.$swal.fire('Warning', err.response.data.message , 'warning' )
       console.log(err.response.data.message)
     })
    },
    downVote(id){
       axios({
       method : 'PUT',
       url : `http://localhost:3000/vote/${id}/question/downvote`,
       headers : {
           token : localStorage.getItem('token')
       },
     })
     .then(({data})=>{
       this.$swal.fire('succes' , 'Sukses Vote' , 'success')
       this.fetchData()
        console.log(data , ' elslsslslsllsllslllssllslslslls')
        console.log('SUkses uyyyyy !!!!')
     })
     .catch(err=>{
       this.$swal.fire('Warning', err.response.data.message , 'warning' )
       console.log(err.response.data.message)
     })
    },
    upVoteAnswer (id){
      axios({
       method : 'PUT',
       url : `http://localhost:3000/vote/${id}/answer/upvote`,
       headers : {
           token : localStorage.getItem('token')
       },
     })
     .then(({data})=>{
       this.$swal.fire('succes' , 'Sukses Vote' , 'success')
       this.fetchData()
        console.log(data , ' elslsslslsllsllslllssllslslslls')
        console.log('SUkses uyyyyy !!!!')
     })
     .catch(err=>{
       this.$swal.fire('Warning', err.response.data.message , 'warning' )
       console.log(err.response.data.message)
     })
    },
    downVoteAnswer (id){
      axios({
       method : 'PUT',
       url : `http://localhost:3000/vote/${id}/answer/downvote`,
       headers : {
           token : localStorage.getItem('token')
       },
     })
     .then(({data})=>{
       this.$swal.fire('succes' , 'Sukses Vote' , 'success')
       this.fetchData()
        console.log(data , ' elslsslslsllsllslllssllslslslls')
        console.log('SUkses uyyyyy !!!!')
     })
     .catch(err=>{
       this.$swal.fire('Warning', err.response.data.message , 'warning' )
       console.log(err.response.data.message)
     })
    },
    answerVote(num , id){
        this.$store.dispatch("answerVote" , {
            id,
            num
        })
        .then(data => {
          this.TempNumAnswer++;
        })
        .catch(console.log);
    },
    pindahEdit(id , description , title , idBefore) {
      this.$router.push(`/editanswer/${id}?title=${title}&description=${description}&idBefore=${idBefore}`);
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Oswald', sans-serif;
  font-weight: 100px;
}
.icon-user {
  height: 40%;
  width: 30%;
  margin: 0 0 0 0!important;
}
.anwswer {
  text-align: left;
  padding-top: 20px;
  width: 85%;
  height: 200px;
  background-color: #fff8dc;
}
.typeText {
  text-align: center;
  width: 60%;
  border: none;
}

.typeArea {
  text-align: center;
  width: 60%;
  border: none;
  height: 150px;
}
.q-title {
  font-size: 30px;
}
.q-des {
  font-size: 24px;
}
.answer-total {
  font-size: 23px;
  margin: 0 !important;
}
</style>
<!-- <hr />
          <div style="text-align : center;">
            <h3>{{q.title}}</h3>
          </div>
          <div style="text-align : left">
            <div class="d-flex flex-column mb-3">
              <a @click="answerVote(1 , q._id)" >
                <img src="https://image.flaticon.com/icons/svg/25/25223.svg" width="25px;" alt />
              </a>
              <h4 style="padding-left : 10px;">{{q.votes + TempNumAnswer }}</h4>
              <a @click="answerVote(-1, q._id)" >
                <img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="25px;" alt />
              </a>
            </div>
          </div>
          <div class="container anwswer">
            <h5>{{q.description}}</h5>
          </div>
          <div class="d-flex flex-column">
            <div>
              <a href="#" class="mr-2">Edit</a>
              <a href="#">Share</a>
            </div>
            <div>Answered By {{q.User.username}}</div>
            <button v-if="IdUser == q.User._id" class="btn btn-primary" @click="pindahEdit(q._id , q.description , q.title)" style="width : 50px;">Edit</button>
          </div> -->