<template>
    <div class="root">
        <div class="left">
            <div class="box">
                <router-link to="/" ><img src="../assets/logo2.png" alt=""></router-link>
            </div>

        </div>
        <div class="right">
            <div class="box">
                <router-link v-if="!this.$store.state.isLogin" to="/auth" >Sign in</router-link>
                <a href="" v-else @click.prevent="logout">Logout</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {

        }
    },
    methods: {
        logout(){
            this.$store.commit('setLogin', false)
            localStorage.removeItem('token')
            localStorage.removeItem('id')
        }
    }
}
</script>

<style scoped>
    img{
        width: 6vw;
        object-fit: contain;
    }
    .left{
        margin-left: 3vw;
    }
    .right{
        margin-right: 3vw;
    }
    .left .box{
        margin-left: 3vw;
    }
    .right .box{
        margin-right: 3vw;
    }
    .left, .right {
        display: flex
    }
    .root {
        width: 100vw;
        height: 7vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #efefef;
        border-bottom: 1px solid silver;
    }
</style>