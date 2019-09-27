<template>
  <div class="navbarUltra">
    <b-navbar toggleable="lg" type="dark" class="navbarbody">
      <b-navbar-brand href="#">River Over Flow</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="twitter.com">Ask Any thing!</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- MODAL CREATE -->
          <div class="modalsCreate">
            <!-- <b-button id="show-btn" @click="showModal">Open Modal</b-button> -->
            <b-button
              variant="outline-light"
              class="mr-2"
              id="toggle-btn"
              @click="toggleModal"
            >POST NOW</b-button>

            <b-modal ref="my-modal" hide-footer title="Using Component Methods">
              <!-- isi modals -->
              <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Title"
                label-for="input-horizontal"
              >
                <b-form-input id="input-horizontal" v-model="title"></b-form-input>
              </b-form-group>

              <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                description="tell us about your issue"
                label="Content"
                label-for="input-horizontal"
              >
                <b-form-input id="input-horizontal" v-model="content"></b-form-input>
              </b-form-group>

              <!-- isi modals -->
              <b-button class="mt-2" variant="outline-success" block @click="toggleModal">Post</b-button>

              <b-button class="mt-3" variant="outline-warning" block @click="hideModal">Cancel</b-button>
            </b-modal>
          </div>

          <b-nav-item-dropdown text="Navigation" right>
            <b-dropdown-item href="#">Home</b-dropdown-item>
            <b-dropdown-item href="#">About Us</b-dropdown-item>
            <!-- <b-dropdown-item href="#">Post a Question</b-dropdown-item> -->
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-item href="#" @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
      title: "",
      content: ""
    };
  },

  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push("/loginRegister");
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      let payload = {
        title: this.title,
        content: this.content
      };
      this.$refs["my-modal"].toggle("#toggle-btn");
      this.$store
        .dispatch("createQuestion", payload)
        .then(data => {
          console.log("berhasil masuk dikirim ke store");
        })
        .catch(err => {
          console.log(err, "<<< OOPS ADA YANG ERROR DIBAGIAN CREATE QUESTION");
        });
    }
  }
};
</script>

<style>
.navbarbody {
  /* background-color:  */
  background-image: radial-gradient(
    circle farthest-corner at -1.7% -2.7%,
    rgba(250, 138, 138, 1) 0%,
    rgba(198, 124, 204, 1) 90%
  );
  height: 100px;
}
</style>