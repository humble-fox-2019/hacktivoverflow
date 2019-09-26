<template>
  <b-card bg-variant="dark" text-variant="white" :title="questions.title">
    <b-card-text>{{questions.content}}</b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ["questions"],
  //   data() {
  //     return {
  //       id: this.$router.params.id
  //     };
  //   },
  methods: {
    findOneQuestion() {
      console.log(this.$route.params.id, "<<< PARAMS IDNYA INI");
      this.$store.dispatch("fetchOneQuestion", this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("fetchOneQuestion", this.$route.params.id);
  }
};
</script>

<style>
</style>