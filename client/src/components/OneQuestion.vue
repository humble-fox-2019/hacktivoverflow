<template>
<div class="row">
    <div class="vote">
        <button @click="upVote">^</button>
        <hr>
        <h1>
        {{totalVote}}
        </h1>
        <hr>
        <button @click="downVote">v</button>
    </div>
<div class="one">
    <div class="authz"  v-if="authz"><button @click="editQuestion">E</button><button>D</button></div>
  <p class="date mini">{{createdAt}}</p>
  <h1 class="title" @click="readThis">{{question.title}}</h1>
     <div v-html="question.description">
      </div>
  <p class="mini">{{timePass}}</p>
  <hr />
</div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
  props: ['question'],
  data () {
    return {
      createdAt: '',
      timePass: '',
      baseUrl: 'http://localhost:3000',
      totalVote: 0,
      authz: false
    }
  },
  methods: {
    upVote () {
      if (!localStorage.token) {
        console.log('heiloo')
        this.$emit('toLogin')
      } else {
        axios({
          method: 'put',
          url: `${this.baseUrl}/question/like/${this.question._id}`,
          headers: {
            token: localStorage.token
          }
        }).then(data => {
          this.updateVote()
        })
          .catch(err => {
            this.normalize()
          })
      }
    },
    downVote () {
      if (!localStorage.token) {
        console.log('hello')
        this.$emit('toLogin')
      } else {
        axios({
          method: 'put',
          url: `${this.baseUrl}/question/dislike/${this.question._id}`,
          headers: {
            token: localStorage.token
          }
        }).then(data => {
          this.updateVote()

          console.log(data)
        })
          .catch(err => {
            console.log(err.response)
            this.normalize()
          })
      }
    },
    normalize () {
      console.log('be here')
      axios({
        method: 'put',
        url: `${this.baseUrl}/question/normalize/${this.question._id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          console.log('normalize')
          this.updateVote()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    updateVote () {
      console.log(this.question.userId._id)
      axios({
        method: 'get',
        url: `${this.baseUrl}/question/${this.question._id}`
      })
        .then(data => {
          let likes = data.data.question.likes.length
          let dislikes = data.data.question.dislikes.length
          let total = likes - dislikes
          this.totalVote = total
        })
    },
    checkAuthz () {
      if (localStorage.token) {
        if (this.question.userId._id === localStorage._id) {
          this.authz = true
        }
      }
    },
    editQuestion () {
      console.log('here')
      this.$router.push({ path: `/update/${this.question._id}` })
    },
    readThis () {
      this.$router.push({ path: `/question/${this.question._id}` })
    }
  },
  computed: {
    ...mapActions(['putToken']),
    ...mapState(['token'])

  },
  created () {
    this.createdAt = new Date(this.question.createdAt).toDateString()
    this.totalVote = this.question.likes.length - this.question.dislikes.length
    this.timePass = moment(new Date(this.question.createdAt)).fromNow()
    this.checkAuthz()
    // console.log(this.question.userId._id ,'<<< from create')
    // console.log(localStorage._id);
    // console.log(this.question._id);
  },
  watch: {
    // question(){
    //   console.log('coba');
    // }
  }
}
</script>

<style scoped>
.one{
margin: 10px 10px 25px 10px;
display: flex;
justify-content: flex-start;
flex-direction: column;
align-items: flex-start;
width: 80%;
}
.date{
    align-self: flex-end;
    margin-right:10px
}
.vote{
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center
}
.row{
    display: flex;
    justify-content: flex-start;
}
.authz{
    align-self: flex-end;
     margin-right:10px
}
.authz button{
    width: 25px;
    height: 25px;
}
h1{
  font-size: 16pt;
  font-family: Arial, Helvetica, sans-serif;
  color:#0266D6;
}

.mini{
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif
}

.vote button{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    align-self: center
}

.vote h1{
    font-size: 18pt;
    font-style: inline;
    color: rgb(77, 76, 76);

}
.vote hr{
    width: 40%;
    align-self: center;
    margin: 8px
}

.title:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>
