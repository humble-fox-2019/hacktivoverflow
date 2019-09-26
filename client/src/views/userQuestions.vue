<template>
<div class="container" style="display:flex;justify-content:center;flex-direction:column">
  <h1 class="mt-3 mb-3">My Questions</h1>  

  <div>
  <questionComp v-for="question in userQuestions" :key="question._id" :question="question" :isUser="true"></questionComp>

  </div>
</div>
</template>

<script>

import {mapState} from "vuex"
import questionComp from "../components/question"
export default {
  name: "userquestions",
  components : {
    questionComp
  },
  methods: {

  },
  computed: {
    ...mapState(["userQuestions"])
  },
  created() {
    this.$store.dispatch("getUserQuestions");
  }
};
</script>

<style>
</style>
