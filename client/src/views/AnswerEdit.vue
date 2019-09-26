<template>
  <div class="w-screen flex pt-12 bg-gray-200">
    <div class="h-auto container mx-auto">
      <div class="m-12">
        <h1 class="text-3xl mb-4">Answer</h1>
        <form @submit.prevent="editAnswer" class="p-5 bg-white rounded">
          <div class="mb-24">
            <label for="body" class="font-bold">Answer body</label>
            <p class="text-xs">
              Edit your answer.
            </p>
            <quillEditor v-model="description" id="body" class="h-64"></quillEditor>
          </div>

          <button class="bg-blue-500 px-2 py-2 rounded text-white focus:outline-none">
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
      description: ''
    }
  },
  methods: {
    editAnswer() {
      const payload = {
        description: this.description
      }

      this.$store.dispatch('editAnswer', payload)
    }
  },
  created() {
    this.$store.dispatch('fetchSingleAnswer').finally(() => {
      this.description = this.$store.getters.answer.description
    })
  }
}
</script>

<style scoped>
form {
  max-width: 900px;
  min-width: 700px;
}
</style>
