<template>
  <div class="wysiwyg">
    <wysiwyg v-model="myHTML" />
  </div>
</template>

<script>
import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
export default {
  data: function() {
    return {
      myHTML: ""
    };
  },
  watch: {
    myHTML: function() {
      this.$store.commit("setContent", this.myHTML);
    }
  }
};
</script>

<style>
.wysiwyg {
  width: 80vw;
  margin: 0 auto;
}
</style>