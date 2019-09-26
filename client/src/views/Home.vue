<template>
  <section id="home-page">
    <div class="row">
      <div class="col-md-12 my-2" v-for="question in allQuestions" :key="question.id">
        <div class="card">
          <div class="card-header">Question</div>
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
import Navbar from "@/components/Navbar";

export default {
  name: "home",
  computed: {
    allQuestions() {
      return this.$store.state.allQuestions;
    }
  },
  created() {
    this.fetchAllQuestion();
  },
  methods: {
    fetchAllQuestion() {
      this.$store.dispatch("fetchAllQuestion");
    },
    show(id) {
      this.$router.push(`/question/${id}`);
    }
  }
};
</script>

<style>
</style>