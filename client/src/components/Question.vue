<template>
  <div>
    <b-card no-body style="width: 100%; height: 18vh;border:none;">
      <b-row>
        <div class="px-5" style="width: 100%; display: flex; justify-content: space-between;">
          <p>
            Title:
            <b-link style="color: #40a8db;" :to="`/detail/${question._id}`">{{ question.title }}</b-link>
          </p>
          <div v-if="condition">
            <b-button
              pill
              variant="danger"
              style="margin-right:20px"
              @click.prevent="deleteQuestion(question._id)"
            >
              <i class="fa fa-trash" aria-hidden="true" style="cursor: pointer;">Delete</i>
            </b-button>
            <b-button pill variant="success" v-b-modal="`${question._id}`">
              <i
                class="fa fa-pencil"
                aria-hidden="true"
                style="margin-right: 10px; cursor: pointer;"
              >Edit</i>
            </b-button>
          </div>
        </div>
      </b-row>
      <b-row style="margin-left:30px">
        <a href="#" v-for="(tag,index) in question.tags" :key="index">
          <vs-chip>{{tag}}</vs-chip>
        </a>
      </b-row>
      <b-row no-gutters class="mt-2">
        <b-col
          cols="4"
          style="height: 100%; font-size: 30px; display:flex; justify-content: space-around; align-items: center; color: #676a6b;"
        >
          <div style="height: 100%; margin-left:25px">
            <p style="text-align: center; margin: 0; font-size: 15px;">{{ question.upvotes.length }}</p>
            <strong>
              <p style="font-size: 15px;">upvotes</p>
            </strong>
          </div>
          <div style="height: 100%;">
            <p
              style="text-align: center; margin: 0; font-size: 15px;"
            >{{ question.downvotes.length }}</p>
            <strong>
              <p style="font-size: 15px;">downvotes</p>
            </strong>
          </div>
          <div style="height: 100%;">
            <p class="text-center m-0" style="font-size: 15px;">{{ question.answer.length }}</p>
            <strong>
              <p style="font-size: 15px;">answers</p>
            </strong>
          </div>
        </b-col>
        <b-col
          cols="8"
          class="p-2"
          style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;"
        >
          <div
            style="width: 90%; color: #676a6b; font-size: 12px; display: flex; flex-direction: column; align-items:flex-end;"
          >
            <strong>
              <p style="margin: 0;">by: {{ question.author.name }}</p>
            </strong>
            <strong>
              <p style="margin: 0;">update {{ moment(question.updatedAt).fromNow() }}</p>
            </strong>
          </div>
        </b-col>
      </b-row>

      <b-modal :id="question._id" size="lg" title="Edit Question:">
        <b-form-group label="Title:" label-for="input-1" style="width: 100%">
          <b-form-input
            id="input-1"
            type="text"
            required
            v-model="form.title"
            placeholder="Insert Title here.."
          ></b-form-input>
        </b-form-group>
        <wysiwyg id="wysiwyg" v-model="form.question"></wysiwyg>
        <template slot="modal-footer">
          <b-button
            variant="success"
            style="width: 10%;"
            @click.prevent="editQuestion(question._id)"
          >Edit</b-button>
        </template>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      moment,
      condition: this.status,
      form: {
        title: "",
        question: ""
      }
    };
  },
  created() {
    this.form.title = this.question.title;
    this.form.question = this.question.description;
  },
    props: {
    question: Object,
    status: Boolean
  },
  methods: {
    deleteQuestion(id) {
      Swal.fire({
        title: "Delete this Question ?",
        text: "You won't be able to revert this!",
        type: "question",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#1ebf19",
        confirmButtonText: "Confirm"
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch("deleteUserQuestion", id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editQuestion(id) {
      const payload = {
        id: id,
        title: this.form.title,
        description: this.form.question
      };
      Swal.fire({
        title: "Are you sure want to edit this ?",
        text: "You won't be able to revert this",
        type: "question",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#1ebf19",
        confirmButtonText: "Confirm"
      })
        .then(result => {
          if (result.value) {
            console.log(payload, "<<<<< masuk editQuestion component");
            this.$store.dispatch("editQuestion", payload);
            this.$bvModal.hide(`${id}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>