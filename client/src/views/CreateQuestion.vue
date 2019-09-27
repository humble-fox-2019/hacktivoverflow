<template>
  <section id="create-question-page">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Create Question</div>
          <div class="card-body">
            <form @submit.prevent="createQuestion" action="#">
              <div class="form-group">
                <label for="#">Title</label>
                <input v-model="formQuestion.title" autofocus type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="#">Description</label>
                <textarea
                  v-model="formQuestion.description"
                  name="#"
                  id="#"
                  rows="5"
                  class="form-control"
                ></textarea>
              </div>
              <button class="btn btn-primary px-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "create-question",
  created () {
      this.formQuestion["title"] = "";
      this.formQuestion["description"] = "";
  },
  destroyed() {
      this.formQuestion["title"] = "";
      this.formQuestion["description"] = "";
  },
  computed: {
    formQuestion: {
      get() {
        return this.$store.state.formQuestion;
      },
      set(val) {
        return this.$store.commit("updateFormQuestion", val);
      }
    }
  },
  methods: {
      createQuestion() {
          this.$store.dispatch("createQuestion")
      }
  },
};
</script>

<style>
</style>