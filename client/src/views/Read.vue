<template>
  <div class="qus">
    <div>
      <h1>{{title}}</h1>
      <h3>{{description}}</h3>
    </div>
    <br />
    <div class="textx">
      <form action @submit.prevent="createAnswer">
        <h2>Give Answer</h2>
        <div class="write">
          <wysiwyg v-model="newAnswer"></wysiwyg>
        </div>
        <div class="buttonSub">
          <button>Submit</button>
        </div>
      </form>
    </div>
    <div v-if="answers.length < 1">
      <h2 class="bluin">No answer</h2>
    </div>
    <div v-else class="box">
      <OneAnswer v-for="(answer, index) in answers" :key="index" :answerId="answer._id" @toLogin="toLogin"></OneAnswer>
    </div>
  </div>
</template>

<script>
import OneAnswer from "../components/OneAnswer";
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      description: "",
      baseUrl: "http://localhost:3000",
      answers: [],
      newAnswer: "",
      baseUrl: "http://localhost:3000"
    };
  },
  components: {
    OneAnswer
  },
  methods: {
    toLogin() {
      console.log("heee");
      this.$emit("toLogin");
    },
    getData() {
      axios({
        method: "get",
        url: `${this.baseUrl}/question/${this.$route.params.id}`
      }).then(data => {
        let result = data.data.question;
        this.title = result.title;
        this.description = result.description;
        let answers = data.data.answer;
        this.answers = answers;
      });
    },
    createAnswer() {
        if (localStorage.token){
            axios({
              method: "post",
              url: `${this.baseUrl}/answer/${this.$route.params.id}`,
              headers: {
                token: localStorage.token
              },
              data: {
                answer: this.newAnswer
              }
            }).then(data => {
              this.getData();
              this.newAnswer = "";
            });
        }
        else{
            this.$emit('toLogin')
        }
    }
  },
  created() {
    console.log(this.$route.params.id);
    this.getData();
  }
};
</script>

<style scoped>
.box {
  background: rgb(7, 29, 77);
  width: 790px;
  display: flex;
  min-height: 60vh;
  justify-content: center;
  margin: 35px;
  flex-direction: column;
}

.write {
  width: 790px;
  background: rgb(235, 235, 235);
}

.textx {
  text-align: left;
  display: flex;
  justify-content: center;
}
h2 {
  text-align: center;
}

h3 {
  text-align: left;
  margin-top: 10px;
  font-weight: 300;
  margin-left: 35px;
}

h1 {
  text-align: left;
  margin-top: 10px;
  font-weight: 400;
  margin-left: 35px;
}

h2 {
  font-weight: 450;
}

.qus {
  background: white;
}
button {
  color: black;
  font-weight: 500;
  font-size: 12pt;
  width: 120px;
  height: 40px;
}
.buttonSub {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}

.bluin {
  color: rgb(104, 6, 117);
  text-decoration: underline;
}

form {
  margin: 40px;
}
</style>
