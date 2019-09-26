<template>
    <div class="root">
        <div class="left">
            <div class="box">
                <router-link to="/" ><img src="../assets/logo2.png" alt=""></router-link>
            </div>

        </div>
        <div class="right">
            <div class="box">
                <router-link class="link" v-if="!this.$store.state.isLogin" to="/auth" >Sign in</router-link>
                <a href="" class="link" v-else @click.prevent="logout">Logout</a>
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
    .link {
        color: black;
        text-decoration: none;
    }
    .link:hover{
        text-decoration-line: underline

    }
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
        -webkit-box-shadow: -5px 4px 13px 0px rgba(0,0,0,0.23);
        -moz-box-shadow: -5px 4px 13px 0px rgba(0,0,0,0.23);
        box-shadow: -5px 4px 13px 0px rgba(0,0,0,0.23);
    }
</style>