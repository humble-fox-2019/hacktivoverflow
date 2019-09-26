<template>
  <div class="mb-10">
    <button
      :class="`btn btn-link ${(checkUpvote) ? 'text-primary' : 'text-secondary'} p-0 m-0`"
      style="font-size:30px;"
      v-if="token"
      @click="`${(checkUpvote) ? removeAction(id) : upAction(id)}`"
    >
      <i class="fas fa-sort-up"></i>
    </button>
    <h4 class="font-weight-bold p-0 m-0">{{upvotes.length - downvotes.length}}</h4>
    <button
      :class="`btn btn-link ${(checkDownvote) ? 'text-primary' : 'text-secondary'} p-0 m-0`"
      style="font-size:30px;"
      v-if="token"
      @click="`${(checkDownvote) ? removeAction(id) : downAction(id)}`"
    >
      <i class="fas fa-sort-down"></i>
    </button>
  </div>
</template>

<script>

export default {
  props: ["token", "upvotes", "downvotes", "id", "upAction", "downAction", "removeAction"],
  name: "vote",
  computed: {
    checkUpvote() {
        return this.upvotes.includes(this.$store.state.user.id);
    },
    checkDownvote() {
        return this.downvotes.includes(this.$store.state.user.id);
    },
  }
};
</script>

<style>
</style>