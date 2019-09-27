<template>
  <div class="question">
    <h1 @click="$router.push(`/question/${question._id}`)">{{ question.title }}</h1>
    <div class="question-info">
      <div class="statistic">
        <div>
          <h2> {{ getVote }}  </h2>
          <span>Votes</span>
        </div>
        <div>
          <h2>{{ question.answers.length }}</h2>
          <span>Answer</span>
        </div>
      </div>
      <div class="tag">
        <button v-for="(tag, index) in question.tags" :key="index">{{ tag }}</button>
      </div>
      <div class="action">
        <button class="edit" @click="$router.push(`/edit-question/${question._id}`)">Edit</button>
        <button class="delete" @click="$emit('confirm', question._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'MyQuestion',
  props: ['question'],
  methods: {
    
  },
  computed : {
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

.question {
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: rgb(58, 58, 58);
  border-radius: 5px;
}
.question h1{
  color: #00ff8a;
  font-weight: normal;
  font-size: 16pt;
  margin-bottom: 20px;
  cursor: pointer;
}
.question h1:hover{
  color: #a8ffd6;
}
.question-info {
  display: flex;
  align-items: center;
}
.statistic{
  display: flex;
  margin-right: 20px;
}
.statistic > div {
  display: flex;
  align-items: center;
  color: #ffffff;
}
.statistic > div:first-child{
  margin-right: 20px;
}
.statistic > div h2{
  margin-right: 5px;
  font-weight: normal;
}
.tag{
  flex-grow: 1;
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
.action{
  justify-self: right;
}
.action button{
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.action button.delete{
  background-color: #eb2626;
  color: #ffffff;
  padding: 7px 10px;
}
.action button.edit{
  background-color: transparent;
  border: 2px solid #00ff8a;
  color: #00ff8a;
  margin-right: 10px;
}
</style>
