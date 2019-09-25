<template>
  <div id="app">
    <div id="nav">
      <router-link to="/question">Questions</router-link>
    </div>
    <div class="view">
    <router-view/>
    </div>
  </div>
</template>

<style>
*{
  margin : 0;
  padding: 0;
}
#app {
  background: rgb(202, 221, 240);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
#nav {
  padding: 30px;
  width: 18vw;
  background: rgb(255, 255, 255);
  min-height: 100vh
}

.view{
  display: flex;
  justify-content: center;
  width: calc(100vw - 14vw)
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
