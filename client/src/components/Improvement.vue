<template>
    <div class="improvement">
        {{improvement.description}}
    </div>
</template>

<script>
export default {
    props : {
        improvement : Object
    }
}
</script>

<style>
    .improvement {
        color: brown;
        background-color: gainsboro;
        padding: 1%;
        margin : 1%;
    }
</style>