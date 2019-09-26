<template>
  <div>
    <div v-if="!editing" class="d-flex mt-4">
    <div class="d-flex flex-column mx-4">
        <div id="upvote" @click.prevent="upvoteAnswer">
            <font-awesome-icon :icon="['fas', 'arrow-up']" style="" />
        </div>
        <span> {{ answer.upvotes.length - answer.downvotes.length }} </span>
        <div id="downvote" @click.prevent="downvoteAnswer">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
        </div>
      </div>
      <div class="d-flex flex-column align-items-start justify-content-between mr-auto">
        <div>
            {{ answer.description }}
        </div>
        
      </div>
      <div class="d-flex flex-column justify-content-between align-items-end">
        <div id="action" class="">
          <span id="editQuestion" @click="editAnswer">
          <font-awesome-icon :icon="['fas', 'pen']" class="mr-2"/> 
          </span>  
          <span id="deleteQuestion">
            <font-awesome-icon :icon="['fas', 'trash']" class="mx-2" />  
          </span> 
        </div> 
        by: {{ answer.user.name }}
      </div>

    </div>
    <div v-else class="p-4">
      <FormAnswer :action="'edit'" :answerId="answer._id"></FormAnswer>
    </div>
  </div>
</template>

<script>
import FormAnswer from '../components/FormAnswer'

export default {
  name: 'ListAnswer',
  components: { FormAnswer },
  props: ['answer'],
  data () {
    return {
      editing: false
    }
  },
  methods: {
    upvoteAnswer () {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('upvoteAnswer', payload)
      .then(message => {
          this.loading = false
          
          this.$swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000
              }).fire({
                type: 'warning',
                title: error
              })
          })
        })
    },
    downvoteAnswer () {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('downvoteAnswer', payload)
      .then(message => {
          this.loading = false
          
          this.$swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000
              }).fire({
                type: 'warning',
                title: error
              })
          })
        })
    },
    editAnswer () {
      this.editing = true
    }
  }

}
</script>

<style scoped>
  #action, #upvote, #downvote {
    cursor:pointer;
  }
</style>