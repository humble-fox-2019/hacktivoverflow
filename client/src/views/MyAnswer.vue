<template>
    <div></div>
</template>

<script>
export default {
    name :"MyAnswer",
    created () {
        this.$store.dispatch('fetchMyAnswer')
    }
}
</script>

<style>

</style>