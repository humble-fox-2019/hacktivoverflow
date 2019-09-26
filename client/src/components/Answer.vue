<template>
  <div class="flex border-b pl-2 pb-4">
    <div class="text-gray-500">
      <button @click="answerUp(answer._id)" class="text-3xl focus:outline-none hover:text-gray-600">
        <i class="fas fa-caret-up"></i>
      </button>

      <p class="text-center">
        {{ answer.upvotes.length - answer.downvotes.length }}
      </p>

      <button
        @click="answerDown(answer._id)"
        class="text-3xl focus:outline-none hover:text-gray-600"
      >
        <i class="fas fa-caret-down"></i>
      </button>
    </div>
    <div class="flex flex-col w-full">
      <div class="p-5 flex-grow" v-html="answer.description"></div>

      <div class="flex">
        <div class="text-sm ml-5">Posted by: {{ answer.userId.name }}</div>
      </div>

      <!-- <div v-if="question.userId._id === user._id" class="flex text-sm ml-auto">
        <router-link
          :to="'/questions/edit/' + question._id"
          class="text-blue-600 hover:text-blue-400 focus:outline-none mr-12"
          >Edit</router-link
        >
        <button @click="deleteQuestion" class="text-red-600 hover:text-red-500">
          Delete
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['answer'],
  methods: mapActions(['answerUp', 'answerDown'])
}
</script>

<style></style>
