<template>
  <div class="ask">
    <h2 style="text-align:left; margin-top:10px">Title</h2>
    <input type="text" v-model="title" />
    <Wysiwyg />
    <div class="btn">
      <button @click="postQuest">POST YOUR QUESTION</button>
    </div>
  </div>
</template>

<script>
import Wysiwyg from "../components/wysiwyg";
export default {
  components: {
    Wysiwyg
  },
  data: function() {
    return {
      title: ""
    };
  },
  watch: {
    title: function() {
      this.$store.commit("setTitle", this.title);
    }
  },
  methods: {
    postQuest() {
      this.$store.dispatch("postQuest");
    }
  },
  created() {}
};
</script>

<style scoped>
.ask {
  width: 80vw;
  margin: 0 auto;
}

input {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
}
.btn {
  text-align: right;
  width: 80vw;
  margin: 5px auto;
}
button {
  margin-top: 20px;
  height: 40px;
  width: 170px;
  border: none;
}
</style>