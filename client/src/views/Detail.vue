<template>
<div style="display:flex; flex-direction: column;">
    <h3>Question by : {{ oneQuestion.author.name }}</h3>
    <div style="margin-bottom: 100px; margin-top: 20px;">
        <Card :question="oneQuestion" :status="'voteQuestion'"></Card>
    </div>
    <h5>Answers: {{ oneQuestion.answer.length }}</h5>
    <div class="border-top">
        <Card :question="answer" v-for="answer in oneQuestion.answer" :key="answer._id" :status="'voteAnswer'"></Card>
    </div>
    <div style="margin-top: 50px; margin-bottom: 60px; display: flex; flex-direction: column; width: 100%;">
        <h4 style="margin: 0; margin-bottom: 10px;">Your Answer</h4>
        <wysiwyg id="wysiwyg" v-model="form.answer"></wysiwyg>
        <b-button style="width: 20%; margin-top: 20px;" variant="success" @click.prevent="submitAnswer">Submit</b-button>
    </div>
</div>
</template>

<script>
import Card from '../components/Card'
import { mapState } from 'vuex'
export default {
    components: {
        Card
    },
    data() {
        return {
            answer: '',
            form: {
                answer: '',
            }
        }
    },
    methods: {
        submitAnswer () {
            const payload = {
                description: this.form.answer,
                questionId: this.$route.params.id
            }
            console.log(payload, "ini masuk ke submit answer")
            this.$store.dispatch('createAnswer', payload)
            this.form.answer = ''
        }
    },
    created() {
        this.$store.dispatch('findOneQuestion', this.$route.params.id)
    },
    computed: {
        ...mapState(['oneQuestion'])
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>