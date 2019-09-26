<template>
    <div class="container">
        <div class="row border-bottom">
            <div class="col-2">
                <p>Rate this answer</p>
                <Votes :upvotes="ans.upvotes" :downvotes="ans.downvotes" :type="'answers'" :id="parseInt(this.answer.id)"/>
            </div>
            <div class="col-10">
                <p>{{answer.description}}</p>
                <Improvement v-for="(improvement,i) in improvements" :key="i" :improvement="improvement"/>
            </div>
        </div>
    </div>
</template>

<script>
import Improvement from '@/components/Improvement.vue'
import Votes from '@/components/Votes.vue'

export default {
    components : {
        Improvement,
        Votes
    },
    data : function () {
        return {
            improvements : [],
            ans : this.answer
        }
    },
    props : {
        answer : Object
    },
    watch: {
        answer(newVal) {
            this.ans = newVal
        }
    },
    created : function () {
        this.$store.dispatch('getImprovements', this.answer.id)
        .then (({ data })=>{
            this.improvements = data
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style scoped>
    .row {
        background-color: ghostwhite;
        padding : 1%;
        margin : 2%;
    }
</style>