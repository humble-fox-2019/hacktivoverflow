<template>
  <div class="w-screen flex pt-12 bg-gray-200">
    <div class="h-auto container mx-auto">
      <div class="m-12">
        <h1 class="text-3xl mb-4">Ask a public question</h1>
        <form class="p-5 bg-white rounded">
          <div class="mb-4">
            <label for="title" class="font-bold">Question title</label>
            <p class="text-xs">
              Be specific and imagine you’re asking a question to another developer
            </p>
            <input
              v-model="title"
              type="text"
              id="title"
              placeholder="What's your programming question?"
              class="border border-gray-400 rounded w-full px-2 py-1 text-sm"
            />
          </div>

          <div class="mb-24">
            <label for="body" class="font-bold">Question body</label>
            <p class="text-xs">
              Include all the information someone would need to answer your question
            </p>
            <quillEditor v-model="description" id="body" class="h-64"></quillEditor>
          </div>
          <button
            @click.prevent="newQuestion"
            v-if="$router.currentRoute.name === 'ask'"
            class="bg-blue-500 px-2 py-2 rounded text-white"
          >
            Post your question
          </button>
          <button
            @click.prevent="editQuestion"
            v-else
            class="bg-blue-500 px-2 py-2 rounded text-white"
          >
            Save edits
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import { mapActions } from 'vuex'

export default {
  components: { quillEditor },
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    newQuestion() {
      const payload = {
        title: this.title,
        description: this.description
      }

      this.$store.dispatch('createQuestion', payload)
    },

    editQuestion() {
      const payload = {
        title: this.title,
        description: this.description
      }

      this.$store.dispatch('editQuestion', payload)
    }
  },
  created() {
    if (this.$router.currentRoute.name === 'question-edit') {
      this.$store.dispatch('fetchSingleQuestion').finally(() => {
        this.title = this.$store.getters.question.title
        this.description = this.$store.getters.question.description
      })
    }
  }
}
</script>

<style scoped>
form {
  max-width: 900px;
  min-width: 700px;
}
</style>
