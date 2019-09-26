<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand id="badge" href="#"><iframe src="https://giphy.com/embed/gmlUIXRduCvUA" width="42" height="42" frameBorder="0" class="giphy-embed d-inline-block align-top" allowFullScreen></iframe>
      Hacktiv Overflow</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item link to="/">Home</b-nav-item>
        <b-nav-item link to="/about">About</b-nav-item>
      </b-navbar-nav>
    
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="query"></b-form-input>
          <div>{{query}}</div>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="displayResults">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">INA</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">{{this.$store.state.user}}</b-dropdown-item>
          <b-dropdown-item @click="login" v-show="!this.$store.state.isLoggedIn">Sign In</b-dropdown-item>
          <b-dropdown-item @click="logout" v-show="this.$store.state.isLoggedIn">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  data : function(){
    return {
      query : ""
    }
  },
  methods : {
      displayResults : function(){
          this.$router.push({path : '/search', query : {q : this.query}})
          this.$store.commit('setQuery',this.query)
          this.$store.dispatch('getQuestions')
      },
      logout : function (){
        this.$store.commit('logout')
      },
      login : function (){
        this.$store.commit('login')
      }
  }
}
</script>

<style>
  #badge:hover {
    color: blue
  }
</style>
