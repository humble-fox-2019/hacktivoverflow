<template>
  <div>
    <div class="content">
      <nav class="breadcrumb bg-white push">
        <a class="breadcrumb-item" href="#">Forum</a>
        <a class="breadcrumb-item" href="#">Question</a>
        <span class="breadcrumb-item active">{{questions.title}}</span>
      </nav>
      <div class="block">
        <div class="block-header block-header-default">
          <h3 class="block-title">Question</h3>
        </div>
        <div class="block-content">
          <!-- Discussion -->
          <table class="table table-borderless">
            <tbody>
              <tr class="table-active">
                <td class="d-none d-sm-table-cell"></td>
                <td class="font-size-sm text-muted">
                  <a href="#">{{questions.userId.name}}</a> asked
                  <em>{{getTimeAgo(questions.createdAt)}}</em>
                </td>
              </tr>
              <tr>
                <td class="d-none d-sm-table-cell text-center" style="width: 140px;">
                  <div class="mb-10">
                      <button class="btn btn-link text-dark p-0 m-0" style="font-size:30px;" v-if="token">
                        <i class="fas fa-sort-up"></i>
                      </button>
                      <h4 class="font-weight-bold p-0 m-0">{{questions.upvotes.length - questions.downvotes.length}}</h4>
                      <button class="btn btn-link text-dark p-0 m-0" style="font-size:30px;" v-if="token">
                        <i class="fas fa-sort-down"></i>
                      </button>
                    </div>
                  <small>
                    446 Reputation
                    <br />
                  </small>
                </td>
                <td>
                  <h2>{{questions.title}}</h2>

                  <p>{{questions.content}}</p>
                  <hr />
                  <router-link v-for="(tag, index) in questions.tags" :key="index" :to="`/tag/${tag}`">
                    <span class="badge badge-primary ml-1">{{tag}}</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- END Discussion -->
        </div>
      </div>

      <div class="block">
        <div class="block-header block-header-default">
          <h3 class="block-title">Answers</h3>
        </div>
        <div class="block-content">
          <!-- Discussion -->
          <table class="table table-borderless">
            <tbody>
              <template v-for="answer in questions.answers">
                <tr class="table-active" id="forum-reply-form" :key="`headAnsware${answer._id}`">
                  <td class="d-none d-sm-table-cell"></td>
                  <td class="font-size-sm text-muted">
                    <a href="#">{{answer.userId.name}}</a> answared
                    <em>{{getTimeAgo(answer.userId.createdAt)}}</em>
                  </td>
                </tr>
                <tr :key="`bodyAnsware${answer._id}`">
                  <td class="d-none d-sm-table-cell text-center" style="width: 140px;">
                    <div class="mb-10">
                      <button class="btn btn-link text-dark p-0 m-0" style="font-size:30px;" v-if="token">
                        <i class="fas fa-sort-up"></i>
                      </button>
                      <h4 class="font-weight-bold p-0 m-0">{{answer.upvotes.length - answer.downvotes.length}}</h4>
                      <button class="btn btn-link text-dark p-0 m-0" style="font-size:30px;" v-if="token">
                        <i class="fas fa-sort-down"></i>
                      </button>
                    </div>
                    
                    <small>
                      446 Reputation
                      <br />
                    </small>
                  </td>
                  <td>
                    <p>{{answer.content}}</p>
                    <hr />
                  </td>
                </tr>
              </template>

              <tr class="table-active" id="forum-reply-form">
                <td class="d-none d-sm-table-cell"></td>
                <td class="font-size-sm text-muted"></td>
              </tr>
              <tr v-if="token">
                <td class="d-none d-sm-table-cell text-center">
                  <div class="mb-10">
                    <a href="#">
                      <img
                        class="img-avatar"
                        src="https://icon-library.net/images/profile-image-icon/profile-image-icon-25.jpg"
                        alt
                      />
                    </a>
                  </div>
                  <small>
                    240 Reputation
                    <br />Level 9
                  </small>
                </td>
                <td>
                  <form
                    action="be_pages_forum_discussion.html"
                    method="post"
                    onsubmit="return false;"
                  >
                    <div class="form-group row">
                      <div class="col-12">
                        <quillEditor></quillEditor>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div class="form-group">
                      <button type="submit" class="btn btn-alt-primary">
                        <i class="fas fa-forward"></i> Reply
                      </button>
                    </div>
                  </form>
                </td>
              </tr>
              
              <tr  v-else>
                <td colspan="2"><h4>You must login first to leave a comment. <router-link to="/login">login</router-link></h4></td>
              </tr>
            </tbody>
          </table>
          <!-- END Discussion -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import moment from 'moment';
 
export default {
  created() {
    this.FETCH_QUESTION(this.$route.params.id);
  },
  components: {
    quillEditor
  },
  computed: {
    ...mapState(["questions", "token"])
  },
  methods: {
    ...mapActions(["FETCH_QUESTION"]),
    getTimeAgo: (date) => {
      return moment(date, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.quill-editor,
.quill-code {
  height: 10rem;
}
.quill-editor {
  border: 1px solid #ccc;
  border-bottom: none;
}
.quill-code {
  border: none;
  height: auto;
  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0;
  }
}
</style>