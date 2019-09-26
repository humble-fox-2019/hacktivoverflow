<template>
  <div class="mx-auto">
    <div class="container row">
      <sidebar></sidebar>
      <div class="col-8">
        <v-btn color="#FFB300" @click="dialog=true">New Question</v-btn>
        <questionComp v-for="question in filteredQuestion" :key="question._id" :question="question"></questionComp>
      </div>
    </div>
    <v-dialog v-model="dialog"  persistent max-width="600px" >
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-card color="#FFB300">
        <v-form @submit.prevent="createQuestion">
        <v-card-title>
          <span class="headline">New Question</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="formQuestion.title" label="Title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  v-model="formQuestion.description"
                  auto-grow
                  >
                </v-textarea>
                
              </v-col>
              <v-col cols="12">
              <v-combobox
                v-model="formQuestion.tags"
                hide-selected
                label="Add some tags"
                multiple
                persistent-hint
                small-chips
                deletable-chips
              ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn  @click="dialog = false">Close</v-btn>
          <v-btn  type="submit" autofocus>Save</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import questionComp from "../components/question.vue";
import sidebar from "../components/sidebar";
import {mapState} from "vuex"

export default {
  components: {
    questionComp,
    sidebar
  },
  computed : {
    ...mapState(["allQuestions"]),
    filteredQuestion(){
      let tags = this.$store.state.userTags
      let result = []
      if (tags.length!==0){
        for (let question of this.allQuestions){
          for (let tag of tags){
            if(question.tags.includes(tag)){
              result.push(question)
              break;
            }
          }
        }
        return result
      }
      else { 
        return this.allQuestions
      }
    }
  },
  data() {
    return {
      dialog: false,
      formQuestion : {
          title : "",
          description : "",
          tags : []
      }
    };
  },
  methods:{
    createQuestion(){
      this.$swal.showLoading()
      this.$store.dispatch("createQuestion", this.formQuestion)
      .then(success=>{
        this.dialog = false
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.$store.dispatch("getAllquestions")
    this.$store.dispatch("getTags")
  }
};
</script>
