<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" style="font-family: 'Oswald', sans-serif; font-weight: 100px; font-size: 25px;" href="#">Overflow</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click="logOut" class="nav-link">logOut</a>
          </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  methods : {
    logOut (){
      localStorage.clear()
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>