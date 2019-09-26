<template>
    <div class="mt-4">
        <form class="card p-3" @submit.prevent="addQuestion()">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Question Title" v-model="title">
            </div>
            <div class="form-group">
                <wysiwyg v-model="description" />
                <!-- <textarea name="description" class="form-control" id="" cols="30" rows="10" v-model="description" placeholder="your question here..."></textarea> -->
                <!-- <input type="text" class="form-control" placeholder="Your question here..." v-model="description"> -->
            </div>
            <div class="form-group">
                <vue-tags-input
                id="my-custom-wrapper"
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
                style="border-radius:20px;"
                />
            </div>
            <button type="submit" class="btn ">Submit</button>
        </form>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import Swal from 'sweetalert2'
export default {
    name : "QuestionForm",
    data () {
        return {
            title: "",
            description : "",
            tag: '',
            tags: [],
        }
    },
    components : {
        VueTagsInput,
    },
    methods : {
        addQuestion(){
            let myTags = []
            this.tags.forEach( tag => {
                myTags.push( tag.text )
            })
            this.$store.dispatch('addQuestion' , {
                title : this.title,
                description : this.description,
                tags : myTags
            })
            .then( response => {
                Swal.fire('Success Post Question' , '' , 'success')
                this.$store.dispatch('fetchMyQuestion')
                this.$router.push('/myQuestion')
            })
            .catch( err => {
                if( err.response.data ) 
                    Swal.fire('Error' , err.response.data[0] , 'error' )
                else console.log( err.response )
            })
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 40px;
        color: black;
    }
    input {
        border-radius: 20px;
    }
    .btn {
        border-radius: 20px;
        background-color: rgb(21, 35, 168);
        color: white;
    }
    .btn:hover{
        color: white;
        background-color: rgb(48, 64, 211);
    }
    #my-custom-wrapper.vue-tags-input {
        max-width: none;
        border-radius: 20px;
        width: 100%;
    }
</style>