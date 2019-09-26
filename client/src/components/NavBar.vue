<template>
  <div class="border-t-4 border-orange-500 h-12 flex items-end fixed w-full bg-white z-10">
    <div class="border-b border-gray-400 shadow h-full w-full flex">
      <div class="w-2/12 flex justify-end">
        <router-link to="/dashboard" class="flex items-end py-2">
          <i class="fab fa-stack-overflow text-3xl"></i>
          <p class="font-light pl-1">Hacktiv<span class="font-bold">Overflow</span></p>
        </router-link>
      </div>
      <div v-if="!isLogin" class="w-2/12 ml-auto mr-20 flex items-center justify-around text-sm">
        <router-link to="/login" class="text-blue-600">Login</router-link>
        <router-link to="/register" class="px-3 py-1 bg-blue-600 rounded text-white"
          >Register</router-link
        >
      </div>

      <div v-else class="w-2/12 ml-auto flex items-center justify-around text-sm">
        <button @click="userSignOut" class="px-3 py-1 bg-red-500 text-white rounded text-sm">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: mapMutations(['userSignOut']),
  computed: mapGetters(['isLogin'])
}
</script>

<style>
.test {
  background-color: #fafafb;
}
</style>
