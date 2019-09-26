<template>
    <div class="bckground">
        <div class="wrapper">
            <div class="root">
                <div>
                    <p style="font-size: 1.6rem;">Edit you question</p>
                </div>
                <div class="content" style="display:flex; flex-direction: column;">
                    <div class="box" style="width:100%; margin-bottom: 4vh;">
                        <p class="title">Question Title</p>
                        <input v-model="title" type="text" placeholder="Title">
                    </div>
                    <div class="box" style="width:100%;">
                        <p class="title">Question Body</p>
                        <wysiwyg class="formQuestion" v-model="description" />
                    </div>
                    <div>
                        <button v-if="this.$store.state.isLogin" @click.prevent="edit">Edit</button>
                        <router-link v-else to="/auth"><button>Login</button></router-link>
                    </div>
                    <div class="output">
                        <p style="font-weight: 700; font-size:1.5rem; margin-bottom: 3vh;" v-text="title"></p>
                        <p style="width: 60vw; word-wrap: break-word;" v-html="description" ></p>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
export default {
    data: function(){
        return {
            title: "",
            description: ""
        }
    },
    methods:{
        edit(){
            this.$store.dispatch('updateQuestion', {id: this.$route.params.id, title: this.title, description: this.description})
        }
    },
    created(){
        this.$store.dispatch('fetchAQuestion', this.$route.params.id)
        .then(data =>{
            this.title = data.title
            this.description = data.description
        })   
    }
}
</script>

<style scoped>
.title{
        margin-bottom: 2vh;
    }
    .output{
        margin-top: 5vh;
        margin-bottom: 5vh;
        border-top: 1px solid silver;
        border-bottom: 1px solid silver;
        padding-top: 3vh;
        padding-bottom: 3vh;
        
        
    }
    input {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
        width: 50vw;
        border-radius: 5px;
        border: 1px solid grey;
    }
    .content{
        padding: 1rem;
    }
    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        color: white;
        background-color: #3c85e6;
    }
    .bckground{
        min-width: 100vw;
        min-height: 93vh;
        background-color: #EFF0F1;
    }
    .formQuestion{
        width: 60vw;
        overflow-wrap: break-word;
    }
    p{
        margin: 0
    }
    .box{
        margin-bottom: 5vh;
    }
    .content{
        margin-top: 5vh;
        min-height: 70vh;
        background-color: white;
        border-radius: 5px;
        box-shadow: -3px 4px 12px -2px rgba(0,0,0,0.75);
        -webkit-box-shadow: -3px 4px 12px -2px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 4px 12px -2px rgba(0,0,0,0.75);
    }
    .root{
        /* padding-left: 4vw; */
        /* padding-right: 4vw; */
        display: flex;
        width: 100%;
        flex-direction: column;
    }
    .wrapper {
        margin-left: auto;
        margin-right: auto;
        padding-top: 5vh;
        display: grid;
        width: 90%;
        padding-bottom: 10vh;
        grid-template-columns: 4fr 1fr;
    }
</style>