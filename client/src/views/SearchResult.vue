<template>
  <div>
      <div class="bg">
        <div class="header">
            <div>Search Result</div>
            <div class="horizontal-line"></div>
        </div>
        <div v-for="question in this.$store.state.searchQuestions" :key="question._id">
            <Question :question='question' @fetchSearch='fetchSearch()'>
                <div class="flex-right">
                    <button class="btn" @click.prevent="questionDetail(`${question._id}`)">Show Detail</button>
                </div>
            </Question>
        </div>
    </div>
  </div>
</template>

<script>
import Question from '../components/Question'
import axiosInstance from '../api/axios'

export default {
    name : "SearchResult",
    data () {
        return {
        }
    },
    components : {
        Question
    },
    watch : {
        '$route.params.id' : function( keyword ) {
            this.fetchSearch()
        }
    },
    methods: {
        questionDetail( questionId ) {
            this.$router.push(`/questions/${ questionId }`)
        },
        fetchSearch() {
            this.$store.dispatch('fetchSearchQuestion' , this.$route.params.id )
            .then( response => {
                this.$store.commit('setSearchQuestion' , response.data )
            })
            .catch( console.log )
        }
    },
    created() {
        this.fetchSearch()        
    }
}
</script>

<style scoped>
.header {
    font-size: 25px;
    color: black;
    font-weight: bolder
}
.horizontal-line {
    width: 100%;
    height: 2px;
    background-color: rgb(40, 40, 221);
}
.bg {
    padding: 20px;
    background-color: white
}
</style>