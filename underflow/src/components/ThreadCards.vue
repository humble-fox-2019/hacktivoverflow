<template>
  <v-col sm="12" md="6" lg="6">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col sm="6" md="6" lg="6" class="text-truncate">{{metaThread.title}}</v-col>
          <v-col cols="12">
            <span
              class="font-weight-thin font-italic subtitle-2 ml-2"
            >Posted by: {{metaThread.owner.username}}</span>
            <v-spacer></v-spacer>
            <span class="font-weight-thin font-italic subtitle-2 ml-2">Asked: {{creationTime}}</span>
            <span class="font-weight-thin font-italic subtitle-2 ml-2">Active: {{updatedTime}}</span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="text-truncate">{{metaThread.body}}</v-card-text>
      <v-card-actions>
        <v-btn block @click="$router.push({name: 'thread', params: {postId: metaThread._id}} )">View</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["metaThread"],
  created() {},
  computed: {
    creationTime() {
      return new Date(this.metaThread.createdAt).toString().substring(0, 15);
    },
    updatedTime() {
      return new Date(this.metaThread.updatedAt).toString().substring(0, 15);
    }
  }
};
</script>

<style>
</style>