<template>
  <div class="centerMe">
    <form action class="form" @submit.prevent="doneEdit">
      <h1>Edit Question</h1>
      <input type="text" class="title" v-model="title" />
      <div class="wys">
        <wysiwyg class="box-edit" v-model="description"></wysiwyg>
      </div>
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
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    doneEdit () {
      if (this.title < 1 || this.description.length < 1) {
        this.$router.push({ path: '/' })
      } else {
        axios({
          method: 'PUT',
          url: `${this.baseUrl}/question/${this.$route.params.id}`,
          headers: { token: localStorage.token },
          data: {
            title: this.title,
            description: this.description
          }
        })
          .then(data => {
            this.$router.push({ path: '/' })
            console.log(data)
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    }
  },
  created () {
    console.log(this.$route.params.id)
    axios({
      method: 'get',
      url: `${this.baseUrl}/question/${this.$route.params.id}`
    }).then(data => {
      let result = data.data.question
      this.title = result.title
      this.description = result.description
    })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.form {
  height: 547px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.editr {
  background: white;
  min-height: 40vh;
  width: 50vw;
  text-align: left;
}

input[type="text"] {
  height: 30px;
  width: 50vw;
  font-size: 12pt;
}

.rightDown {
  width: 98px;
  height: 35px;
  align-self: flex-end;
}

button {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12pt;
  border-radius: 5px;
}
.centerMe {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  width: calc(100vw - 18vw);
}
.wys {
  display: flex;
  justify-content: center;
}
</style>
