<template>
  <div class="question mt-3">
    <cardQuestion :questions="this.$store.state.findOne"></cardQuestion>

    <!-- BAGIAN UNTUK INPUT PERTANYAAN -->
    <div class="answerPage mt-5 justify-content-center col-9 align-items-center">
      <!-- isi modals -->

      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        description="tell us about your issue"
        label="Content"
        label-for="input-horizontal"
      >
        <b-form-input id="input-horizontal" v-model="content"></b-form-input>
        <b-button
          class="col-4 mt-4 ml-5"
          variant="outline-success"
          block
          @click="createNewAnswer"
        >Post</b-button>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import cardQuestion from "../components/cardQuestion";
export default {
  data() {
    return {
      content: ""
    };
  },
  components: {
    cardQuestion
  },
  methods: {
    createNewAnswer() {
      let payload = {
        content: this.content,
        questionId: this.$route.params.id
      };

      console.log(payload, "<<<< DILIAT DULU ISI PAYLOADNYA BROH");
      this.$store.dispatch("createAnswer", payload).then(data => {
        this.content = "";
      });
    }
  }
};
</script>

<style>
</style>