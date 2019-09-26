<template>
    <div class="wrapper">
        <div class="box">
            
        </div>
        <div class="root" >
            <div style="display: flex; justify-content: flex-end">
                <div class="slot">
                    <div>
                        <p style="font-size: 1.8rem;">All Questions</p>
                        <p v-text="totalQuestion()"></p>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <router-link to="/ask"><button>Ask Question</button></router-link>
                    </div>
                </div>
            </div>
            <div class="question" v-for="question in this.$store.state.allQuestions" :key="question._id">
                <div class="left">
                    <div class="value">
                        <p v-text="vote(question).num" class="number"></p>
                        <p v-text="vote(question).text" class="word">votes</p>
                    </div>
                    <div class="value">
                        <p v-text="answer(question).num" class="number"></p>
                        <p v-text="answer(question).text" class="word">answers</p>
                    </div>
                </div>
                <div class="right">
                    <div class="title">
                        <a href="" style="text-decoration: none;" @click.prevent="test(question)"><p class="limit" v-text="question.title" style="font-weight: 500; color: #288dd6;"></p></a>
                    </div>
                    <div class="description">
                        <p class="limit" v-html="question.description" style="margin: 0px;"></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {

        }
    },
    methods:{
        test(question){
            this.$router.push(`/question/${question._id}`)
        },
        totalQuestion(){
            let num = this.numberWithCommas(this.$store.state.allQuestions.length)
            if(this.$store.state.allQuestions.length <= 1){
                return `${num} question`
            }
            else{
                return `${num} questions`
            }
        },
        vote(question){
            let total = question.upvotes.length - question.downvotes.length
            if(total <= 1 && total >= -1){
                return {
                    num: total,
                    text: 'vote'
                }
            }else{
                let num = this.numberWithCommas(total)
                return {
                    num,
                    text: 'votes'
                }   
            }
        },
        answer(question){
            if(question.answers.length <= 1){
                return {
                    num: (question.answers.length),
                    text: 'answer'
                }
            }else{
                let num = this.numberWithCommas((question.answers.length))
                return {
                    num,
                    text: 'answers'
                }   
            }
            
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    created(){
        this.$store.dispatch('fetchQuestions')
    }
}
</script>

<style scoped>

    .limit{
        width: 60vw;
        height: 4vh;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .question .right{
        display: flex;
        flex-direction: column;
        padding: 1vh 1vw;
        width: 90%;
    }
    .value{
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .word{
        font-size: 0.8rem;
    }
    .number{
        font-size: 1.5rem;
    }
    .question .left p{
        margin: 0;
        color: #69737C;
    }
    .question .left{
        height: 100%;
        width: 10%;
    }
    .context {
        padding: 2vh 2vw;
    }
    .question{
        width:100%;
        height: 20vh;
        border-top: 1px solid silver;
        display: flex;
    }
    .slot{
        display: flex;
        justify-content: space-between;
        width: 95%; 
    }
    .root{
        border-left: 1px solid silver;
        min-height: 93vh;
        display: flex;
        flex-direction: column;
    }
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
    }
    button {
        padding: 0.6rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        color: white;
        background-color: #3c85e6;
    }
    button:hover{
        background-color: #2c73d1;
    }
</style>