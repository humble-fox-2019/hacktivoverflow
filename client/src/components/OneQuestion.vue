<template>
<div class="row">
    <div class="vote">
        <button>^</button>
        <hr>
        <h1>
        {{vote}}
        </h1>
        <hr>
        <button>v</button>
    </div>
<div class="one">
    <div class="authz"><button></button><button></button></div>
  <p class="date mini">{{createdAt}}</p>
  <h1>{{question.title}}</h1>
  <p>{{question.description}}</p>
  <br>
  <p class="mini">{{timePass}}</p>
  <hr />
</div>
</div>
</template>
<script>
// const moment = require('moment')
export default {
    props : ['question'],
    data() {
        return {
            createdAt : '',
            timePass : '',
            vote : 5
        }
    },
    methods :{
        // getTimePast(){

        // }
    },
    created(){
        // console.log(this.question);
        // console.log(this.question.createdAt.toDateString());
        this.createdAt = new Date (this.question.createdAt).toDateString()
        this.timePass = moment(new Date (this.question.createdAt)).fromNow()
    }

}
</script>

<style scoped>
.one{
margin: 10px 10px 25px 10px;
display: flex;
justify-content: flex-start;
flex-direction: column;
align-items: flex-start;
width: 80%;
}
.date{
    align-self: flex-end;
    margin-right:10px
}
.vote{
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center
}
.row{
    display: flex;
    justify-content: flex-start;
}
.authz{
    align-self: flex-end;
     margin-right:10px
}
.authz button{
    width: 25px;
    height: 25px;
    
}
h1{
      font-size: 16pt;
  font-family: Arial, Helvetica, sans-serif;
  color:#0266D6
}

.mini{
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif
}

.vote button{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    align-self: center
}

.vote h1{
    font-size: 18pt;
    font-style: inline;
    color: rgb(77, 76, 76)
}
.vote hr{
    width: 40%;
    align-self: center;
    margin: 8px
}
</style>