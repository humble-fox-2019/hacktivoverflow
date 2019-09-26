<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="1" class="d-flex flex-column align-center mt-n4">
        <v-btn
          icon
          x-large
          :class="{'indigo--text': voteStatus === 1}"
          @click="voteStatus === 1 ? voteStatus = 0  : voteStatus = 1"
        >
          <v-icon>mdi-arrow-up-circle-outline</v-icon>
        </v-btn>
        <h4
          :class="{'orange--text': voteStatus === -1,
                         'indigo--text': voteStatus === 1}"
        >{{votes}}</h4>
        <v-btn
          icon
          x-large
          :class="{'orange--text': voteStatus === -1}"
          @click="voteStatus === -1 ? voteStatus = 0  : voteStatus = -1"
        >
          <v-icon>mdi-arrow-down-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11" class="pl-4">
        <v-container>
          <v-row>
            <v-col cols="12" class="mt-n8 pr-8 d-flex">
              <span class="caption font-italic">{{creator}} Replied</span>
              <v-spacer></v-spacer>
              <span class="caption font-italic mr-4">Reply Date: {{creationTime}}</span>
              <span class="caption font-italic">Last Edit: {{updateTime}}</span>
            </v-col>
            <v-col cols="12" class="mt-n4 pr-8">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">Lorem Ipsum {{index}}</v-col>
            <v-col v-if="owner" cols="12" class="mb-n4 mt-4">
              <v-divider></v-divider>
            </v-col>
            <v-col v-if="owner" cols="12" class="d-flex mb-n12">
              <v-btn text class="mr-2" color="blue">Edit</v-btn>
              <v-spacer></v-spacer>
              <v-btn text class="mr-2" color="red">Delete</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-divider class="mx-9 mt-8 mb-n6"></v-divider>
  </v-container>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {
      voteStatus: 0,
      owner: true,
      mode: "create",
      dialog: false,
      title: "Thread Title",
      creator: "",
      createdAt: new Date(),
      lastUpdated: new Date(),
      body: `Thread Reply
              <br />Thread Reply
              <br />Thread Reply
              <br />Thread Reply
              <br />Thread Reply
              <br />Thread Reply
              <br />Thread Reply
              <br />Thread Reply`,
      votes: 200
    };
  },
  watch: {
    voteStatus: function(val) {}
  },
  created: function() {
    this.creator = `Tigor${this.index}`;
  },
  computed: {
    creationTime() {
      return this.createdAt.toString().substring(0, 15);
    },
    updateTime() {
      return this.lastUpdated.toString().substring(0, 15);
    }
  }
};
</script>

<style>
</style>