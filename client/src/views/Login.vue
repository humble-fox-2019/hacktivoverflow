<template>
  <div class="flex justify-center items-center w-full h-screen bg-gray-200">
    <form @submit.prevent="login" class="flex flex-col p-6 pb-4 rounded bg-white shadow">
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
      <button class="w-56 py-1 rounded bg-blue-500 text-white mt-2 focus:outline-none">Login</button>
      <p class="text-xs text-center mt-2">
        Don't have an account?
        <span class="font-bold text-blue-500">
          <router-link to="register"> Sign up</router-link>
        </span>
      </p>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: 'admin@gmail.com',
      password: '123456'
    }
  },
  methods: {
    ...mapActions(['userSignIn']),
    ...mapMutations(['loadingFinished']),

    login() {
      const payload = {
        email: this.email,
        password: this.password
      }

      this.userSignIn(payload).finally(() => {
        this.loadingFinished()
      })
    }
  },
  computed: {
    ...mapGetters(['user', 'isLogin'])
  }
}
</script>

<style></style>
