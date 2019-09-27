<template>
  <div class="comment">
    <p>{{ com.content }}<span> - {{ com.owner.username }}, </span><span> {{ getTime }} </span></p>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'Comment',
  props: ['com'],
  computed: {
    getTime() {
      return moment(this.com.createdAt).fromNow()
    }
  }
}
</script>

<style scoped>

.comment{
  padding: 5px;
}
.comment p{
  color: #cecece;
  font-size: 10pt;
}

.comment p span:first-child{
  font-weight: bold;
  color: #00ff8a;
}
.comment p span:last-child{
  color: #00ff8a;
  font-style: italic;
}
</style>
