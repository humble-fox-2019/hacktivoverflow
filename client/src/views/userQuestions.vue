<template>
  <div class="container" style="display:flex;justify-content:center;flex-direction:column">
    <h3 class="mt-3 mb-3">My Questions</h3>

    <div>
      <v-data-iterator
        :items="userQuestions"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :hide-default-footer="hidefooter"
      >
        <template v-slot:default="props">
          <questionComp
            v-for="question in props.items"
            :key="question._id"
            :question="question"
            :isUser="true"
          ></questionComp>
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
import { mapState } from "vuex";
import questionComp from "../components/question";
export default {
  name: "userquestions",
  components: {
    questionComp
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 2,
      hidefooter: true
    };
  },
  methods: {},
  computed: {
    ...mapState(["userQuestions"]),
    getPageslength() {
      return Math.ceil(this.userQuestions.length / 2);
    }
  },
  created() {
    this.$store.dispatch("getUserQuestions");
  }
};
</script>

<style>
</style>
