<template>
<div>
  <answer v-for="answer in userAnswers"  :key="answer._id"  :answer="answer" :isUser="true"></answer>
</div>
</template>

<script>

import answer from "../components/answer"
import {mapState} from "vuex"
export default {
    name : "userAnswers",
    components : {
        answer
    },  
    data(){
        return {
            
        }
    },
    computed : {
        ...mapState(["userAnswers"])
    },
    methods : {
        
    },
    created(){
        this.$store.dispatch("getUserAnswers")
    }

}
</script>

<style>

</style>
