<template>
  <div class="card flex-col mt-3 hoverable" style="width:800px;border:4px solid #FFB300">
    <div style="display:flex;justify-content:row">
      <div
        v-if="!isDetail"
        class="ml-2 mr-2 mb-5 p-2"
        style="width:18%;display:flex;flex-direction:column;justify-content:center;"
      >
        <div class="text-center">
          <p style="font-size:14px">
            {{answerVotes}}
            <br />votes
          </p>
        </div>
      </div>
      <div
        v-if="isDetail"
        class="ml-2 mr-2 mb-5 p-2"
        style="width:18%;display:flex;flex-direction:column;justify-content:center;"
      >
        <div class="text-center">
          <v-btn @click="upvote(answer._id)" text elevation="8" color="#FFB300">
            <v-icon large>arrow_upward</v-icon>
          </v-btn>
        </div>
        <div class="text-center mt-5">
          <p style="font-size:14px">{{answerVotes}}</p>
        </div>
        <div class="text-center">
          <v-btn @click="downvote(answer._id)" text elevation="8" color="#FFB300">
            <v-icon large>arrow_downward</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{answer.title}}</h5>
        <br />
        <p class="card-text text-justify">{{answer.description}}</p>
        <p style="font-size:13px">by : {{answer.UserId.username}}</p>
        <p style="font-size:13px">Date</p>
        <!-- <p>on  -->
      </div>
      <div
        v-if="isUser"
        class="ml-2 mr-2 mb-5 p-2"
        style="width:18%;display:flex;flex-direction:column;justify-content:center;"
      >
        <div class="text-center">
          <v-btn color="#FFB300" small class="mb-4" @click="editForm(answer)">edit</v-btn>
        </div>
        <div class="text-center">
          <v-btn color="#FFB300" small class="mt-4" @click="removeAnswer(answer._id,answer.QuestionId)">delete</v-btn>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card color="#FFB300">
        <v-form @submit.prevent="edit">
          <v-card-title>
            <span class="headline">New Question</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="formEdit.title" label="Title" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea label="Description" v-model="formEdit.description" auto-grow></v-textarea>
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
export default {
  name: "answer",
  props: {
    answer: Object,
    isDetail: Boolean,
    isUser: Boolean
  },
  data() {
    return {
      dialog: false,
      formEdit: {
        title: "",
        description: "",
        id: ""
      }
    };
  },
  computed: {
    answerVotes() {
      return this.answer.upvotes.length - this.answer.downvotes.length;
    }
  },
  methods: {
    editForm(answer) {
      this.formEdit.title = answer.title;
      this.formEdit.description = answer.description;
      this.formEdit.id = answer._id;
      this.dialog = true;
    },
    edit() {
      // console.log(this.formEdit);
      // this.$store.dispatch("editQuestions", this.formEdit)
      this.$swal.showLoading();
      let updatedData = this.formEdit;
      this.$store
        .dispatch("editAnswers", updatedData)
        .then(success => {
          // console.log(success);
          this.$swal.close();
          this.$swal.fire({
            type: "success",
            title: "successfully edited Answers"
          });
          this.formEdit.title = "";
          this.formEdit.description = "";
          this.formEdit.id = "";
          this.dialog = false;
        })
        .catch(err => {
          let message = err.response.data && err.response.data.message || "failed to edit answer";
          this.$swal.close();
          this.$swal.fire({
            type: "error",
            title: "failed to edit answer",
            text: message
          });
          // console.log(err.response.data);
        });
    },
    removeAnswer(id,QuestionId) {
      // console.log(id)
      // console.log(QuestionId)
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.$store.dispatch("deleteAnswer", {id,QuestionId})
          }
        })

      },
    upvote(id) {
      this.$store.dispatch("upvote", {
        id,
        routes: "answers",
        QuestionId: this.$route.params.id
      });
    },
    downvote(id) {
      this.$store.dispatch("downvote", {
        id,
        routes: "answers",
        QuestionId: this.$route.params.id
      });
    }
  }
};
</script>

<style scoped src="mdbvue/build/css/mdb.css">
</style>
