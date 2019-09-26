<template>
  <div>
    <div class="card" v-for="(question, index) in this.$store.state.allQuestions" :key="index">
      <div class="vote">
        <h3>{{question.upvote.length + question.downvote.length}}</h3>
        <h4>votes</h4>
      </div>
      <div class="answer">
        <h3>{{question.answer.length}}</h3>
        <h4>answers</h4>
      </div>
      <div class="title">
        <a href="#" @click.prevent="getDetail(question)">
          <h2>{{question.title}}</h2>
        </a>
        <p style="text-align:left" v-html="question.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function() {
    return {};
  },
  methods: {
    getDetail(question) {
      this.$router.push(`/questions/${question._id}`);
      this.$store.commit("setDetail", question);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 80vw;
  height: 100px;
  display: grid;
  grid-template-columns: 10% 10% auto;
  grid-gap: 20px;
  margin: 10px auto;
  border-bottom: 1px solid #000;
}

.vote,
.answer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
  overflow: hidden;
}
</style>
