<template>
  <div class="w-2/12 fixed mt-24 z-10">
    <ul class="ml-20">
      <li class="text-sm mb-2 text-gray-700 hover:text-black" v-for="list in lists">
        <router-link :to="list.to">
          {{ list.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [{ name: 'Dashboard', to: '/dashboard' }, { name: 'Questions', to: '/questions' }]
    }
  }
}
</script>

<style></style>
