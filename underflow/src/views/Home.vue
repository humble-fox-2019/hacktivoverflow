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
                <FilterBar />
              </v-col>

              <!-- Loop Cards -->
              <ThreadCards v-for="(n, i) in 12" :key="n" :metaThread="i" />
              <!-- Loop End -->
            </v-row>
          </v-container>
        </v-card>
      </v-responsive>
    </v-col>
  </v-row>
</template>

<script>
import FilterBar from "../components/Filter";
import ThreadCards from "../components/ThreadCards";

export default {
  data() {
    return { drawer: null };
  },
  components: {
    FilterBar,
    ThreadCards
  },
  methods: {
    // toggleDrawer() {
    //   this.drawer = !this.drawer
    // }
  }
};
</script>
