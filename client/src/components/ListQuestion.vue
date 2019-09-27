<template>
  <div class="container d-flex flex-column justify-content-center mt-5">
    <!-- <h1>{{this.questionlist}}</h1> -->
    <div class="d-flex justify-content-between mb-3">
      <h3 class="title-atas-22">All Question</h3>
      <button class="btn-add-q" @click="pindah">Add Question</button>
    </div>
    <div
      class="card-list-2 d-flex flex-row mt-2 border border-light"
      v-for="list in this.questionlist"
      :key="list._id"
    >
      <div class="p-4 d-flex flex-column">
        <div>
          <h3>{{list.votes}}</h3>
          <h5>Votes</h5>
        </div>
        <div>
          <h3>{{list.Answer.length}}</h3>
          <h5>Answer</h5>
        </div>
      </div>
      <div class="pt-4">
        <div style="text-align : left;">
          <button
            class="buttonzss"
            href="#"
            @click="detail(list._id)"
            style="text-align : left; color : blue;"
          >{{list.title}}</button>
        </div>
        <div style="padding-top 20px;">
          <p style="text-align : left; " class="des-question">{{list.description}}</p>
        </div>
        <div>
          <!-- {{list.tags}} -->
          <div style="text-align : left; " class="d-flex flex-row"  >
            <div v-for="tag in list.tags" :key="tag._id" class="for-tag-11" >
              <a href="#" class="mr-1 for-tag-22"  @click="tagPindah(tag.name)">{{  tag.name}}</a>
            </div>
          </div>
          <div style="text-align : left;" class="pt-2">
            <p style="font-family: 'Roboto Mono', monospace;font-weight: 100px; font-size : 14px;">created By {{list.User.username}}</p>
            <div v-if="IdUser == list.User._id">
              <img src="https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Edit-01-512.png" class="icon-crud" @click="moveEdit(list._id)"  alt="">
              <img src="https://image.flaticon.com/icons/png/512/61/61848.png" class="icon-crud" @click="deleteZ(list._id)"  alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from './pagination'
export default {
  components : {
    Pagination
  },
  methods: {
    pindah() {
      this.$router.push("/question");
    },
    detail(id) {
      // console.log(id)
      let timerInterval
      this.$swal.fire({
        title: 'Loading......',
        html: 'Sabar Yaa!!!',
        timer: 3000,
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
      this.$router.push(`/detail/${id}`);
    },
    moveEdit (id){
      let timerInterval
      this.$swal.fire({
        title: 'Loading......',
        html: 'Sabar Yaa!!!',
        timer: 3000,
        onBeforeOpen: () => {
          this.$swal.showLoading()
          timerInterval = setInterval(() => {
            // this.$swal.getContent().querySelector('strong')
            //   .textContent = this.$swal.getTimerLeft()
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
          // this.$router.push(`/searchTag?tag=${name}`)
          console.log('I was closed by the timer')
        }
      })
      this.$router.push(`/editquestion/${id}`)
    },
    deleteZ(id) {
        this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteQuestion',{ id })
          .then(data=>{
             this.$swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          })
          .catch(console.log)
        }
      })
    },
    tagPindah (name){
      let timerInterval
      this.$swal.fire({
        title: 'Loading......',
        html: 'Sabar Yaa!!!',
        timer: 3000,
        onBeforeOpen: () => {
          this.$swal.showLoading()
          timerInterval = setInterval(() => {
            // this.$swal.getContent().querySelector('strong')
            //   .textContent = this.$swal.getTimerLeft()
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
          // this.$router.push(`/searchTag?tag=${name}`)
          console.log('I was closed by the timer')
        }
      })
      this.$router.push(`/searchTag?tag=${name}`)
    }
  },
  computed: {
    questionlist() {
      return this.$store.state.listQuestion;
    }
  },
  data() {
    return {
      IdUser: localStorage.getItem("id"),
      most : ''
    };
  }
};
</script>

<style >
/* * {
  font-family: 'Roboto Mono', monospace;
  font-weight: 90px;
} */
.icon-crud {
  height : 5%; 
  width : 5%;
  margin-right: 5px;
  cursor: pointer;
}
.for-tag-11 {
  background-color : whitesmoke; 
  margin-right : 9px;
  height: 30px;
}
.for-tag-22 {
  background-color: whitesmoke;
  color : black;
  font-family: 'Oswald', sans-serif;
  font-weight: 100px;
  font-size: 15px;
}
.btn-add-q {
  background-color: salmon !important;
  border: none !important;
  font-family: 'Roboto Mono', monospace;
  font-size: 18px !important;
  font-weight: 100px;
  color: white;
  border-radius: 0.5rem;
}
.title-atas-22 {
  font-family: 'Oswald', sans-serif;
  font-weight: 100px;
  font-size: 40px;
  color: #000000;
}
.card-list-2 {
  width: 99%;
  height: 230px;
  background-color: #ffffff;
  border-radius: 1.2rem;
  margin-bottom: 10px;
  box-shadow: 4px 2px 2px  #363a45;
}
.buttonzss {
  background: none !important;
  border: none;
  padding: 0 !important;
  cursor: pointer;
  list-style: none;
  margin-bottom: 10px;
  color: #121212 !important;
  font-family: 'Roboto Mono', monospace;
  font-weight: 90px;
  font-size: 16px;
}
.des-question {
  color: #5d646e !important;
  font-family: 'Roboto Mono', monospace;
  font-weight: 90px;
  font-size: 15px;
}
</style>