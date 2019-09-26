<template>
    <div class="question">
        <h1>{{question.title}}</h1>
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