<template>
  <b-card bg-variant="dark" text-variant="white" :title="questions.title" class="mt-3 card-inside">
    <b-card-text>
      <!-- {{questions._id}} -->
      {{questions.content}}
    </b-card-text>
    <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    <b-button variant="outline-primary" @click="changePageAnswer(questions._id)">go answer</b-button>
  </b-card>
</template>
<script>
export default {
  props: ["questions"],
  methods: {
    changePageAnswer(id) {
      this.$router.push(`/home/${id}`).catch(() => {});
    }
  }
};
</script>

<style>
.card-inside {
  width: 100%;
}
</style>