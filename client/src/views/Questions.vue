<template>
  <div class="ques">
    <div class="header">
      <h1>Coder Fairy</h1>
      <img src="../assets/coderfairy.png" alt srcset />
    </div>
    <div class="box">
      <div v-for="(question, index) in questionList" :key="index">
        <OneQuestion :question="question" @toLogin="toLogin"></OneQuestion>
        <hr v-if="index < questionList.length-1">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import OneQuestion from '../components/OneQuestion.vue'
export default {
  name: 'Questions',
  data () {
    return {
      message: 'haii'
    }
  },
  components: {
    OneQuestion
  },
  computed: {
    ...mapState(['questionList'])
  },
  methods: {
    ...mapActions(['getAllQuestion']),
    toLogin () {
      console.log('heee')
      this.$emit('toLogin')
    }
  },
  created () {
    this.getAllQuestion()
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.header {
  height: 420px;
  margin: 30px;
}
.box {
  margin-top: 5px;
  margin-bottom: 30px;
  min-height: calc(100vh - 450px);
  width: 63vw;
  border-radius: 8px;
  background: rgb(255, 255, 255);
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.ques {
  width: calc(100vw - 18vw);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
h1 {
  margin-bottom: 25px;

}
img {
  width: 60vw;
  height: 37vh;
  border-radius: 9px;
  border: dashed 5pt;
  padding: 15px;
}
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
  border-color: rgb(143, 143, 221)
}
</style>
