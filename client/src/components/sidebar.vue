<template>
  <div class="col-3 mt-3">
    <h4 class="mb-4">Watched Tags</h4>
    <v-btn color="#FFB300" class="mr-3" small @click="changeTag('')">All</v-btn>
    <v-btn color="#FFB300" small @click="showForm">Edit Tags</v-btn>

    <div class="mt-3 mb-3">
      <v-chip color="#FFB300" class="mb-2 mr-2" v-for="(tag,index) in userTags" :key="index" @click="changeTag(tag)">{{tag}}</v-chip>
    </div>

    <!-- dialog edit tags -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-card>
        <v-card-title>
          <span class="headline">Tags</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-combobox
                v-model="tags"
                hide-selected
                label="Add some tags"
                multiple
                persistent-hint
                small-chips
                deletable-chips
              ></v-combobox>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addTags">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "sidebar",
  data() {
    return {
      tags: [],
      dialog: false
    };
  },
  computed: {
    ...mapState(["userTags","selectedTag"])
  },
  methods: {
    changeTag(tag){
      // console.log(tag)
      this.$store.commit("SELECTED_TAG", tag)

    },
    addTags() {
      this.$swal.showLoading();
      this.$store
        .dispatch("addTags", { tags: this.tags })
        .then(success => {
          this.$swal.close();
          if (!this.tags.includes(this.selectedTag)){
            // console.log("mamamia")
            this.$store.commit("SELECTED_TAG", "")
          }
          this.$swal.fire({
            type: "success",
            title: "success adding tags"
          });
          this.dialog = false;
        })
        .catch(err => {
          this.$swal.close();
          let message =
            (err.response.data && err.response.data.message) ||
            "failed to add tags";
          this.$swal.fire({
            type: "error",
            title: "failed to add tags",
            text: message
          });
          // console.log(err)
        });
    },
    showForm() {
      this.dialog = true;
      this.tags = this.userTags;
    }
  }
};
</script>

<style>
</style>
