<template>
  <div class="container mt-3">
    <!-- <h1>{{questionDetail}}</h1> -->
    <question :question="questionDetail" :isDetail="true"></question>
    <div class="p-3 mt-2" style="display:flex;justify-content:center;width:800px;">
      <v-btn color="#FFB300" @click="dialog=true">Answer</v-btn>
    </div>

    <v-data-iterator
      :items="answers"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :hide-default-footer="hidefooter"
    >
      <template v-slot:default="props">
        <answerComp
          v-for="answer in props.items"
          :key="answer._id"
          :answer="answer"
          :isDetail="true"
        ></answerComp>

        <div class="p-3 mt-2" style="display:flex;justify-content:center;width:800px;">
          <v-pagination
            color="#FFB300"
            v-model="page"
            :length="getPageslength"
            class="mt-4 p-3"
            circle
          ></v-pagination>
        </div>
      </template>
    </v-data-iterator>
    <!-- <answerComp v-for="answer in answers" :key="answer._id" :answer="answer" :isDetail="true" ></answerComp> -->

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card color="#FFB300">
        <v-form @submit.prevent="createAnswer">
          <v-card-title>
            <span class="headline">New Question</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="formAnswer.title" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea label="Description" v-model="formAnswer.description" auto-grow></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="dialog = false">Close</v-btn>
            <v-btn type="submit" autofocus>Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import question from "../components/question";
import answerComp from "../components/answer";
export default {
  name: "questiondetailpage",
  components: {
    question,
    answerComp
  },
  data() {
    return {
      dialog: false,
      page: 1,
      itemsPerPage: 2,
      hidefooter: true,
      formAnswer: {
        title: "",
        description: "",
        QuestionId: this.$route.params.id
      }
    };
  },
  computed: {
    ...mapState(["questionDetail"]),
    answers() {
      return this.questionDetail.answers;
    },
    getPageslength() {
      return Math.ceil(this.questionDetail.answers.length / 2);
    }
  },
  methods: {
    createAnswer() {
      this.$swal.showLoading();
      //   console.log(this.formAnswer);
      this.$store
        .dispatch("createAnswer", this.formAnswer)
        .then(() => {
          this.$swal.close();
          this.dialog = false;
          this.formAnswer.title = "";
          this.formAnswer.description = "";
          this.$swal.fire({
            type: "success",
            title: "success to create answer"
          });
        })
        .catch(err => {
          this.$swal.close();
          let message =
            (err.response.data && err.response.data.message) ||
            "failed to create answer";
          this.$swal.fire({
            type: "error",
            title: "failed to create answer",
            text: message
          });
        });
    }
  },

  created() {
    this.$store.dispatch("getOneQuestion", this.$route.params.id);
  }
};
</script>

<style>
</style>
