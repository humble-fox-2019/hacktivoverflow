<template>
    <div class="bg">
        <div class="header">
            <div>All Question</div>
            <div class="horizontal-line"></div>
        </div>
        <div v-for="question in this.$store.state.allQuestion" :key="question._id">
            <Question :question='question'>
                <div class="flex-right">
                    <button class="btn" @click.prevent="questionDetail(`${question._id}`)">Show Detail</button>
                </div>
            </Question>
        </div>
    </div>
</template>

<script>
import Question from '../components/Question'
export default {
    name : "QuestionList",
    components : {
        Question
    },
    methods: {
        questionDetail( questionId ) {
            this.$router.push(`/questions/${ questionId }`)
        }
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
.flex-left {
    display:flex;
}

</style>