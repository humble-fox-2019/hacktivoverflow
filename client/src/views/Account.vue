<template>
  <div class="account">
    <h1>My Questions</h1>
    <div class="question-list">
      <MyQuestion
        v-for="(question, index) in questions"
        :key="index"
        :question="question"
        @confirm="toggleConfirm">
      </MyQuestion>
    </div>
    <div class="confirm-delete" v-if="isShowConfirm">
      <h2>Are you sure want to delete ?</h2>
      <button class="yes" @click="deleteQuestion">Yes</button>
      <button class="no" @click="toggleConfirm">No</button>
    </div>
  </div>
</template>

<script>

import axios from '../api/server'
import MyQuestion from '../components/MyQuestion'

export default {
  name: 'Account',
  components: {
    MyQuestion
  },
  data() {
    return {
      questions: [],
      isShowConfirm: false,
      id: ''
    }
  },
  methods: {
    toggleConfirm(id) {
      this.id = id
      this.isShowConfirm = !this.isShowConfirm
    },
    deleteQuestion() {
      axios.delete(`/question/${this.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        let newQuestions = []
        for(let i=0;i<this.questions.length;i++) {
          if(this.questions[i]._id == this.id) {
            //skip
          }else{
            newQuestions.push(this.questions[i])
          }
        }
        this.questions = newQuestions
      })
      .catch(err => {
        console.log(err.response.data)
      })
      .finally( _ => {
        this.isShowConfirm = false
        this.id = ''
      })
    }
  },
  created() {
    axios.get('/question/myquestion', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log(data.questions)
      this.questions = data.questions
    })
  }
}
</script>

<style scoped>

.account{
  max-width: 1000px;
  margin: auto;
  background-color: rgb(82, 82, 82);
  padding: 10px;
  border-radius: 5px;
}
.account h1{
  font-size: 24pt;
  color: #00ff8a;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.confirm-delete{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #464646;
  border-radius: 5px;
  padding: 30px 20px 20px;
  box-shadow: 0px 0px 20px rgba(0,0,0,.5);
}
.confirm-delete h2{
  font-size: 18pt;
  color: #00ff8a;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.confirm-delete button{
  padding: 10px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14pt;
}
.confirm-delete button.yes{
  margin-right: 10px;
  background-color: #e72626;
  color: #ffffff;
}
</style>
