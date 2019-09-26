<template>
  <div class="content">
    <nav class="breadcrumb bg-white push">
      <a class="breadcrumb-item" href="#">Home</a>
      <span class="breadcrumb-item active">Questions</span>
    </nav>
    <div class="block">
      <div class="block-header block-header-default">
        <h3 class="block-title">Questions</h3>
        <div class="block-options" v-if="token">
          <router-link class="btn-block-option" to="/question/add">
            <i class="fas fa-plus"></i> Ask a question
          </router-link>
        </div>
      </div>
      <div class="block-content">
        <table class="table table-striped table-borderless table-vcenter">
          <thead class="thead-light">
            <tr>
              <th colspan="2">Welcome</th>
              <th class="d-none d-md-table-cell text-center" style="width: 100px;">Votes</th>
              <th class="d-none d-md-table-cell text-center" style="width: 100px;">Answers</th>
              <th class="d-none d-md-table-cell" style="width: 200px;">Last Post</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in questions" :key="question._id">
              <td colspan="2">
                <router-link class="font-w600" :to="`/question/${question._id}`">{{question.title}}</router-link>
                <div class="font-size-sm text-muted mt-5">
                  <router-link v-for="(tag, index) in question.tags" :key="index" :to="`/tag/${tag}`">
                    <span class="badge badge-primary ml-1">{{tag}}</span>
                  </router-link>
                </div>
              </td>
              <td class="d-none d-md-table-cell text-center">
                <a
                  class="font-w600"
                  href="javascript:void(0)"
                >{{question.upvotes.length - question.downvotes.length}}</a>
              </td>
              <td class="d-none d-md-table-cell text-center">
                <a class="font-w600" href="javascript:void(0)">{{question.answers.length}}</a>
              </td>
              <td class="d-none d-md-table-cell">
                <span class="font-size-sm">
                  by
                  <a href="#">{{question.userId.name}}</a>
                  <br /> asked
                  <em>{{getTimeAgo(question.createdAt)}}</em>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
  name: "home",
  data() {
    return {
      token: ""
    };
  },
  methods: {
    getTimeAgo: (date) => {
      return moment(date, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).tz('Asia/Jakarta').fromNow();
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  created() {
    this.token = this.$store.state.token;
    this.$store.dispatch("FETCH_QUESTIONS");
  }
};
</script>
