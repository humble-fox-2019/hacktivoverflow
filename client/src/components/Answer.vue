<template>
  <div class="answer">
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
      <p>{{ answer.content }}</p>
      <div class="footer">
        <div class="user">
          <p>Answered {{ getTime }}</p>
          <h2>{{ answer.owner.username }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import axios from '../api/server.js'

export default {
  name: 'Answer',
  props: ['swer'],
  methods: {
    vote(c) {

      if(!this.$store.state.isLogin) {
        this.$router.push('/ask')
      }else{
        axios.put(`/answer/vote/${this.answer._id}/${c}`, {

        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.answer = data.answer

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
  data() {
    return {
      answer: this.swer,
      isUpvote: false,
      isDownvote: false,
    }
  },
  computed: {
    getTime() {
      return moment(this.answer.createdAt).fromNow()
    },
    getVote() {
      return this.answer.upvote.length - this.answer.downvote.length
    }
  },
  mounted() {

    let upvote = this.answer.upvote
      for(let i=0;i<upvote.length;i++) {
        if(upvote[i] == this.$store.state.user._id) {
          this.isUpvote = true
          this.isDownvote = false
        }
      }

      let downvote = this.answer.downvote
      for(let i=0;i<downvote.length;i++) {
        if(downvote[i] == this.$store.state.user._id) {
          this.isDownvote = true
          this.isUpvote = false
        }
      }
  }
}
</script>

<style scoped>

.answer{
  background-color: rgb(55, 53, 59);
  display: flex;
  border-radius: 5px;
  padding: 10px;
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
.content{
  flex-grow: 1;
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
</style>
