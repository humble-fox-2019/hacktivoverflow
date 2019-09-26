<template>
  <div class="question-detail">
    <h1> {{ question.title }} </h1>
    <div class="question">
      <div class="vote">
        <button class="active" @click="vote('up')" v-if="isUpvote"><i class="fas fa-chevron-up"></i></button>
        <button @click="vote('up')" v-else><i class="fas fa-chevron-up"></i></button>
        <div class="count">
          <span> {{ getVote }} </span>
        </div>
        <button class="active" @click="vote('down')" v-if="isDownvote"><i class="fas fa-chevron-down"></i></button>
        <button @click="vote('down')" v-else><i class="fas fa-chevron-down"></i></button>
      </div>
      <div class="content">
        <p> {{ question.content }} </p>
        <div class="tag">
          <button v-for="(tag, index) in question.tags" :key="index"> {{ tag }} </button>
        </div>
        <div class="footer">
          <div class="action">
            <button :class="`${isShowCommentForm}`" @click="toggleCommentForm">Comment</button>
            <button :class="`${isShowAnswerForm}`" @click="toggleAnswerForm">Answer</button>
          </div>
          <div class="user">
            <p>Asked {{ getTime }}</p>
            <h2>{{ question.owner.username }}</h2>
          </div>
        </div>
        <div class="comment-form" v-if="isShowCommentForm">
          <form @submit.prevent="addComment">
            <div class="input-group">
              <label for="content">Your comment</label>
              <textarea name="content" id="content" v-model="comment"></textarea>
            </div>
            <div class="input-action">
              <button type="submit">POST</button>
            </div>
          </form>
        </div>
        <div class="answer-form" v-if="isShowAnswerForm">
          <form @submit.prevent="addAnswer">
            <div class="input-group">
              <label for="content">Your answer</label>
              <textarea name="content" id="content" v-model="answer"></textarea>
            </div>
            <div class="input-action">
              <button type="submit">POST</button>
            </div>
          </form>
        </div>
        <div class="comment-list">
          <h3>Comments :</h3>
          <div>
            <Comment v-for="(item, index) in question.comments" :key="index" :com="item"></Comment>
          </div>
        </div>
        <div class="answer-list">
          <h3>Answers :</h3>
          <div>
            <Answer v-for="(item, index) in question.answers" :key="index" :swer="item"></Answer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from '../api/server'
import moment from 'moment'
import Comment from '../components/Comment.vue'
import Answer from '../components/Answer.vue'

export default {
  name: 'QuestionDetail',
  components: {
    Comment,
    Answer
  },
  data() {
    return {
      question: {
        title: '',
        content: '',
        owner: {
          username: ''
        },
        upvote: [],
        downvote: [],
        answers: [],
        comments: [],
        createdAt: ''
      },
      isUpvote: false,
      isDownvote: false,
      isShowCommentForm: false,
      isShowAnswerForm: false,
      comment: '',
      answer: ''
    }
  },
  methods: {
    toggleCommentForm() {
      this.isShowCommentForm = !this.isShowCommentForm
      this.isShowAnswerForm = false
    },
    toggleAnswerForm() {
      this.isShowAnswerForm = !this.isShowAnswerForm
      this.isShowCommentForm = false
    },
    addComment() {
      axios.post(`/question/${this.$route.params.id}/comment`, {
        content: this.comment
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.question.comments.unshift(data.comment)
        this.comment = ''
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally( _ => {
        this.isShowCommentForm = false
      })
    },
    addAnswer() {
      axios.post(`/question/${this.$route.params.id}/answer`, {
        content: this.answer
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.question.answers.unshift(data.answer)
        this.answer = ''
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally( _ => {
        this.isShowAnswerForm = false
      })
    },
    vote(c) {

      if(!this.$store.state.isLogin) {
        this.$router.push('/ask')
      }else{
        axios.put(`/question/vote/${this.$route.params.id}/${c}`, {
          
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.question = data.question

          if(c === 'up') {

            if(this.isUpvote) {
              this.isUpvote = false
            }else{
              this.isUpvote = true
            }
            this.isDownvote = false
          }else{
            if(this.isDownvote) {
              this.isDownvote = false
            }else{
              this.isDownvote = true
            }
            this.isUpvote = false
          }
        }) 
      }
    }
  },
  created() {
    axios.get(`/question/${this.$route.params.id}`)
      .then(({data}) => {

        this.question = data.question

        let upvote = data.question.upvote
        for(let i=0;i<upvote.length;i++) {
          if(upvote[i] == this.$store.state.user._id) {
            this.isUpvote = true
            this.isDownvote = false
          }
        }

        let downvote = data.question.downvote
        for(let i=0;i<downvote.length;i++) {
          if(downvote[i] == this.$store.state.user._id) {
            this.isDownvote = true
            this.isUpvote = false
          }
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  },
  computed: {
    getTime() {
      return moment(this.question.createdAt).fromNow()
    },
    getVote() {
      return this.question.upvote.length - this.question.downvote.length
    }
  }
}
</script>

<style scoped>

.question-detail{
  background-color: #1d1f29;
  max-width: 1000px;
  margin: auto;
  border-radius: 5px;
  padding: 20px;
}
.question-detail > h1{
  font-size: 24pt;
  font-weight: normal;
  margin-bottom: 20px;
  color: #00ff8a;
}
.question{
  display: flex;
}
.vote{
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vote button{
  font-size: 18pt;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(0,0,0,.2);
  color: #777777;
  cursor: pointer;
}
.vote button:focus{
  outline: none;
}
.vote button:active{
  transform: scale(0.95);
}
.vote button.active{
  background-color: #00ff8a;
  color: #ffffff;
}
.vote .count{
  font-size: 32pt;
  color: #ffffff;
}
.tag button{
  padding: 2px 5px;
  border: none;
  border-radius: 5px;
  background-color: #b6b6b6;
  cursor: pointer;
}
.tag button:focus{
  outline: none;
}
.tag button:active{
  transform: scale(0.95);
}
.tag button:not(:last-child) {
  margin-right: 5px;
}
.content{
  flex-grow: 1;
  padding: 20px;
  background-color: rgb(39, 38, 46);
  border-radius: 5px;
}
.content > p{
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-size: 14pt;
  color: #ffffff;
}
.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #464646;
}
.user p{
  color: #ffffff;
}
.user h2{
  font-size: 12pt;
  font-weight: bold;
  color: #00fff0;
}
.comment-list{
  background-color: #1d1f29;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  max-height: 100px;
  overflow: auto;
}
.comment-list h3{
  font-size: 8pt;
  font-weight: normal;
  color: #ffffff;
  margin-bottom: 10px;
}
.comment-list div.comment:not(:last-child) {
  border-bottom: 1px solid rgb(52, 55, 61);
}
.answer-list{
  background-color: #1d1f29;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
}
.answer-list h3{
  color: #00fff0;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.answer-list div.answer:not(:last-child) {
  margin-bottom: 20px;
}
.comment-form{
  margin: 10px 0;
}
.answer-form{
  margin: 10px 0;
}
form{
  border-radius: 5px;
}
.input-group{
  margin-bottom: 20px;
}
.input-group label{
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  color: #8a8a8a;
}
.input-group input, .input-group textarea{
  display: block;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(24, 23, 29);
  font-size: 14pt;
  color: #8a8a8a;
}
.input-group textarea{
  height: 100px;
  resize: none;
}
.input-action button{
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  background-color: #00ff8a;
  color: #383838;
  font-size: 10pt;
  font-weight: bold;
  cursor: pointer;
}
.action button{
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.action button:focus{
  outline: none;
}
.action button.false{
  background-color: #242424;
}
.action button.true{
  background-color: #00ff8a;
  color: #ffffff;
}
</style>
