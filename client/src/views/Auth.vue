<template>
    <div class="wrapper">
        <div class="left">
            <img src="../assets/logo2.png" alt="">
        </div>
        <div class="right">
            <div style="width: 50%;" v-if="Login">
                <p class="label">Login</p>
                <form @submit.prevent="login">
                    <input v-model="email" type="text" placeholder="Email">
                    <input v-model="password" type="password" placeholder="Password">
                    <button type="submit">Sign In</button>
                </form>
                <a href="" @click.prevent="switchForm">Don't have an account?</a>

            </div>
            <div style="width: 50%;" v-else>
                <p class="label">Create a new account</p>
                <form @submit.prevent="register" >
                    <input v-model="email" type="text" placeholder="Email">
                    <input v-model="username" type="text" placeholder="Username">
                    <input v-model="password" type="password" placeholder="Password">
                    <button type="submit">Sign Up</button>
                </form>
                <a href="" @click.prevent="switchForm">Have an account?</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            username: "",
            email: "",
            password: "",
            Login: true
        }
    },
    methods: {
        switchForm(){
            this.username = ""
            this.email = ""
            this.password = ""
            if(this.Login) this.Login = false
            else this.Login = true
        },
        login(){
            this.$store.dispatch('login', {email: this.email, password: this.password})
        },
        register(){
            this.$store.dispatch('register', {email: this.email, password: this.password, username: this.username})
            .then(_=>{
                this.Login = true;
            })
        }
    }

}
</script>

<style scoped>
    img{
        width: 70%;
        height: 50%;
        object-fit: contain;
        
    }
    .right, .left {
        margin-top: 10vh;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .label{
        font-size: 2rem;
    }
    .wrapper {
        display: grid;
        height: 93vh;
        grid-template-columns: 1fr 1fr;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input, button {
        margin-bottom: 2vh;
        padding: 1vh 0.5vw;  
        font-size: 1rem;
    }

</style>