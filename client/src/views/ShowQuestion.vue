<template>
  <section id="show-question-page">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Question</div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col-1">
                  <a @click.prevent="upvote(questionDetail._id)" href="#">
                    <i class="fa fa-sort-up"></i>
                  </a>
                  <p>{{ (questionDetail.upvotes.length - questionDetail.downvotes.length) }}</p>
                  <a @click.prevent="downvote(questionDetail._id)" href="#">
                    <i class="fa fa-sort-down"></i>
                  </a>
                </div>
                <div class="col-10">
                  <b>{{questionDetail.title}}</b>
                  <p>{{questionDetail.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="answer in questionDetail.answers" :key="answer.id" class="col-md-12 my-2">
        <div class="card">
          <div class="card-header">Answer</div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col-10">
                  <p>{{ answer.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 my-3">
        <div class="card">
          <div class="card-header">Enter Your Answer</div>
          <div class="card-body">
            <form @submit.prevent="addAnswer({questionId: questionDetail._id})" action="#">
              <div class="form-group">
                <label for="#">Description</label>
                <textarea v-model="formAnswer['description']" rows="5" class="form-control"></textarea>
              </div>
              <button type="submit" class="btn btn-primary px-3">Submit Answer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ShowQuestion",
  watch: {
    $route(to, from) {
      this.getQuestionDetail(to.params.id)
    }
  },
  computed: {
    formAnswer: {
      get() {
        return this.$store.state.formAnswer;
      },
      set(val) {
        return this.$store.commit("updateFormAnswer", val);
      }
    },
    questionDetail() {
      return this.$store.state.questionDetail;
    }
  },
  created() {
    this.getQuestionDetail(this.$route.params.id);
  },
  methods: {
    getQuestionDetail(id) {
      this.$store.dispatch("getQuestionDetail", id);
    },
    addAnswer(payload) {
      this.$store.dispatch("addAnswer", payload);
    },
    upvote(_id) {
      return this.$store.dispatch("upvoteQ", _id);
    },
    downvote(_id) {
      return this.$store.dispatch("downvoteQ", _id);
    }
  }
};
</script>

<style>
</style>