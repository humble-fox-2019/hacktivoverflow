<template>
  <div class="w-full flex mt-12 relative">
    <div class="w-2/12"></div>
    <div class="w-10/12 border-l border-gray-300 h-screen">
      <div class="m-12">
        <div class="border-b mb-4">
          <h1 class="font-bold text-3xl mb-2">
            {{ question.title }}
          </h1>
        </div>

        <div class="flex w-3/5">
          <div class="flex flex-col justify-center text-gray-500">
            <button @click="questionUp" class="text-5xl focus:outline-none hover:text-gray-600">
              <i class="fas fa-caret-up"></i>
            </button>

            <p class="text-center text-3xl">
              {{ question.upvotes.length - question.downvotes.length }}
            </p>

            <button @click="questionDown" class="text-5xl focus:outline-none hover:text-gray-600">
              <i class="fas fa-caret-down"></i>
            </button>
          </div>

          <div class="flex flex-col w-full">
            <div class="p-5 overflow-y-auto flex-grow" v-html="question.description"></div>
            <div class="flex">
              <div class="text-sm ml-5">Posted by: {{ question.userId.name }}</div>
              <div v-if="question.userId._id === user._id" class="flex text-sm ml-auto">
                <router-link
                  :to="'/questions/edit/' + question._id"
                  class="text-blue-600 hover:text-blue-400 focus:outline-none mr-12"
                  >Edit</router-link
                >
                <button @click="deleteQuestion" class="text-red-600 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="border-b w-3/5 pb-2 mt-4">
          <!-- <p>{{ question.answers.length }} Answers</p> -->
        </div>

        <div class="w-3/5">
          <Answer v-for="answer in question.answers" :key="answer.id" :answer="answer"></Answer>
        </div>

        <div class="w-3/5 mt-2">
          <AnswerForm v-if="question.userId._id !== user._id"></AnswerForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AnswerForm from '@/components/AnswerForm'
import Answer from '@/components/Answer'

export default {
  name: 'question-detail',
  components: { AnswerForm, Answer },
  methods: {
    ...mapActions(['questionUp', 'questionDown']),

    deleteQuestion() {
      this.$dialog
        .confirm('Are you sure to delete this question?')
        .then(dialog => {
          this.$store.dispatch('deleteQuestion')
        })
        .catch(() => {
          console.log('Clicked on cancel')
        })
    }
  },
  computed: {
    ...mapGetters(['question', 'user'])
  },
  created() {
    this.$store.dispatch('fetchSingleQuestion')
  },
  destroyed() {
    this.$store.commit('resetQuestion')
  }
}
</script>

<style></style>
