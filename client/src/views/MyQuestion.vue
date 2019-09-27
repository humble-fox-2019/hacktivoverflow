<template>
  <section id="myquestion-page">
    <div class="row">
      <div v-for="question in myQuestions" :key="question._id" class="col-md-12 mb-2">
        <div class="card">
          <div class="card-header">
            Question
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-10">
                <b>{{ question.title }}</b>
                <p>{{ question.description }}</p>
                <button @click="show(question._id)" class="btn btn-success">{{ question.answers.length }} | Answers</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyQuestion",
  computed: {
    myQuestions() {
      return this.$store.state.myQuestions;
    }
  },
  created() {
    this.fetchMyQuestion();
  },
  methods: {
    fetchMyQuestion() {
      this.$store.dispatch("fetchMyQuestion");
    },
    show(id){
        this.$router.push(`/question/${id}`)
    }
  }
};
</script>

<style>
</style>