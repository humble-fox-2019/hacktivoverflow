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
            {{questionVotes}}
            <br />votes
          </p>
        </div>
        <div class="text-center">
          <p style="font-size:14px">
            {{question.answers.length}}
            <br />answer
          </p>
        </div>
      </div>
      <div
        v-if="isDetail"
        class="ml-2 mr-2 mb-5 p-2"
        style="width:18%;display:flex;flex-direction:column;justify-content:center;"
      >
        <div class="text-center">
          <v-btn @click="upvote(question._id)" text elevation="8" color="#FFB300">
            <v-icon large>arrow_upward</v-icon>
          </v-btn>
        </div>
        <div class="text-center mt-5">
          <p style="font-size:14px">{{questionVotes}}</p>
        </div>
        <div class="text-center">
          <v-btn @click="downvote(question._id)" text elevation="8" color="#FFB300">
            <v-icon large>arrow_downward</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{question.title}}</h5>
        <br />
        <p class="card-text text-justify">{{question.description}}</p>
        <p style="font-size:13px">by : {{question.UserId.username}}</p>
        <p style="font-size:13px">{{getDate(question.createdAt)}}</p>
        <!-- <p>on  -->
        <v-chip
          color="#FFB300"
          class="mb-2 mr-2"
          v-for="(tag,index) in question.tags"
          :key="index"
        >{{tag}}</v-chip>
        <center>
          <div>
            <v-btn v-if="!isDetail" small dark @click="gotoQuestionDetail(question._id)">view</v-btn>
          </div>
        </center>
      </div>
      <div
        v-if="isUser"
        class="ml-2 mr-2 mb-5 p-2"
        style="width:18%;display:flex;flex-direction:column;justify-content:center;"
      >
        <div class="text-center">
          <v-btn color="#FFB300" small class="mb-4" @click="editForm(question)">edit</v-btn>
        </div>
        <div class="text-center">
          <v-btn color="#FFB300" small class="mt-4" @click="removeQuestion(question._id)">delete</v-btn>
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
                <v-col cols="12">
                  <v-combobox
                    v-model="formEdit.tags"
                    hide-selected
                    label="Add some tags"
                    multiple
                    persistent-hint
                    small-chips
                    deletable-chips
                  ></v-combobox>
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
  name: "question",
  props: {
    question: Object,
    isUser: Boolean,
    isDetail: Boolean
  },
  data() {
    return {
      dialog: false,
      formEdit: {
        title: "",
        description: "",
        tags: [],
        id: ""
      }
    };
  },
  methods: {
    editForm(question) {
      this.formEdit.title = question.title;
      this.formEdit.description = question.description;
      this.formEdit.tags = question.tags;
      this.formEdit.id = question._id;
      this.dialog = true;
    },
    edit() {
      // console.log(this.formEdit);
      // this.$store.dispatch("editQuestions", this.formEdit)
      this.$swal.showLoading();
      let updatedData = this.formEdit;
      this.$store
        .dispatch("editQuestions", updatedData)
        .then(success => {
          // console.log(success);
          this.$swal.close();
          this.$swal.fire({
            type: "success",
            title: "successfully edited questions"
          });
          this.formEdit.title = "";
          this.formEdit.description = "";
          this.formEdit.tags = [];
          this.formEdit.id = "";
          this.dialog = false;
        })
        .catch(err => {
          let message =
            (err.response.data && err.response.data.message) ||
            "failed to edit question";
          this.$swal.close();
          this.$swal.fire({
            type: "error",
            title: "failed to edit question",
            text: message
          });
          // console.log(err.response.data);
        });
    },
    upvote(id) {
      this.$store.dispatch("upvote", { id, routes: "questions" });
    },
    downvote(id) {
      this.$store.dispatch("downvote", { id, routes: "questions" });
    },
    removeQuestion(id) {
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
            this.$store.dispatch("deleteQuestion", id);
          }
        });
    },
    gotoQuestionDetail(id) {
      this.$router.push(`/question/${id}`);
    },
    getDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  },
  computed: {
    questionVotes() {
      return this.question.upvotes.length - this.question.downvotes.length;
    }
  },
  created() {}
};
</script>

<style scoped src="mdbvue/build/css/mdb.css">
</style>
