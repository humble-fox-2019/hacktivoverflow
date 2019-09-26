<template>
  <!-- <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="max-width: 70rem; border-radius: 8px !important;"> -->
    <b-form class="d-flex flex-column align-items-start" @submit="onSubmit" @reset="onReset" v-if="show">
        <h5>Your Answer</h5>
        <b-form-input id="description" class="my-2" v-model="form.description" type="text" placeholder="your answer" required></b-form-input>

        <b-form-group class="d-flex flex-row mt-2 mb-0">
            <b-button class="mr-1" type="submit" size="sm" variant="outline-warning">
                <b-spinner v-if="loading" small type="grow"></b-spinner>
                Submit
            </b-button>
            <b-button v-if="action === 'edit'" class="mr-1" size="sm" variant="outline-secondary">
                Cancel
            </b-button>
        </b-form-group>
    </b-form>
  <!-- </b-card> -->
</template>

<script>
export default {
  name: 'FormAnswer',
  props: ['action', 'answerId'],
  data () {
    return {
      form: {
        description: '',
      },
      show: true,
      loading: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.action === 'add') {
        this.addAnswer()
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.description = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    addAnswer() {
      let payload = {
        questionId: this.$route.params.id,
        data: this.form
      }
      this.loading = true
      this.$store.dispatch('addAnswer', payload)
        .then(message => {
          this.loading = false
          
          this.$swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
          this.form.description = ''
          // this.$router.push('/')
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 3000
              }).fire({
                type: 'warning',
                title: error
              })
          })
        })
    },
    cancel() {
      // this.$router.push('/')
    }
  }

}
</script>

<style>

</style>
