<template>
  <div class="bg-body-dark bg-pattern">
    <div class="row mx-0 justify-content-center">
      <div class="hero-static col-lg-6 col-xl-4">
        <div class="content content-full overflow-hidden">
          <div class="py-30 text-center">
            <h1 class="h4 font-w700 mt-30 mb-10">Hello.. developer! Welcome..</h1>
            <h2 class="h5 font-w400 text-muted mb-0">Solve your proble with new problem!</h2>
          </div>

          <form class="js-validation-signin" v-on:submit.prevent="onSubmit">
            <div class="block block-themed block-rounded block-shadow">
              <div class="block-header bg-gd-dusk">
                <h3 class="block-title">Please Sign In</h3>
              </div>
              <div class="block-content">
                <div class="form-group row">
                  <div class="col-12">
                    <label for="login-username">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="login-username"
                      name="login-username"
                      placeholder="Enter your email"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <label for="login-password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="login-password"
                      name="login-password"
                      placeholder="Enter your password"
                      v-model="password"
                    />
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <div class="col-sm-6 d-sm-flex align-items-center push"></div>
                  <div class="col-sm-6 text-sm-right push">
                    <button type="submit" class="btn btn-alt-primary">
                      <i class="fas fa-sign-in-alt mr-10"></i> Login
                    </button>
                  </div>
                </div>
              </div>
              <div class="block-content bg-body-light">
                <div class="form-group text-center">
                  <router-link
                    to="/register"
                    class="link-effect text-muted mr-10 mb-5 d-inline-block"
                  >
                    <i class="fas fa-plus"></i> Create account
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/apis/axios";
import Toast from "@/helpers/toast";
import ErorrHandling from "@/helpers/errorHandling";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      Axios({
        url: "/signin",
        method: "post",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('userData', JSON.stringify(data.userData));
          
          this.$store.commit('SET_TOKEN', data.token);
          this.$store.commit('SET_USER', data.userData);
          
          Toast.fire({
            type: "success",
            title: "Signed in successfully"
          });
          this.$router.push("/");
        })
        .catch(ErorrHandling);
    }
  }
};
</script>

<style>
</style>