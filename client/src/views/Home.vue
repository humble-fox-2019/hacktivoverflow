<template>
  <div class="home">
    <div class="container d-flex flex-row justify-content-center pt-5">
      <ListQuestion v-bind:cols="6"/>
      <advertisement v-bind:cols="12"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListQuestion from "../components/ListQuestion";
import advertisement from '../components/advertisement'
export default {
  name: "home",
  components: {
    ListQuestion,
    advertisement
  },
  created (){
    let timerInterval
      this.$swal.fire({
        title: 'Loading......',
        html: 'Sabar Yaa!!!',
        timer: 1500,
        onBeforeOpen: () => {
          this.$swal.showLoading()
          timerInterval = setInterval(() => {
            this.$swal.getContent().querySelector('strong')
              .textContent = this.$swal.getTimerLeft()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.timer
        ) {
          console.log('I was closed by the timer')
        }
      })
    if(!localStorage.getItem('token')){
      this.$router.push('/login')
    }
    
    this.$store.dispatch('RenderQuestion')
    this.$store.dispatch('getWatchedTag')
    console.log(this.questionlist , ' di home ini ya')
  },
  watch : {
    '$store.state.listQuestion' : function (){
      // this.questionlist = this.$store.state.listQuestion
    }
  }
};
</script>
