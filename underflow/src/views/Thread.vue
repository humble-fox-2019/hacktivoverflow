<template>
  <v-container fluid class="white">
    <v-row>
      <v-col cols="12" class="d-flex px-4">
        <v-btn outlined class="mr-2" @click="$router.push('/')">Back</v-btn>
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="12">
        <h1>Thread Title</h1>
      </v-col>
      <v-col cols="12" class="d-flex mt-n6">
        <span class="caption font-italic">Started by: OP</span>
        <v-spacer></v-spacer>
        <span class="caption font-italic mr-4">Posted date:</span>
        <span class="caption font-italic">Last Active:</span>
      </v-col>
      <v-col cols="12" class="mt-n5">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="1" class="d-flex flex-column align-center mt-n4">
        <v-btn
          icon
          x-large
          :class="{'indigo--text': voteStatus === 1}"
          @click.stop="voteStatus === 1 ? voteStatus = 0  : voteStatus = 1"
        >
          <v-icon>mdi-arrow-up-circle-outline</v-icon>
        </v-btn>
        <h4
          :class="{'orange--text': voteStatus === -1,
                         'indigo--text': voteStatus === 1}"
        >77</h4>
        <v-btn
          icon
          x-large
          :class="{'orange--text': voteStatus === -1}"
          @click.stop="voteStatus === -1 ? voteStatus = 0  : voteStatus = -1"
        >
          <v-icon>mdi-arrow-down-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11" class="mt-n4">
        <v-row>
          <v-col cols="12">
            <p>Thread Content</p>
          </v-col>
          <v-col v-if="owner" cols="12" class="mb-n4 mt-4">
            <v-divider></v-divider>
          </v-col>
          <v-col v-if="owner" cols="12" class="d-flex mb-n12">
            <v-btn text class="mr-2" color="blue">Edit</v-btn>
            <v-spacer></v-spacer>
            <v-btn text class="mr-2" color="red">Delete</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Answers -->

      <v-col cols="12" class="mt-5 mb-n4 px-12">
        <h3>Answers</h3>
        <v-divider></v-divider>
      </v-col>

      <!-- Start Loop Answers -->
      <v-col cols="12" v-for="n in 12" :key="n">
        <ThreadAnswer :index="n" />
      </v-col>

      <!-- End Loop -->
    </v-row>
    <v-btn fab color="cyan" bottom right fixed dark class="ma-4" @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import ThreadAnswer from "../components/ThreadAnswers";
export default {
  components: {
    ThreadAnswer
  },
  data() {
    return {
      voteStatus: 0,
      owner: true
    };
  },
  watch: {
    voteStatus: function(val) {}
  }
};
</script>

<style>
</style>