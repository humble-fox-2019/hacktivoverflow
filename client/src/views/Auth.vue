<template>
  <b-container>
    <Signup></Signup>
  </b-container>
</template>

<script>
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
export default {
  name: 'Auth',
  components: { Signup, Signin }

}
</script>

<style>

</style>
