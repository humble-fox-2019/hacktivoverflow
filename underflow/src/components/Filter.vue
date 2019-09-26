<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3" md="4" sm="6">
        <v-text-field label="Search" clearable prepend-inner-icon="mdi-filter" outlined></v-text-field>
      </v-col>
      <v-col lg="3" md="4" sm="6">
        <v-select outlined label="Sort" prepend-inner-icon="mdi-sort-variant"></v-select>
      </v-col>
      <v-col lg="3" md="4" sm="6">
        <v-select outlined label="Order" prepend-inner-icon="mdi-sort"></v-select>
      </v-col>
      <v-col lg="3" md="4" sm="6" xs="12">
        <v-btn block height="55" class="indigo" dark>Go</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>