<template>
  <div>
    <h1 class="text-xl mt-4 mb-4">Your Answer</h1>
    <form @submit.prevent="newAnswer">
      <quillEditor v-model="description" id="body" class="h-64 mb-24"></quillEditor>
      <button class="bg-blue-500 px-2 py-2 rounded text-white focus:outline-none">Post your answer</button>
    </form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: { quillEditor },
  data() {
    return {
      description: ''
    }
  },
  methods: {
    newAnswer() {
      const payload = {
        description: this.description
      }

      this.$store.dispatch('addAnswer', payload)
    }
  }
}
</script>

<style></style>
