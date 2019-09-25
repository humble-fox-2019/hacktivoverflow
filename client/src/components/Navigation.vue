<template>
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div>
        <router-link class="link-effect font-w700" to="/">
          <span class="font-size-xl text-primary-dark">Code</span>
          <span class="font-size-xl">Stuck</span>
        </router-link>
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div class="content-header-section" v-if="token">
        <!-- User Dropdown -->
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-rounded btn-dual-secondary"
            id="page-header-user-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user d-sm-none"></i>
            <span class="d-none d-sm-inline-block">{{user.name}}</span>
            <i class="fas fa-angle-down ml-5"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-right min-width-200"
            aria-labelledby="page-header-user-dropdown"
          >
            <h5 class="h6 text-center py-10 mb-5 border-b text-uppercase">User</h5>
            <a class="dropdown-item" href="#">
              <i class="fas fa-user mr-5"></i> Profile
            </a>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click="doLogOut">
              <i class="fas fa-sign-out-alt mr-5"></i> Sign Out
            </a>
          </div>
        </div>
        <!-- END User Dropdown -->
      </div>

      <div class="content-header-section" v-if="!token">
        <router-link to="/login" tag="button" class="btn btn-link text-secondary">
          <i class="fas fa-sign-in-alt"></i> Login
        </router-link>

        <router-link to="/register" tag="button" class="btn btn-link text-secondary">
          <i class="fas fa-plus"></i> Create account
        </router-link>
      </div>
    </div>

    <div id="page-header-loader" class="overlay-header bg-primary">
      <div class="content-header content-header-fullrow text-center">
        <div class="content-header-item">
          <i class="fas fa-sun-o fa-spin text-white"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
    };
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    doLogOut() {
      localStorage.clear();
      this.$store.commit("CLEAR_TOKEN");
      this.$store.commit("CLEAR_USER");
      
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>