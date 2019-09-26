<template>
  <div class="flex border-b mt-2">
    <div class="w-32 flex justify-around text-xs text-gray-700">
      <div class="flex flex-col justify-center items-center p-2">
        {{ question.upvotes.length - question.downvotes.length }}
        <p>votes</p>
      </div>

      <div class="flex flex-col justify-center items-center p-2">
        {{ question.answers.length }}
        <p>answers</p>
      </div>
    </div>
    <div class="w-3/5 ml-4 p-1">
      <router-link
        :to="'/questions/detail/' + question._id"
        class="text-blue-600 hover:text-blue-400"
      >
        {{ question.title }}
      </router-link>

      <div v-html="question.description" class="text-sm">
        <!-- {{ question.description.substring(0, 100) + '...' }} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  data() {
    return {
      votes: 1,
      answer: 1,
      title: 'How to cook?'
    }
  }
}
</script>

<style></style>
