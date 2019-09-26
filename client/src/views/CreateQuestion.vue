<template>
  <div>
    <b-form-group label="Title:" label-for="input-1" style="width: 100%">
      <b-form-input
        id="input-1"
        type="text"
        required
        v-model="form.title"
        placeholder="Insert Title here.."
      ></b-form-input>
    </b-form-group>
    <wysiwyg id="wysiwyg" v-model="form.question"></wysiwyg><br/>
    <div id="tagcontainer">
      <vue-tags-input
        id="insidetag"
        v-model="form.tag"
        :tags="form.tags"
        @tags-changed="newTags => form.tags = newTags"
      />
    </div>
    <b-button
      style="width: 20%; margin-top: 20px;"
      variant="success"
      @click.prevent="submitQuestion"
    >
      <i class="fa fa-paper-plane-o" aria-hidden="true"></i> Submit
    </b-button>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      form: {
        title: "",
        question: "",
        tag: "",
        tags: []
      }
    };
  },
  methods: {
    submitQuestion() {
      let taggs = [];
      for (let i = 0; i < this.form.tags.length; i++) {
        taggs.push(this.form.tags[i].text);
      }
      const payload = {
        title: this.form.title,
        description: this.form.question,
        tags: taggs
      };
      this.$store.dispatch("createQuestion", payload);
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>