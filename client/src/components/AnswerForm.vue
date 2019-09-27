<template>
    <div>
        <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
        <form>
            <label>Answer</label><br>
            <!-- Create the toolbar container -->
            <div id="toolbar">
                <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>
            </div>
            <div id="editor">
                    <p>Hi there! What's on your mind?</p>
                    <p><br></p>
            </div>
            <button type="button" @click="submitAnswer">Answer</button>
        </form>
    </div>
</template>
<script>
import Quill from 'quill'
import axios from 'axios'

export default {
     data : function (){
        return {
            quill : "",
            form : {
                title : "",
                description : "",
                file : ""
            }
        }
    },
    props : {
        question : Object
    },
    methods : {
        submitAnswer : function () {
            const packet = {
                qId : this.question._id,
                description : this.quill.getText(),
            }
            this.$store.dispatch('submitAnswer', packet)
            .then(()=>{
                this.$emit('update-answers')
                this.quill.setText("")
                console.log('answer added')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted : function (){
        this.quill = new Quill('#editor', {
            modules: { toolbar: '#toolbar' },
            theme: 'snow'
        });
    } 
}
</script>

<style scoped>
.quill-container {
    background-color: honeydew;
    position: fixed;
    bottom: 50px;
    right: 15px;
    border: 3px solid #f1f1f1;
    z-index: 2;
}
</style>