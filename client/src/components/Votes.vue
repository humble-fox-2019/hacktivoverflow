<template>
    <div>
        <button @click="updateVote('upvotes')">Upvote</button><br>
        {{up-down}}<br>
        <button @click="updateVote('downvotes')">Downvote</button>
    </div>
</template>

<script>
export default {
    data : function () {
        return {
            up : null,
            down : null
        }
    },
    props : {
        type : String,
        id : Number,
        upvotes : Number,
        downvotes : Number
    },
    watch: {
        upvotes(newVal) {
            this.up = newVal
        },
        downvotes(newVal) {
            this.down = newVal
        }
    },
    methods : {
        updateVote : function (voteType){
            let updateThis = 0
            if (voteType === 'upvotes'){
                this.up++
                updateThis = this.up
                //this.up++
            } else {
                this.down++
                updateThis = this.down
                //this.down++
            }
            const packet = {
                voteOf : this.type,
                id : this.id,
                voteType : voteType,
                value : updateThis
            }
            /* console.log(this.type)
            console.log(this.id) */
            this.$store.dispatch('updateVote', packet)
            .then(()=>{
                console.log('added vote')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    created : function(){
        this.up = this.upvotes
        this.down = this.downvotes
    }
}
</script>

<style>

</style>