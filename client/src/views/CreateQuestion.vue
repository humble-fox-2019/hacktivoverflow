<template>
<div class="centerMe">
  <form action="" class="form" @submit.prevent="doneWrite">
  <h1>Create Question</h1>
  <input type="text" class="title" placeholder="Write your question here.." v-model="title">
    <wysiwyg class="box-edit" placeholder="Write question description here.." v-model="description"></wysiwyg>
    <button class="rightDown">Submit</button>
  </form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Edit',
  data () {
    return {
      title: '',
      description: '',
      baseUrl: 'http://3.0.89.125'
    }
  },
  methods: {
    doneWrite () {
      axios({
        method: 'post',
        url: `${this.baseUrl}/question/create`,
        headers: { token: localStorage.token },
        data: {
          title: this.title,
          description: this.description
        }
      })
        .then(data => {
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0
}

.form{
  height : 547px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
}

.editr{
  background: white;
  min-height: 40vh;
  width: 50vw
}

input[type="text"]{
  height : 30px;
  width: 50vw;
  font-size: 12pt;
}

.rightDown{
  width: 98px;
  height: 35px;
  align-self: flex-end
}

button{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12pt;
  border-radius:5px
}
.centerMe{
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  width: calc(100vw - 18vw);
}
</style>
