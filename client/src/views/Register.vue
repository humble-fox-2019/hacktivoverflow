<template>
  <div>
    <div class="backgroundRegist">
      <div class="showRegist" v-if="showRegist">
        <div class="box">
          <h1>Register</h1>
          <form action class="formRegist" @submit.prevent="registMe">
            <label class="register">Name</label>
            <input type="text" class="register" v-model="name" />
            <label class="register">Email</label>
            <input type="email" class="register" v-model="email" />
            <label class="register">Password</label>
            <input type="password" class="register" v-model="password" />
            <button type="submit" class="btn btn-dark btn-lg register">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      showRegist: true,
      name: '',
      email: '',
      password: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    registMe () {
      let name = this.name
      let email = this.email
      let password = this.password
      Swal.fire({
        title: 'Creating Your Account...',
        allowOutsideClick: () => !Swal.isLoading()
      })
      Swal.showLoading()
      axios({
        method: 'post',
        url: this.baseUrl + '/user/register',
        data: {
          name,
          email,
          password
        }
      })
        .then(response => {
          Swal.close()
          Swal.fire('Success!', 'Your Account is Created!', 'success')
          this.name = ''
          this.email = ''
          this.password = ''
        })
        .catch(error => {
          let msg = error.response.data.message || 'Fail to Register'
          console.log(error.response.data);
          Swal.fire('Error!', msg, 'error')
          this.name = ''
          this.email = ''
          this.password = ''
        })
    }
  },
  created () {
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.backgroundRegist {
  background: url("https://miro.medium.com/max/1200/0*__6ACr8KVzUOGr-u.jpg");
  background-size: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: calc(100vw - 17.2vw);
  min-height: 100vh;
}
.showRegist {
  min-width: 45vw;
  height: 85vh;
  border-radius: 25px;
  align-self: center;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    124deg,
    rgb(119, 2, 100),
    rgb(139, 5, 79),
    rgb(123, 0, 161)
  );
  background-size: 1800% 1800%;
  -webkit-animation: rainbow 1.5s ease infinite;
  -z-animation: rainbow 1.5s ease infinite;
  -o-animation: rainbow 1.5s ease infinite;
  animation: rainbow 1.5s ease infinite;
}
.formRegist {
  min-height: 24vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  height: 75%;
  width: 64%;
  background: white;
  border-radius: 18px;
}
.box h1 {
  color: rgb(17, 12, 2);
  font-weight: bolder;
  font-size: 40px;
  text-align: center;
  margin-bottom: 3%;
}
input.register {
  height: 30px;
  margin-bottom: 3%;
  font-size: 12pt;
  width: 44%;
}
button.register {
  margin-top: 10px;
  background: linear-gradient(
    90deg,
    rgb(60, 0, 128),
    rgb(230, 81, 218),
    rgb(0, 153, 255),
    rgb(145, 6, 138),
    rgb(49, 0, 128)
  );
  background-size: 400%;
  border-style: inset;
  color: whitesmoke;
  font-size: 12pt;
  height: 6vh;
  width: 6vw;
  border-radius: 12px;
}
button.register:hover {
  animation: animate 30s linear infinite;
  cursor: pointer
}
@keyframes animate {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}
label.register {
  font-size: 12pt;
  margin-top: 2vh;
  margin-bottom: 0.5vh;
}
@-webkit-keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@-moz-keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@-o-keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
</style>
