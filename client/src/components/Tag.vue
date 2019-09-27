<template>
  <button class="btn tag-btn m-1" @click.prevent="searchTag(tag)">{{tag}}</button>
</template>

<script>
export default {
  props: ["tag"],
  methods: {
    searchTag(tag) {
        this.$store.dispatch('searchTag', tag);
    }
  }
};
</script>

<style scoped>
.main-card {
  border: 1px solid;
}
.tag-btn {
  border: 3px solid whitesmoke;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
  transition: 0.5s all;
}
.tag-btn:hover {
  transition: 0.5s all;
  background-color: whitesmoke;
  color: #47bdfc;
}
</style>