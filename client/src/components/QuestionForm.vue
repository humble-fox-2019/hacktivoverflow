<template>
    <div>
        <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
        <form>
            <label>Title</label><br>
            <input type="text" name="title" id="form-title" v-model="form.title"><br>
            <label>The Question</label><br>
            <!-- Create the toolbar container -->
            <div id="toolbar-question">
                <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>
            </div>
            <div id="editor-question">
                    <p>Hiya! What do you wanna ask?</p>
                    <p><br></p>
            </div>
            <button type="button" @click="submitQuestion">Ask the community</button>
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
            }
        }
    },
    methods : {
        submitQuestion : function () {
            const packet = {
                title : this.form.title,
                description : this.quill.getText(),
                owner : this.$store.state.user
            }
            this.$store.dispatch('submitQuestion', packet)
            .then(()=>{
                this.quill.setText("")
                console.log('question added')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted : function (){
        this.quill = new Quill('#editor-question', {
            modules: { toolbar: '#toolbar-question' },
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