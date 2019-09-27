<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="8" v-for="(index,i) in this.$store.state.questions" :key="i">
          <card :questions="index"></card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import card from "../components/cardAll";
export default {
  components: {
    card
  },
  created() {
    console.log("masuk kesini gan");
    this.$store.dispatch("fetchQuestion");
  }
};
</script>

<style>
</style>