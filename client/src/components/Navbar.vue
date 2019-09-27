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
    
    <b-dropdown id="dropdown-form" text="User" ref="dropdown" class="m-2">
      <b-dropdown-item href="#" v-show="this.$store.state.isLoggedIn">{{this.$store.state.user}}</b-dropdown-item>
      <b-dropdown-form v-show="!this.$store.state.isLoggedIn">
          <b-form-group label="Username" label-for="dropdown-form-username" @submit.stop.prevent>
            <b-form-input
              id="dropdown-form-username"
              size="sm"
              placeholder="ank_ganteng123"
              v-model="form.username"
            ></b-form-input>

          </b-form-group>
          <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent v-show="showRegisterForm">
            <b-form-input
              id="dropdown-form-email"
              size="sm"
              placeholder="email@example.com"
              v-model="form.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="dropdown-form-password">
            <b-form-input
              id="dropdown-form-password"
              type="password"
              size="sm"
              placeholder="Password"
              v-model="form.password"
            ></b-form-input>
          </b-form-group>
          <b-button variant="primary" size="sm" v-show="!showRegisterForm" @click="loginAndLogup">Sign In</b-button>
          <b-button variant="primary" size="sm" v-show="showRegisterForm" @click="loginAndLogup">Sign Up</b-button>
        </b-dropdown-form>
        <b-dropdown-divider></b-dropdown-divider>
        <b-button style="margin-left:auto;margin-right:auto;display:block" v-show="!showRegisterForm && !this.$store.state.isLoggedIn" @click="showRegisterForm = true">New around here? Sign up</b-button>
        <b-button style="margin-left:auto;margin-right:auto;display:block"  v-show="showRegisterForm && !this.$store.state.isLoggedIn" @click="showRegisterForm = false">Actuually, I am a member</b-button>
        <b-button style="margin-left:auto;margin-right:auto;display:block"  v-show="this.$store.state.isLoggedIn" @click="logout">I want to Log out</b-button>
      </b-dropdown>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="query"></b-form-input>
          <div>{{query}}</div>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="displayResults">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">{{this.$store.state.user}}</b-dropdown-item>
          <b-dropdown-item @click="loginAndLogup" v-show="!this.$store.state.isLoggedIn">Sign In</b-dropdown-item>
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
      form : {
        username : "",
        email : "",
        password : ""
      },
      query : "",
      showRegisterForm : false
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
      loginAndLogup : function (){
        const packet = {
          username : this.form.username,
          email : this.form.email,
          password : this.form.password
        }
        this.$store.dispatch('getIn',packet)
      }
  }
}
</script>

<style>
  #badge:hover {
    color: blue
  }

  #dropdown-form {
    width: 15%
  }

  .form-btn {
    background-color: black;
    padding: 10%
  }
</style>
