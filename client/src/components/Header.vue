<template>
  <div class="header">
    <div>
      <div class="logo">
        <img src="../assets/logo.png" @click="$router.push('/')">
      </div>
      <div class="search-box">
        <form @submit.prevent="searchByTitle">
          <div class="input-search">
            <label for="search"><i class="fas fa-search"></i></label>
            <input id="search" type="text" placeholder="Search question..." v-model="search">
          </div>
        </form>
      </div>
      <div class="user">
        <button @click="$router.push('/ask')">Ask question</button>
        <button @click="$router.push('/account')" v-if="$store.state.isLogin">My Account</button>
        <button class="logout" @click="$store.commit('logout')" v-if="$store.state.isLogin">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      search: ''
    }
  },
  methods: {
    searchByTitle() {
      this.$store.dispatch('searchByTitle', this.search)
    }
  }
}
</script>

<style scoped>

.header {
  background-color: #1d1f29;
}
.header > div{
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
.logo img{
  width: 80px;
  cursor: pointer;
}
.input-search{
  position: relative;
}
.input-search label{
  position: absolute;
  top: 47%;
  left: 10px;
  transform: translateY(-50%);
  color: #dddddd;
  font-size: 10pt;
}
.input-search input{
  padding: 5px 20px 5px 50px;
  border: none;
  border-radius: 5px;
  width: 250px;
  background-color: #37383f;
  color: #dddddd;
  font-size: 10pt;
}
.input-search input::placeholder{
  color: #dddddd;
}
.input-search input:focus{
  outline: none;
}
.user button{
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #00ff8a;
  font-size: 8pt;
  font-weight: bold;
}
.user button:not(:last-child) {
  margin-right: 10px;
}
.user button:hover{
  background-color: #31ff9f;
}
.user button:focus{
  outline: none;
}
.user button:active{
  transform: scale(0.97);
}
.user button.logout{
  background-color: #db2323;
}
</style>
