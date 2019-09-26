<template>
  <div>
    <Question />
    <Wysiwyg />
    <div class="btn">
      <button>POST YOUR ANSWER</button>
    </div>
  </div>
</template>

<script>
import Question from "../components/question";
import Wysiwyg from "../components/wysiwyg";
export default {
  components: {
    Question,
    Wysiwyg
  }
};
</script>

<style scoped>
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