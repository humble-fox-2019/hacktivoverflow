<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h3 class="headline" v-if="mode === 'create'">Create Thread</h3>
              <h3 class="headline" v-if="mode === 'edit'">Edit Thread</h3>
              <h3 class="headline" v-if="mode === 'createReply'">Create Reply</h3>
              <h3 class="headline" v-if="mode === 'editReply'">Edit Reply</h3>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Title"
                    v-model="title"
                    hint="*Required"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <wysiwyg v-model="body" lazy />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-spacer></v-spacer>
              <v-btn class="mr-4" color="red" @click="toggleDialog" dark>Cancel</v-btn>
              <v-btn class="mr-4" color="indigo" v-if="mode === 'create'" dark>Create</v-btn>
              <v-btn class="mr-4" color="indigo" v-if="mode === 'edit'" dark>Edit</v-btn>
              <v-btn class="mr-4" color="indigo" v-if="mode === 'createReply'" dark>Create</v-btn>
              <v-btn class="mr-4" color="indigo" v-if="mode === 'editReply'" dark>Edit</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["dialog", "payload", "mode"],
  data() {
    return {
      id: "",
      title: "",
      body: ""
    };
  },
  methods: {
    toggleDialog() {
      this.$emit("toggleDialog");
    },
    createThread() {
      this.$emit("toggleDialog");
    }
  },
  created() {
    this.$forceUpdate();
    if (this.mode === "edit" || this.mode === "editReply") {
      // this.id = this.payload.id;
      this.title = this.payload.title;
      this.body = this.payload.body;
    }
  },
  watch: {}
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

