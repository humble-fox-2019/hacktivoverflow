<template>
  <div>
    <v-toolbar color="#FFB300">
      <v-toolbar-title>X Overflow</v-toolbar-title>

      <v-btn text @click="gotoPage('/')">Home</v-btn>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="ml-auto">
        <v-btn text @click="logout">LogOut</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
     
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>

    <!-- Sidebar untuk navigation -->
    <v-navigation-drawer v-model="drawer" right absolute temporary color="#FFB300">
      <v-list-item class="mt-5">
        <v-list-item-avatar large>
          <v-img 
            src="https://img1.goodfon.com/wallpaper/nbig/6/c4/darth-vader-star-wars.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="ml-3">
          <v-list-item-title>OREVAS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <div>
          <v-list-item
            @click="gotoPage(item.path)"
            v-for="item in items"
            :key="item.title"
            link
          >
            <div style="display:flex">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>
        </div>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>person_pin</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      drawer: null,
      items: [
        {
          title: "Home",
          icon: "dashboard",
          path: "/"
        },
        {
          title: "My Question",
          icon: "shopping_cart",
          path: "/userquestions"
        },
        {
          title: "My Answer",
          icon: "shopping_cart",
          path: "/userAnswers"
        }
      ]
    };
  },
  methods : {
      logout(){
        
          localStorage.clear()
          this.$store.commit("LOGIN_STATUS", false)
          this.$router.push("/auth")
      },
      gotoPage(path){
        this.$router.push(path)
      }
  }
};
</script>

<style>
</style>
