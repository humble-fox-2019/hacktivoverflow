<template>
  <div class="w-full flex mt-12">
    <div class="w-2/12"></div>
    <div class="w-10/12 border-l border-gray-300 h-screen">
      <div class="m-12">
        <div class="flex justify-between">
          <h1 class="font-bold text-4xl">Questions</h1>
          <router-link to="/questions/ask" class="bg-blue-500 px-2 py-2 my-auto text-white rounded"
            >Ask Question</router-link
          >
        </div>

        <div class="mt-4">
          <Question
            v-for="question in questions"
            :question="question"
            :key="question.id"
          ></Question>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Question from '@/components/Question'

export default {
  components: { Question },
  computed: mapGetters(['questions']),
  created() {
    this.$store.dispatch('fetchQuestions')
  }
}
</script>

<style></style>
