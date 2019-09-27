<template>
  <div class="container" style="display:flex;justify-content:center;flex-direction:column">
    <h3 class="mt-3 mb-3">My answer</h3>

    <div>
      <v-data-iterator
        :items="userAnswers"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :hide-default-footer="hidefooter"
      >
        <template v-slot:default="props">
          <answer v-for="answer in props.items" :key="answer._id" :answer="answer" :isUser="true"></answer>
          <v-pagination
            color="#FFB300"
            v-model="page"
            :length="getPageslength"
            class="mt-4 p-3"
            circle
          ></v-pagination>
        </template>
      </v-data-iterator>
    </div>
  </div>
</template>

<script>
import answer from "../components/answer";
import { mapState } from "vuex";
export default {
  name: "userAnswers",
  components: {
    answer
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 2,
      hidefooter: true
    };
  },
  computed: {
    ...mapState(["userAnswers"]),

    getPageslength() {
      return Math.ceil(this.userAnswers.length / 2);
    }
  },
  methods: {},
  created() {
    this.$store.dispatch("getUserAnswers");
  }
};
</script>

<style>
</style>
