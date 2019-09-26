<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center p-5"
    style="height: 100vh;"
  >
    <div class="mb-5">
      <img style="background-color: white;width: 200px;" src="../assets/logo.png" alt />
    </div>
    <div>
      <h1 class="welcome">Hi, welcome to fox-overflow</h1>
    </div>
    <div class="sign-box mt-5 rounded">
      <div class="d-flex flex-column justify-content-center">
        <div class="d-flex justify-content-around">
          <button class="btn btn-in p-3" style="width: 100%" @click.prevent="gotoin()">Sign In</button>
          <button class="btn btn-up p-3" style="width: 100%" @click.prevent="gotoup()">Sign Up</button>
        </div>
        <div v-if="signin" class="d-flex justify-content-center align-items-center p-5">
          <form style="width: 50%" @submit.prevent="login()">
            <label class="lbl-in"><i class="fas fa-envelope"></i> Email</label>
            <input
              type="email"
              class="form-control in-input"
              autocomplete="off"
              v-model="email"
              placeholder="Input email"
              style="background-color: #56addb; border: 0px;"
            />
            <label class="lbl-in mt-1"><i class="fas fa-key"></i> Password</label>
            <input
              type="password"
              class="form-control in-input"
              autocomplete="off"
              v-model="password"
              placeholder="Input username"
              style="background-color: #56addb; border: 0px;"
            />
            <div class="mt-5">
              <button class="btn log-btn">Login</button>
            </div>
          </form>
        </div>
        <div v-if="signup" id="signup" class="d-flex justify-content-center align-items-center p-5">
          <form style="width: 50%" @submit.prevent="register()">
            <label class="lbl-up"><i class="fas fa-envelope"></i> Email</label>
            <input
              type="email"
              class="form-control up-input"
              autocomplete="off"
              v-model="email"
              placeholder="Input email"
              style="background-color: #e3e3e3; border: 0px;"
            />
            <label class="lbl-up mt-1"><i class="fas fa-key"></i> Password</label>
            <input
              type="password"
              class="form-control up-input"
              autocomplete="off"
              v-model="password"
              placeholder="Input username"
              style="background-color: #e3e3e3; border: 0px;"
            />
            <div class="mt-5">
              <button class="btn reg-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h5 class="copyright mt-5">
        This project made by
        <a
          title="Ardi Pratama's Instagram"
          target="blank"
          href="https://www.instagram.com/f_ardi14/"
        >
          <i class="fab fa-instagram"></i> Ardi Pratama
        </a>
      </h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://localhost:3000";
export default {
  data() {
    return {
      email: "",
      password: "",
      signin: true,
      signup: false
    };
  },
  methods: {
    reset() {
      this.email = "";
      this.password = "";
    },
    gotoin() {
      this.reset();
      this.signin = true;
      this.signup = false;
    },
    gotoup() {
      this.reset();
      this.signin = false;
      this.signup = true;
    },
    register() {
      Swal.fire({
        title: `Registering...`
      })
      Swal.showLoading();
      const data = {
        email: this.email,
        password: this.password
      };
      axios({
        url: `${url}/users/register`,
        method: "post",
        data
      })
        .then(({ data }) => {
          Swal.close();
          this.reset();
          localStorage.setItem("token", data.token);
          this.$router.push("/home/feeds");
          Swal.fire(`Success`, `Register success`, "success");
        })
        .catch(err => {
          Swal.close();
          Swal.fire(`Errors`, err.response.data.message.join(', '), "error");
        });
    },
    login() {
      Swal.fire({
        title: `Signing In...`
      })
      Swal.showLoading();
      const data = {
        email: this.email,
        password: this.password
      };
      axios({
        url: `${url}/users/login`,
        method: "post",
        data
      })
        .then(({ data }) => {
          Swal.close();
          this.reset();
          localStorage.setItem("token", data.token);
          this.$router.push("/home/feeds");
          Swal.fire(`Success`, `Sign in success`, "success");
        })
        .catch(err => {
          Swal.close();
          Swal.fire(`Errors`, err.response.data.message, "error");
        });
    }
  }
};
</script>

<style scoped>
.sign-box {
  transition: 0.5s all;
  width: 800px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* height: 500px; */
}
.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
}
.btn-in {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
}
.btn-up {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  background-color: whitesmoke;
  color: #47bdfc;
}
.lbl-in {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
}
.lbl-up {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: #47bdfc;
}
.log-btn {
  width: 100%;
  border: 3px solid whitesmoke;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: whitesmoke;
  transition: 0.5s all;
}
.log-btn:hover {
  transition: 0.5s all;
  width: 100%;
  background-color: whitesmoke;
  color: #47bdfc;
}
.reg-btn {
  width: 100%;
  border: 3px solid #47bdfc;
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: #47bdfc;
  transition: 0.5s all;
}
.reg-btn:hover {
  transition: 0.5s all;
  width: 100%;
  background-color: #47bdfc;
  color: whitesmoke;
}
#signup {
  background-color: whitesmoke;
}
.in-input:focus {
  color: whitesmoke;
  font-weight: bolder;
}
.in-input:hover {
  color: whitesmoke;
  font-weight: bolder;
}
.in-input {
  color: whitesmoke;
  font-weight: bolder;
}
.up-input:focus {
  color: #47bdfc;
  font-weight: bolder;
}
.up-input:hover {
  color: #47bdfc;
  font-weight: bolder;
}
.up-input {
  color: #47bdfc;
  font-weight: bolder;
}
.copyright {
  color: whitesmoke;
  font-weight: bolder;
}
.copyright a {
  transition: 0.5s all;
  color: white;
  font-weight: bolder;
  text-decoration: none;
}
.copyright a:hover {
  transition: 0.5s all;
  font-size: 22px;
  color: white;
  font-weight: bolder;
  text-decoration: none;
}
</style>