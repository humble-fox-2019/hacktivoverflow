<template>
    <div class="bg">
        <div class="col"  >
            <div class="row btn" @click.prevent="allQuestion()" >
                <div class="col-3"><i class="fas fa-border-all"></i></div>
                <div class="col-9">All Question</div>
            </div>
            <div class="row btn" @click.prevent="myQuestion()">
                <div class="col-3"><i class="fas fa-question"></i></div>
                <div class="col-9">My Question</div>
            </div>
            <!-- <div class="row btn" @click.prevent="myAnswer()" v-if="this.$store.state.isLogin">
                <div class="col-3"><i class="far fa-lightbulb"></i></div>
                <div class="col-9">My Answer</div>
            </div> -->
            <div class="row" style='display:flex; justify-content:center;'>
                <div class="top-question col">
                    <h2>Watched Tags</h2>
                    <vue-tags-input
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => tags = newTags"
                    />
                </div>
            </div>
            <div class="row" style='display:flex; justify-content:center;'>
                <div class="top-question col">
                    <h2>Quick Search</h2>
                    <div class="flex">
                        <div v-for="(tag , index) in tags" :key="index" @click.prevent="searchByTag(`${tag.text}`)" class="tag">{{ tag.text }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
    name : "SideBar",
    data () {
        return {
            tag: '',
            tags: [],
        }
    },
    components: {
        VueTagsInput
    },
    methods : {
        allQuestion() {
            this.$store.dispatch('fetchAllQuestion')
            this.$router.push('/questions').catch( _ => {} )
        },
        myQuestion() {
            this.$router.push('/myQuestion').catch( _ => {} )
        },
        searchByTag ( tag ) {
            this.$router.push(`/search/${tag}`).catch( _ => {})
        },
    },
    watch: {
        tags : function( tags ) {
            let myTag = []
            tags.forEach( tag => {
                myTag.push( tag.text ) 
            })
            this.$store.dispatch('updateUserTag' , myTag )
            .then( response => {
                console.log("UPDATED")
                return this.$store.dispatch('fetchUserTag')
            })
            .then( response => {
                this.$store.commit('setUserTag', response.data )
            })
            .catch( console.log )
        }
    },
    mounted() {
        this.$store.dispatch('fetchUserTag')
        .then( response => {
            this.$store.commit('setUserTag', response.data )

            let userTag = this.$store.state.user.tags;
            this.tags = [] 
            userTag.forEach( tag => {
                this.tags.push({ text : tag })
            })
        })
        .catch( console.log  )
        
    }
}
</script>

<style scoped>
.bg {
    background-color: white !important;
    height: 100%;
}
.btn {
    border-radius: 0px;
    padding: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.btn:hover {
    background-color: lightgray
}
.btn > div {
    text-align: left;
}
div > i { 
    width: 30px;
}
.top-question {
    text-align: center;
    padding: 5px;
}
.card {
    border-radius: 0px;
}
.tag {
    background-color: lightblue;
    padding: 2px 5px;
    cursor: pointer;
    margin: 2px;
}
.tag:hover {
    background-color: rgb(132, 199, 221);
}
.flex{
    display: flex;
    flex-wrap: wrap
}
</style>