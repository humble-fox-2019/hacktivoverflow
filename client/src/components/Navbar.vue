<template>
    <div class="navbar">
        <div class="container" >
            <div style="display:flex; justify-content: flex-start; align-items:center">
                <div id="logo" @click.prevent="home()">AskOverflow</div> 
                <div class="vertical-line"></div>

                <div class="nav-item" v-if="this.$store.state.isLogin" @click.prevent="askQuestion()">Ask Question</div>
                
            </div>
            <div style="display:flex; justify-content: flex-end; align-items:center">
                <div class="md-form mt-0" style="display:flex;">
                    <input class="form-control mr-3" type="text" placeholder="Search" aria-label="Search" v-model="searchKeyword">
                    <button class="mr-3 nav-item" style="font-size: 12px; color:white; background-color: #272930" @click.prevent="search()"> Search </button>
                </div>
                <div class="nav-item primary" v-if="this.$store.state.isLogin" @click.prevent="logout()">Logout</div>
                <div class="nav-item primary" v-else @click.prevent="login()">Login</div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name : "Navbar",
    data() {
        return {
            searchKeyword : ''
        }
    },
    methods: {
        login() {
            this.$router.push('/login').catch( _=>{} )
        },
        logout() {
            localStorage.clear();
            this.$store.commit('setIsLogin' , false )
            this.$router.push('/login')
        },
        home() {
            this.$router.push('/questions').catch( _=>{} )
        },
        askQuestion() {
            this.$router.push('/ask').catch( _=> {})
        },
        search() {
            this.$router.push(`/search/${ this.searchKeyword }`).catch( _=>{} )
        }
    }
}
</script>

<style scoped>
    .navbar {
        padding:0;
        height: 75px;
        background-color: #272930;
        color: white;
    }
    .vertical-line {
        background: #3b3d47;
        width: 1px;
        height: 75px;
        margin-right: 20px;
        margin-left: 40px;
    }
    #logo {
        font-size: 35px;
        color: white;
        cursor: pointer;
    }
    .nav-item {
        font-size: 15px;
        color: white;
        font-weight: bolder;
        padding: 5px 8px;
        border-radius: 3px;     
        margin-left: 10px;
        margin-right: 10px;   
    }
    .nav-item:hover {
        cursor: pointer;
        transition: 0.5s;
        background-color:#18181b;
    }
    .primary {
        background-color: #2d6ff7
    }
    input {
        border-radius: 20px;
    }
</style>