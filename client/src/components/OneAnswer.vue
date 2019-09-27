<template>
  <div>
    <div class="row">
      <div class="vote">
        <button @click="upVote">^</button>
        <hr />
        <h1>{{totalVote}}</h1>
        <hr />
        <button @click="downVote">v</button>
      </div>
      <div class="one">
        <div class="authz" v-if="authz">
          <button @click="editAnswer">
            <i class="fas fa-pencil-alt fa-2x"></i>
          </button>
          <button @click="deleteMe">
            <i class="fas fa-trash-alt fa-2x"></i>
          </button>
        </div>
        <p class="date mini">{{createdAt}}</p>
        <p class="date mini">{{timePass}}</p>
        <div v-html="answer.answer"></div>
        <br />
        <p class="normal">{{name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  props: ['answerId'],
  name: 'Answer',
  data () {
    return {
      createdAt: 0,
      totalVote: 0,
      timePass: 0,
      baseUrl: 'http://localhost:3000',
      answer: false,
      authz: false,
      up: false,
      down: false,
      name: ''
    }
  },
  methods: {
    normalize () {
      // console.log("be here");
      axios({
        method: 'put',
        url: `${this.baseUrl}/answer/normalize/${this.answer._id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          this.updateVote()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    upVote () {
      if (!localStorage.token) {
        this.$emit('toLogin')
      } else {
        if (!this.up) {
          axios({
            method: 'put',
            url: `${this.baseUrl}/answer/like/${this.answer._id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(data => {
              this.updateVote()
            })
            .catch(err => {
             if ( err.response.data.message ===  "you cannot like your own answer!") {
                Swal.fire({
                  title: "Error",
                  text: "you cannot like your own answer!",
                  type: "error",
                  confirmButtonText: "Error"
                });
              }
              this.normalize()
            })
        } else {
          this.normalize()
        }
      }
    },
    updateVote () {
      axios({
        method: 'get',
        url: `${this.baseUrl}/answer/${this.answer._id}`
      }).then(data => {
        let likes = data.data.data.likes.length
        let dislikes = data.data.data.dislikes.length
        let total = likes - dislikes
        this.totalVote = total
        this.checkMyVote(data.data.data)
      })
    },
    checkMyVote (answer) {
      this.up = false
      this.down = false
      for (let k = 0; k < answer.likes.length; k++) {
        if (
          answer.likes[k].userId === localStorage._id &&
          answer.likes[k].userId
        ) {
          this.up = true
        }
      }
      for (let k = 0; k < answer.dislikes.length; k++) {
        if (
          answer.dislikes[k].userId === localStorage._id &&
          answer.dislikes[k].userId
        ) {
          this.down = true
        }
      }
    },
    downVote () {
      if (!localStorage.token) {
        this.$emit('toLogin')
      } else {
        if (!this.up) {
          axios({
            method: 'put',
            url: `${this.baseUrl}/answer/dislike/${this.answer._id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(data => {
              this.updateVote()
            })
            .catch(err => {
              if ( err.response.data.message ===  "you cannot dislike your own question!") {
                Swal.fire({
                  title: "Error",
                  text: "you cannot like your own answer!",
                  type: "error",
                  confirmButtonText: "Error"
                });
              }
              this.normalize()
            })
        } else {
          this.normalize()
        }
      }
    },
    checkAuthz () {
      if (localStorage.token) {
        if (this.answer.userId._id === localStorage._id) {
          this.authz = true
        }
      }
    },
    editAnswer () {
      this.$router.push({ path: `/changeAnswer/${this.answer._id}` })
    },
    deleteMe () {
      axios({
        method: 'delete',
        url: `${this.baseUrl}/answer/${this.answer._id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          Swal.fire({ 
          title: 'Success Delete',
          text: '',
          type: 'Success',
          confirmButtonText: 'Cool'})
          this.$router.push({ path: `/question/${this.$route.params.id}` })
        })
        .catch(err => {
          console.log(err.data)
        })
    }
  },
  created () {
    axios({
      method: 'get',
      url: `${this.baseUrl}/answer/${this.answerId}`
    }).then(response => {
      this.answer = response.data.data
      this.createdAt = new Date(this.answer.createdAt).toDateString()
      this.totalVote = this.answer.likes.length - this.answer.dislikes.length
      this.timePass = moment(new Date(this.answer.createdAt)).fromNow()
      this.name = response.data.data.userId.name
      this.checkAuthz()
      this.updateVote()
    })
  }
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
  background: white;
  min-height: 50px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8pt;
  width: 700px;
}
.one {
  margin: 10px 10px 25px 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
}
.date {
  align-self: flex-end;
  margin-right: 10px;
}
.vote {
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.row {
  display: flex;
  justify-content: flex-start;
}
.authz {
  align-self: flex-end;
  margin-right: 10px;
}
.authz button {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-bottom: 6px;
}
h1 {
  font-size: 16pt;
  font-family: Arial, Helvetica, sans-serif;
  color: #0266d6;
}

.mini {
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}

.vote button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  align-self: center;
}

.vote h1 {
  font-size: 18pt;
  font-style: inline;
  color: rgb(77, 76, 76);
}
.vote hr {
  width: 40%;
  align-self: center;
  margin: 8px;
}
p.normal{
  color: rgb(87, 13, 156);
  font-weight: 350
}
</style>
