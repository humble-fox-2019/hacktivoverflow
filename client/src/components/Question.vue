<template>
    <div class="question">
        <h1>{{question.title}}</h1>
        <p>{{question.description}}</p>
        <p>Posted by: {{question.owner.username}}</p>
    </div>
</template>

<script>
export default {
    props : {
        question : Object
    }
}
</script>

<style scoped>
    .question {
        padding: 2%
    }
</style>