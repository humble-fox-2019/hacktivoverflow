<template>
  <div cols="5" style="height: 40%; min-width: 50%;">
    <h5 style="text-align: center;">AIH (Answer Is Here)</h5>
    <b-card style="width: 100%; height: 100%;" class="mb-2">
      <b-form 
        style="width: 100%; height: 80%; display:flex; flex-direction: column; align-content: center;"
      >
        <label for="email" style="font-size: 15px;">Email</label>
        <b-input
          v-model="formlogin.email"
          type="email"
          id="email"
          placeholder="Input your email here"
          class="mb-3"
        ></b-input>
        <label for="password" style="font-size: 15px;">Password</label>
        <b-input
          v-model="formlogin.password"
          type="password"
          id="password"
          placeholder="Input your password here"
        ></b-input>
        <div style="display:flex; margin-top: 10px; justify-content: center;">
          <b-button
            variant="outline-success"
            type="submit"
            style="width: 40%;"
            @click.prevent="signIn"
          >Login</b-button>
        </div>
        <div
          style="display: flex; min-width: 25%; margin-top: 20px; justify-content: space-around; color: #969592;"
        >
          <p>
            Don't have an account ?
            <a href="#" v-b-modal.modalregister style="text-decoration: underline;">Sign Up Here</a>
          </p>
        </div>
      </b-form>
      <b-modal id="modalregister" size="md" title="Register:">
        <b-form-group label="Username:" label-for="input-2" style="width: 100%">
          <b-form-input
            id="input-2"
            type="text"
            required
            v-model="formregister.name"
            placeholder="Input your username here.."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email:" label-for="input-1" style="width: 100%">
          <b-form-input
            id="input-1"
            type="email"
            required
            v-model="formregister.email"
            placeholder="Input your email here.."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="input-3" style="width: 100%">
          <b-form-input
            id="input-3"
            type="password"
            required
            v-model="formregister.password"
            placeholder="Input your password here.."
          ></b-form-input>
        </b-form-group>
        <template slot="modal-footer">
          <b-button variant="success" style="width: 20%;" @click.prevent="signUp">Sign Up</b-button>
        </template>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formlogin: {
        email: "",
        password: ""
      },
      formregister: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    signIn() {
      console.log("masuk nih ke signin")
      this.$store.dispatch("signIn", this.formlogin);
      Vue.swal.showLoading();
      this.formlogin.email = "";
      this.formlogin.password = "";
    },
    signUp() {
      this.$store.dispatch("signUp", this.formregister);
      this.$bvModal.hide("modalregister");
      Vue.swal.showLoading();
      this.formregister.name = "";
      this.formregister.email = "";
      this.formregister.password = "";
    }
  }
};
</script>

<style>
</style>