<template>
  <div id="app">
    <div id="nav">
      <button @click="toLogin" v-if="!isLogin" class="navleft">
        <p>Log In</p>
      </button>
      <router-link v-if="!isLogin" to="/register" class="navleft">Register</router-link>
      <button @click="toLogout" v-else class="navleft">
        <p>Log Out</p>
      </button>
      <router-link to="/" class="navleft">Questions</router-link>
      <button @click="letMeAsk" class="navleft">
        <p>Ask Question</p>
      </button>
    </div>
    <div class="view">
      <router-view @toLogin="toLogin" />
    </div>
    <div class="bg-modal" v-bind:style="{display: show, height: myheight}">
      <div class="modal-contents">
        <div class="close" @click="falseLogin">+</div>
        <form action @submit.prevent="loginUser">
          <img src="./assets/fairy.svg" alt srcset height="220" />
          <input type="email" placeholder="Email" v-model="inputEmail" />
          <input type="password" placeholder="Password" v-model="inputPassword" />
          <button href="#" class="button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      inputEmail: "",
      inputPassword: "",
      isLogin: false,
      show: "none",
      myheight: 0
    };
  },
  methods: {
    ...mapActions(["login", "putToken", "removeToken"]),
    toLogin() {
      this.show = "flex";
      this.myheight = document.getElementById("app").clientHeight + "px";
    },
    loginUser() {
      let obj = {
        email: this.inputEmail,
        password: this.inputPassword
      };
      this.login(obj);
      this.email = "";
      this.password = "";
    },
    falseLogin() {
      // console.log('here')
      this.show = "none";
    },
    letMeAsk() {
      if (!localStorage.token) {
        this.toLogin();
      } else {
        this.$router.push("/create");
      }
    },
    toLogout() {
      localStorage.clear();
      this.isLogin = false;
      this.removeToken();
    }
  },
  computed: {
    ...mapState(["token"])
  },
  watch: {
    token() {
      if (this.token) {
        this.falseLogin();
        this.isLogin = true;
      }
    }
  },
  created() {
    if (localStorage.token) {
      // console.log('aaaaa')
      this.putToken();
      this.isLogin = true;
      // console.log();
    }
  }
  // mounted() {
  //   console.log(localStorage.token, '<<<<');
  //   if (localStorage.token){
  //     this.show = 'none'
  //     console.log(localStorage.token);
  //     console.log('here');
  // }
  // },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

* {
  margin: 0;
  padding: 0;
}

input {
  font-size: 12pt;
}

input:hover {
  box-shadow: 0 0 5px rgb(209, 107, 212);
  border: 1px solid rgb(238, 81, 186);
}

input:focus {
  box-shadow: 0 0 5px rgb(209, 107, 212);
  border: 1px solid rgb(238, 81, 186);
}

.bg-modal {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  position: absolute;
  top: 0;
}

.modal-contents {
  top: 0;
  right: 50vw;
  margin-left: 30vw;
  margin-top: 10vh;
  height: 400px;
  width: 500px;
  background-color: white;
  text-align: center;
  padding: 20px;
  position: sticky;
  border-radius: 4px;
}

input {
  margin: 15px auto;
  display: block;
  width: 50%;
  padding: 8px;
  border: 1px solid gray;
}

.close {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 42px;
  color: #333;
  transform: rotate(45deg);
  cursor: pointer;
}

.close:hover {
  cursor: pointer;
  color: rgb(179, 16, 16);
}

.button {
  height: 45px;
  font-size: 14px;
  background-color: rgb(179, 9, 179);
  border: 2px solid white;
  border-radius: 30px;
  text-decoration: none;
  padding: 10px 28px;
  color: white;
  margin-top: 10px;
  display: inline-block;
}

.button:hover {
  background-color: white;
  color: rgb(161, 41, 185);
  font-weight: bolder;
  border: 2px solid rgb(24, 15, 146);
}
#app {
  background: rgb(202, 221, 240);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
#nav {
  padding-top: 20px;
  width: 18vw;
  background: #3b0c40;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.view {
  display: flex;
  justify-content: center;
  width: calc(100vw - 14vw);
}
#nav a {
  font-weight: bold;
  color: white;
  font-size: 22px;
  text-decoration: none;
  font-weight: bolder;
}

#nav a.router-link-exact-active {
  color: #28da89;
  text-decoration: none;
  font-weight: bolder;
}

#nav a:hover {
  color: #28da89;
  text-decoration: none;
  font-weight: bolder;
  cursor: pointer;
}

p {
  font-weight: bolder;
  font-size: 21px;
  background: #3b0c40;
  color: white;
}
p:hover {
  color: #10be70;
  background: white;
  cursor: pointer;
}

button.navleft {
  font-weight: bolder;
  font-size: 21px;
  background: #3b0c40;
  border: #3b0c40;
}

.navleft {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  padding-left: 20px;
}

.navleft:hover {
  background: white;
}
</style>
