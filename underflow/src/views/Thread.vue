<template>
  <v-container fluid class="white">
    <v-row>
      <v-col cols="12" class="d-flex">
        <v-btn outlined class="mr-2">Back</v-btn>
        <v-btn outlined class="mr-2">Edit</v-btn>
        <v-spacer></v-spacer>
        <v-btn outlined class="mr-2">Delete</v-btn>
      </v-col>
      <v-col cols="12">
        <h1>Thread Title</h1>
        <v-divider></v-divider>
        <p>Thread Content</p>
      </v-col>

      <!-- Answers -->

      <v-col cols="12" class="mt-5 mb-n4 px-12">
        <h3>Answers</h3>
        <v-divider></v-divider>
      </v-col>

      <!-- Loop Answers -->

      <v-col cols="12">
        <v-container>
          <v-row no-gutters>
            <v-col cols="1" class="d-flex flex-column">
              <v-btn>Upvote</v-btn>
              <h3>Vote Count</h3>
              <v-btn>Downvote</v-btn>
            </v-col>
            <v-col cols="11" class="pl-4">2</v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>