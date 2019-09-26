<template>
  <div class="flex justify-center items-center w-full h-screen bg-gray-200">
    <form @submit.prevent="register" class="flex flex-col items-center p-6 rounded bg-white shadow">
      <div class="mb-4">
        <label for="name" class="font-bold mb-2">Name</label>
        <br />
        <input
          v-model="name"
          type="text"
          id="name"
          class="w-56 border-gray-400 border-2 rounded-sm focus:border-gray-600 focus:outline-none px-2 py-1 text-xs"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="font-bold mb-2">Email</label>
        <br />
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-56 border-gray-400 border-2 rounded-sm focus:border-gray-600 focus:outline-none px-2 py-1 text-xs"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="font-bold mb-2">Password</label>
        <br />
        <input
          v-model="password"
          type="password"
          id="password"
          class="w-56 border-gray-400 border-2 rounded-sm focus:border-gray-600 focus:outline-none px-2 py-1 text-xs"
        />
      </div>
      <button class="w-56 py-1 rounded bg-blue-500 text-white mt-2 focus:outline-none">Register</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123456'
    }
  },
  methods: {
    ...mapActions(['userSignUp']),
    ...mapMutations(['loadingFinished']),

    register() {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.userSignUp(payload).finally(() => {
        this.loadingFinished()
      })
    }
  }
}
</script>

<style></style>
