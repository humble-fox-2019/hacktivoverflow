<template>
  <v-col sm="12" md="6" lg="6">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            sm="6"
            md="6"
            lg="6"
            class="text-truncate"
          >Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title</v-col>
          <v-col cols="12">
            <span class="font-weight-thin font-italic subtitle-2 ml-2">Creator</span>
            <v-spacer></v-spacer>
            <span class="font-weight-thin font-italic subtitle-2 ml-2">Asked:</span>
            <span class="font-weight-thin font-italic subtitle-2 ml-2">Active:</span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="text-truncate"
      >Text Text Text Text Text Text Text TextText Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</v-card-text>
      <v-card-actions>
        <v-btn block @click="$router.push({name: 'thread', params: {postId: metaThread}} )">View</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["metaThread"],
  created() {}
};
</script>

<style>
</style>