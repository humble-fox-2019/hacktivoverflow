<template>
  <div>
    <!-- Page Content -->
    <div class="bg-body-dark bg-pattern">
      <div class="row mx-0 justify-content-center">
        <div class="hero-static col-lg-6 col-xl-4">
          <div class="content content-full overflow-hidden">
            <!-- Header -->
            <div class="py-30 text-center">
              <h1 class="h4 font-w700 mt-30 mb-10">Create New Account</h1>
              <h2 class="h5 font-w400 text-muted mb-0">Get stuck? don't worry you'r not alone :)</h2>
            </div>
            <!-- END Header -->

            <form class="js-validation-signup" v-on:submit.prevent="onSubmit">
              <div class="block block-themed block-rounded block-shadow">
                <div class="block-header bg-gd-emerald">
                  <h3 class="block-title">Please add your details</h3>
                </div>
                <div class="block-content">
                  <div class="form-group row">
                    <div class="col-12">
                      <label for="signup-username">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="signup-username"
                        name="signup-username"
                        placeholder="Enter your name"
                        v-model="name"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-12">
                      <label for="signup-email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="signup-email"
                        name="signup-email"
                        placeholder="Enter your email"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-12">
                      <label for="signup-password">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="signup-password"
                        name="signup-password"
                        placeholder="Enter your password"
                        v-model="password"
                      />
                    </div>
                  </div>
                  <div class="form-group row mb-0">
                    <div class="col-sm-5 push"></div>
                    <div class="col-sm-7 text-sm-right push">
                      <button type="submit" class="btn btn-alt-success">
                        <i class="fas fa-plus mr-10"></i> Create Account
                      </button>
                    </div>
                  </div>
                </div>
                <div class="block-content bg-body-light">
                  <div class="form-group text-center">
                    <a
                      class="link-effect text-muted mr-10 mb-5 d-inline-block"
                      href="#"
                      data-toggle="modal"
                      data-target="#modal-terms"
                    >
                      <i class="fas fa-book text-muted mr-5"></i> Read Terms
                    </a>
                    <router-link
                      to="/login"
                      class="link-effect text-muted mr-10 mb-5 d-inline-block"
                    >
                      <i class="fas fa-sign-in-alt"></i> Login
                    </router-link>
                  </div>
                </div>
              </div>
            </form>
            <!-- END Sign Up Form -->
          </div>
        </div>
      </div>
    </div>
    <!-- END Page Content -->

    <!-- Terms Modal -->
    <div
      class="modal fade"
      id="modal-terms"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-terms"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-slidedown" role="document">
        <div class="modal-content">
          <div class="block block-themed block-transparent mb-0">
            <div class="block-header bg-primary-dark">
              <h3 class="block-title">Terms &amp; Conditions</h3>
              <div class="block-options">
                <button
                  type="button"
                  class="btn-block-option"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="si si-close"></i>
                </button>
              </div>
            </div>
            <div class="block-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, repellat? Temporibus laborum dolore, explicabo laboriosam quidem inventore pariatur aliquam minus maxime debitis quibusdam, repellendus deleniti harum, expedita assumenda vel porro!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel illum ipsum ipsam eos sequi et sunt quod exercitationem asperiores laborum atque cumque accusantium veniam nam tempore vero, amet error.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum molestias, ea consequuntur, animi architecto ut, blanditiis totam vitae mollitia cumque repellendus. Ratione, unde a repudiandae ut at ipsum quia debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, dolorum adipisci officia atque incidunt, praesentium voluptatem porro maxime rem voluptatibus consequatur cum recusandae quos mollitia veritatis! Quod magni necessitatibus quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, ex tempore est officia inventore, sed magnam dolore id fugit a eaque consectetur aperiam mollitia natus. Recusandae sit minus officia quidem? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam nobis fugiat necessitatibus odio atque! Itaque iusto quae ratione quia magnam eveniet laudantium recusandae, voluptates mollitia fugit deserunt dolore hic facere.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam in provident vero voluptatem distinctio quod doloremque nostrum dicta repellendus deserunt, officiis labore nobis ratione magnam itaque nulla dolorem. Consectetur, veniam? loading Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit expedita, maxime autem, laborum accusantium doloremque quae quaerat perferendis, reiciendis quos magnam libero veritatis tempora! Mollitia consectetur ipsum sit aspernatur magnam!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, eos unde? Ullam distinctio perferendis odit ad cumque eos asperiores accusantium sit, vel obcaecati incidunt, fugit alias ipsa voluptas. Sunt, sed? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium temporibus odio mollitia iusto earum doloribus eligendi inventore quos, rem nulla illum rerum, est voluptate incidunt, ea voluptatum obcaecati unde asperiores.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-alt-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-alt-success" data-dismiss="modal">
              <i class="fas fa-check"></i> Perfect
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/apis/axios";
import Toast from "@/helpers/toast";
import ErrorHandling from '@/helpers/errorHandling';

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      let userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      Axios({
        url: "/signup",
        method: "post",
        data: userData
      })
        .then(data => {
          Toast.fire({
            type: "success",
            title: "Registration successfully"
          });

          this.$router.push("/login");
        })
        .catch(ErrorHandling);
    }
  }
};
</script>

<style>
</style>