<template>
  <div class="home">
    <div class="home-top">
      <div></div>
      <div class="header">
        <h2>Questions</h2>
        <div class="sort-buttons">
          <button class="active">Newest</button>
          <button>Popular</button>
        </div>
      </div>
    </div>
    <div class="home-body">
      <div class="side-bar">
        <div class="tags">
          <h2>Popular tags</h2>
          <div class="tag">
            <button
              v-for="(tag, index) in popularTags"
              :key="index"
              @click="$store.dispatch('getQuestionByTag', tag)"
              :style="`background-color: ${getRandomColor()}`">
              {{ tag }}
            </button>
          </div>
        </div>
        <button class="btn-cantik" @click="$store.dispatch('getAllQuestion')">Show All questions</button>
        <div class="tags" v-if="$store.state.isLogin">
          <h2>Watch tags</h2>
          <div class="watch-tag">
            <div class="tag-item" v-for="(item, index) in $store.state.user.watchTags" :key="index">
              <p @click="$store.dispatch('getQuestionByTag', item)">{{ item }}</p>
              <span @click="removeTag(item)"><i class="fas fa-times"></i></span>
            </div>
            <input type="text" v-model="tag" placeholder="Add watch tags"  @keyup="processTag($event)">
          </div>
        </div>
      </div>
      <div class="main">
        <Question
          v-for="question in $store.state.questions"
          :key="question._id"
          :question="question">
        </Question>
      </div>
    </div>
  </div>
</template>

<script>

import Question from '../components/Question.vue'
export default {
  name: 'home',
  components: {
    Question
  },
  data() {
    return {
      popularTags: ['Css', 'Html', 'Javascript', 'Php', 'Dart', 'Heroku', 'Aws'],
      watchTags: ['Angular', 'React', 'Azure'],
      listColor: ['#00fff0', '#00ff8a', '#ff49f9', '#f17532', '#f1cb32', '#00a8ff', '#91ffd9'],
      tag: ''
    }
  },
  methods: {
    getRandomColor() {
      let indexRandom = Math.round(Math.random() * 6)
      return this.listColor[indexRandom]
    },
    processTag(e) {
      if(e.keyCode === 32) {
        if(this.tag < 1) {
          //
        }else {
          this.$store.dispatch('addTag', this.tag)
          this.tag = ''
        }
      }
    },
    removeTag(tag) {
      this.$store.dispatch('removeTag', tag)
    }
  },
  created() {
    this.$store.dispatch('getAllQuestion')
  }
}
</script>

<style scoped>

.home{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.home-top{
  display: flex;
  padding: 30px 0;
}
.home-top > div:first-child{
  flex-basis: 200px;
  margin-right: 20px;
}
.home-top .header{
  flex-grow: 1;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header h2{
  color: #00fff0;
  font-weight: 800;
}
.sort-buttons button:not(:last-child) {
  margin-right: 10px;
}
.sort-buttons button{
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4d4e54;
  color: #1d1f29;
  cursor: pointer;
}
.sort-buttons button:hover{
  background-color: #68696e;
}
.sort-buttons button:focus{
  outline: none;
}
.sort-buttons button.active{
  background-color: #68696e;
}
.home-body {
  display: flex;
  align-items: flex-start;
  height: 100%;
  flex-grow: 1;
}
.side-bar{
  flex-basis: 200px;
  margin-right: 20px;
  background-color: #4d4e54;
  border-radius: 5px;
  padding: 30px 10px;
  box-sizing: border-box;
}
.side-bar .tags {
  background-color: #414249;
  padding: 20px;
  border-radius: 5px;
}
.side-bar .tags:first-child{
  margin-bottom: 20px;
}
.side-bar .tags h2{
  font-size: 12pt;
  margin-bottom: 20px;
  color: #bbbbbb;
}
.side-bar .tags .tag button{
  padding: 3px 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.side-bar .tags .tag button:not(:last-child){
  margin-right: 5px;
}
.side-bar .tags .tag button:focus{
  outline: none;
}
.side-bar .tags .tag button:active{
  transform: scale(0.95);
}
.main{
  background-color: #1d1f29;
  flex-basis: 600px;
  flex-grow: 1;
  border-radius: 5px;
  overflow: auto;
}
.main div:not(:last-child){
  border-bottom: 1px solid #515255;
}
.btn-cantik{
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #00fff0;
  border-radius: 5px;
  margin-bottom: 20px;
}
.btn-cantik:focus{
  outline: none;
}
.watch-tag{
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.watch-tag input{
  padding: 10px;
}
.watch-tag .tag-item{
  border-radius: 20px;
  background-color: #b6b6b6;
  padding: 5px 10px;
  margin-bottom: 5px;
}
.watch-tag .tag-item p{
  font-size: 10pt;
  display: inline-flex;
  cursor: pointer;
}
.watch-tag .tag-item:not(:last-child) {
  margin-right: 5px;
}
.watch-tag .tag-item span{
  background-color: #dbdbdb;
  color: #525252;
  padding: 3px 7px;
  border-radius: 50%;
  margin-left: 5px;
  cursor: pointer;
  font-size: 8pt;
}
</style>
