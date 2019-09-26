<template>
  <div>
      <div class="bg">
        <div class="header">
            <div>Ask Question</div>
            <div class="horizontal-line"></div>
        </div>
        <QuestionForm></QuestionForm>
    </div>
  </div>
</template>

<script>
import QuestionForm from '../components/QuestionForm'
export default {
    components : {
        QuestionForm
    }
}
</script>

<style scoped>
.header {
    font-size: 25px;
    color: black;
    font-weight: bolder
}
.horizontal-line {
    width: 100%;
    height: 2px;
    background-color: rgb(40, 40, 221);
}
.bg {
    padding: 20px;
    background-color: white
}
</style>