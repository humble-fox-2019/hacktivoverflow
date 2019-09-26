<template>
  <div>
    <div class="content">
      <nav class="breadcrumb bg-white push">
        <a class="breadcrumb-item" href="#">Forum</a>
        <a class="breadcrumb-item" href="#">Answare</a>
        <span class="breadcrumb-item active">Edit</span>
      </nav>
      <div class="block">
        <div class="block-header block-header-default">
          <h3 class="block-title">Edit Answare</h3>
        </div>
        <div class="block-content">
          <div class="col-md-12">
            <form v-on:submit.prevent="onSubmit">
             
              <div class="form-group row">
                <label class="col-lg-3 col-form-label" for="example-hf-email">Content</label>
                <div class="col-lg-7">
                  <quillEditor v-model="content"></quillEditor>
                </div>
              </div>

              <div class="form-group row" style="padding-top: 100px">
                <div class="col-lg-9 ml-auto">
                  <button type="submit" class="btn btn-alt-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
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

import axios from "@/apis/axios";
import errorHandling from "@/helpers/errorHandling";
import Toast from "@/helpers/toast";

export default {
  name: "editquestion",
  data() {
    return {
      content: "",
      questionId: ""
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onSubmit() {
      axios({
        url: "/answers/" + this.$route.params.id,
        method: "patch",
        data: {
          content: this.content
        },
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Updated successful"
          });
          this.$router.push("/question/" + this.questionId);
        })
        .catch(errorHandling);
    },
    getAnswer() {
      axios({
        url: "/answers/" + this.$route.params.id,
        method: "get",
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.content = data.content
          this.questionId = data.questionId
        })
        .catch(errorHandling);
    }
  },
  computed: {
    ...mapState(["token", "user"])
  },
  created() {
    this.getAnswer();
    if(!this.token) {
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>
.quill-editor,
.quill-code {
  height: 20rem;
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