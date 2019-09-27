<template>
  <div class="centerMe">
    <form action class="form" @submit.prevent="doneEdit">
      <h1 class="que"> <b>Question :</b> {{question}}</h1>
      <h1>Edit Answer</h1>
      <div class="wys">
        <wysiwyg class="box-edit" v-model="answer"></wysiwyg>
      </div>
      <button class="rightDown">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Edit-Answer',
  data () {
    return {
      answer: '',
      question: '',
      baseUrl: 'http://3.0.89.125'
    }
  },
  methods: {
    doneEdit () {
      if (this.answer.length < 1) {
        this.$router.push({ path: '/' })
      } else {
        axios({
          method: 'put',
          url: `${this.baseUrl}/answer/${this.$route.params.id}`,
          headers: { token: localStorage.token },
          data: {
            answer: this.answer
          }
        })
          .then(data => {
            this.$router.push({ path: '/' })
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    }
  },
  created () {
    console.log(this.$route.params.id)
    axios({
      method: 'get',
      url: `${this.baseUrl}/answer/${this.$route.params.id}`
    }).then(data => {
      let result = data.data
      this.question = result.data.questionId.title
      this.answer = result.data.answer
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.form {
  height: 547px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.editr {
  background: white;
  min-height: 40vh;
  width: 50vw;
}

.rightDown {
  width: 98px;
  height: 35px;
  align-self: flex-end;
}

button {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12pt;
  border-radius: 5px;
}
.centerMe {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  width: calc(100vw - 18vw);
}
.wys {
  display: flex;
  justify-content: center;
}
h1.que{
  align-self: flex-start;
  text-align: left;
  font-weight: 400
}
</style>
