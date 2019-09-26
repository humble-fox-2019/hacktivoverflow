<template>
    <div class="container">
        {{this.$store.state.searchResults.length}} Results
        <div class="question-body row border-bottom border-dark" v-for="(question,i) in this.$store.state.searchResults" :key="i">
            <div class="col-2 border-right border-dark" >
                Points : {{question.upvotes - question.downvotes}} <br>
                Answers : {{question.answers}}
            </div>
            <div class="col-10">
                <h2 @click="goToQuestionPage(question.id)" class="q-title">{{question.title}}</h2><br>
                <p>{{question.description}}</p> <br>
                <p>{{question.tags}}</p> <br>
                <p>Posted by: {{question.owner}}</p> <br>
            </div>
        </div>
        <p>Do not find the question you're looking for?</p>
        <router-link link to="/">Ask the question here!</router-link>
    </div>
</template>

<script>
export default {
    name : 'results',
    data : function () {
        return {
            questions : []
        }
    },
    methods : {
        goToQuestionPage : function (id) {
            this.$router.push({name: 'detail', params : {id} })
        },
        getQs : function () {
            //this.$store.dispatch('displayQuestions')
            //console.log('woy')
            //console.log(this.$store.state.query)
        }
    },
    mounted : function () {
        
        //console.log('oo')
        
    }
}
</script>

<style>
    .question-body {
        background-color: antiquewhite;
        padding: 2% 1%
    }

    .q-title {
        cursor: pointer
    }

    .q-title:hover {
        color: brown
    }
</style>