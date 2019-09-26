<template>
<div class ="shadow p-0 mb-3 bg-white rounded">
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#" @click.prevent="toHome">AIH (Answer Is Here)</b-navbar-brand>  

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"><i class="fa fa-cog"></i></template>
            <b-dropdown-item @click.prevent="createQuestion">Add Question</b-dropdown-item>
            <b-dropdown-item @click.prevent="userQuestion">Your Question</b-dropdown-item>
            <b-dropdown-item @click.prevent="signOut">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    methods: {
        toHome() {
            this.$router.push('/dashboard')
        },
        signOut () {
            this.$store.dispatch('signOut')
        },
        userQuestion () {
            this.$router.push('/user')
        },
        createQuestion () {
            this.$router.push('/createQuestion')
        }
    }
}
</script>

<style>

</style>