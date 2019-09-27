<template>
    <div class="container">
        <div class="row">
            <div class="col-2 border-right border-dark" >
                <h2>Rate question</h2>
                <Votes :upvotes="question.upvotes" :downvotes="question.downvotes" :type="'questions'" :id="this.$route.params.id"/>
            </div>
            <div class="col-10" >
                <Question :question="question" />
                <Answer v-for="(answer,i) in answers" :key="i" :answer="answer"/>
                <AnswerForm :question="question" @update-answers="updateAnswer" />
            </div>
        </div>
    </div>
</template>

<script>
import Question from '@/components/Question.vue'
import Answer from '@/components/Answer.vue'
import AnswerForm from '@/components/AnswerForm.vue'
import Votes from '@/components/Votes.vue'

export default {
    name : 'detail',
    components : {
        Question,
        Answer,
        AnswerForm,
        Votes
    },
    data : function () {
        return {
            question : "",
            answers : []
        }
    },
    methods : {
        updateAnswer : function () {
            this.$store.dispatch('getAnswers',this.$route.params.id)
                .then(({ data })=>{
                    this.answers = data.answers
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    },
    created : function () {
        this.$store.dispatch('getQuestion',this.$route.params.id)
        .then(({ data })=>{
            this.question = data.question
            this.$store.dispatch('getAnswers',this.$route.params.id)
            .then(({ data })=>{
                this.answers = data.answers
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style>

</style>