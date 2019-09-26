<template>
  <div>
    <div class="ask" v-if="$store.state.isLogin">
    <h1>Ask a question</h1>
    <form @submit.prevent="postQuestion">
      <div class="input-group">
        <label for="title">Title</label>
        <input type="text" v-model="title" required>
      </div>
      <div class="input-group">
        <label for="title">Body</label>
        <textarea name="content" id="content" v-model="content" required>
        </textarea>
      </div>
      <div class="input-group">
        <label for="tags">Tags :</label>
        <div class="tag">
          <div class="tag-item" v-for="(item, index) in tags" :key="index">
            <p>{{ item }}</p>
            <span @click="removeTag(index)"><i class="fas fa-times"></i></span>
          </div>
        </div>
        <input type="text" v-model="tag" placeholder="Add your question tags"  @keyup="processTag($event)">
      </div>
      <div class="input-action">
        <button type="submit">Post your question</button>
      </div>
    </form>
  </div>
  <div class="form" v-else>
    <h1>You need to login first</h1>
    <form v-if="page === 'signin'" @submit.prevent="signin">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div class="input-group">
        <label for="email">Password</label>
        <input type="password" v-model="password" required>
      </div>
      <div class="input-action">
        <button type="submit">Signin</button>
      </div>
      <div class="form-footer">
        <p>Don't have an account yet ?, <span @click="changePage('signup')">Signup here</span></p>
      </div>
    </form>
    <form v-else-if="page === 'signup'" @submit.prevent="signup">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" v-model="username" required>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div class="input-group">
        <label for="email">Password</label>
        <input type="password" v-model="password" required>
      </div>
      <div class="input-action">
        <button type="submit">Signup</button>
      </div>
      <div class="form-footer">
        <p>Already have an account ?, <span @click="changePage('signin')">Signin here</span></p>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'AskQuestion',
  data() {
    return {
      title : '',
      content : '',
      tags : [],
      tag: '',
      page: 'signin',
      username: '',
      email: '',
      password: '',
      path: ''
    }
  },
  methods : {
    postQuestion() {
      this.$store.dispatch('postQuestion', {
        title: this.title,
        content: this.content,
        tags: this.tags
      })
    },
    processTag(e) {
      if(e.keyCode === 32) {
        if(this.tag < 1) {
          //
        }else {
          this.tags.push(this.tag.trim())
          this.tag = ''
        }
      }
    },
    removeTag(index) {
      let newTags = []
      for(let i=0;i<this.tags.length;i++) {
        if(i === index) {
          //skip
        }else {
          newTags.push(this.tags[i])
        }
      }
      this.tags = newTags
    },
    changePage(page) {
      this.page = page
    },
    signup() {
      this.$store.dispatch('signup', {
        username: this.username,
        email: this.email,
        password:this.password,
        path: this.path
      })
    },
    signin() {
      this.$store.dispatch('signin', {
        email: this.email,
        password:this.password,
        path: this.path
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if(from.name === 'questionDetail') {
      next(vm => {
        vm.path = from.fullPath
      })
    }else{
      next()
    }
  }
}
</script>

<style scoped>

.ask{
  background-color: #1d1f29;
  max-width: 1000px;
  margin: auto;
  border-radius: 5px;
  padding: 20px;
}
.ask > h1{
  font-size: 24pt;
  font-weight: normal;
  margin-bottom: 20px;
  color: #00ff8a;
}

form{
  background-color: rgb(39, 38, 46);
  padding: 20px;
  border-radius: 5px;
}
.input-group{
  margin-bottom: 20px;
}
.input-group label{
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  color: #8a8a8a;
}
.input-group input, .input-group textarea{
  display: block;
  padding: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(24, 23, 29);
  font-size: 14pt;
  color: #8a8a8a;
}
.input-group textarea{
  height: 300px;
  resize: vertical;
}
.input-group input:focus, .input-group textarea:focus{
  outline: none;
}
.input-action button{
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  background-color: #00ff8a;
  color: #383838;
  font-size: 10pt;
  font-weight: bold;
  cursor: pointer;
}
.input-action button:focus{
  outline: none;
}
.input-action button:hover{
  background-color: #62ffb6;
}
.input-action button:active{
  transform: scale(0.95);
}
.tag{
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.tag-item{
  border-radius: 20px;
  background-color: #b6b6b6;
  padding: 5px 10px;
  margin-bottom: 5px;
}
.tag-item p{
  display: inline-block;
}
.tag-item:not(:last-child) {
  margin-right: 5px;
}
.tag-item span{
  background-color: #dbdbdb;
  color: #525252;
  padding: 3px 7px;
  border-radius: 50%;
  margin-left: 5px;
  cursor: pointer;
  font-size: 8pt;
}
.form h1{
  font-size: 24pt;
  font-weight: normal;
  color: #00ff8a;
  margin-bottom: 20px;
}
.form-footer{
  margin-top: 20px;
}
.form-footer p{
  color: #7c7c7c;
}
.form-footer span{
  color: #00ff8a;
  font-weight: bold;
  cursor: pointer;
}
</style>
