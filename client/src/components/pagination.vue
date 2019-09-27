<template>
      <div class="overflow-auto">
        <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>

        <!-- <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
        ></b-table> -->
        <div>
            <ul>
                <li  id="my-table"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                v-for="item in items"
                :key="item._id"
                small>
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// export default {
//     props : ['items'],
//     data() {
//       return {
//         perPage: 5,
//         currentPage: 1
//       }
//     },
//     computed: {
//       rows() {
//         return this.items.length
//       }
//     }
// }
 export default {
    props : ['items'],
    data() {
      return {
        perPage: 3,
        currentPage: 1
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>

<style>

</style>