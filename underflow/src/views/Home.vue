<template>
  <v-row>
    <v-col>
      <v-responsive>
        <v-card elevation="12">
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <h1 class="display-2">All Threads</h1>
              </v-col>
              <v-col cols="12">
                <!-- <FilterBar /> -->
              </v-col>

              <!-- Loop Cards -->
              <ThreadCards
                v-for="thread in $store.state.threads"
                :key="thread._id"
                :metaThread="thread"
              />
              <!-- Loop End -->
            </v-row>
          </v-container>
        </v-card>
      </v-responsive>
      <PostModal :dialog="dialog" @toggleDialog="dialog = !dialog" :mode="mode" :key="modalKey" />
    </v-col>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="red"
          bottom
          right
          fixed
          dark
          class="ma-4"
          v-on="on"
          @click="randomizeModalKey();dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>New Thread</span>
    </v-tooltip>
  </v-row>
</template>

<script>
// import FilterBar from "../components/Filter";
import ThreadCards from "../components/ThreadCards";
import PostModal from "../components/PostModal";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      dialog: false,
      drawer: null,
      mode: "create",
      modalKey: 0
    };
  },
  components: {
    // FilterBar,
    ThreadCards,
    PostModal
  },
  methods: {
    randomizeModalKey() {
      this.modalKey = Math.floor(Math.random() * 100000);
    }
  },
  computed: {},
  created: function() {
    this.$store.dispatch("fetchThreads");
  }
};
</script>

<style>
</style>