<template>
  <div class="mt-5">
    <div class="iklan border border-dark">
      <h5>Watched Tags</h5>
      <input type="text" class="my-add-tag-99" placeholder="add new tag here" v-model="newTag">
      <img src="https://image.flaticon.com/icons/svg/32/32339.svg" class="plus-icon-wkwk" alt="" @click="addNewTag">
      <div class="list-tag-33 d-flex flex-row justify-content-start">
        <div v-for="(tag,index) in $store.state.WatchedTag" :key="index" class="warnanya-apa">
          <p class="tag-items-44" @click="searchTag(tag)" >
            {{tag}}
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="iklan border border-dark mt-3">
      <h5>Enter Your adverstisement HERE</h5>
    </div> -->
  </div>
</template>

<script>
import { CronJob } from "cron";
import axios from 'axios';
export default {
  props: ["cols"],
  data (){
    return {
      most : '',
      newTag : ''
    }
  },
  methods : {
    addNewTag() {
      if(this.newTag == ''){
        this.$swal.fire('tidak boleh kosong' , 'gagal' , 'warning')
      }
      else if(this.$store.state.WatchedTag.includes(this.newTag)){
        this.$swal.fire('warning' , 'Tidak bisa memasukkan tag yang sama' , 'warning')
      }
      else {
        this.$store.commit('NEWTAG' , this.newTag)
        this.$store.dispatch('addWatchedTag' , this.$store.state.WatchedTag)
        .then(data=>{
          this.newTag = ''
          console.log(data)
          this.$store.dispatch('getWatchedTag')
        })
        .catch(console.log)

      }
    },
    searchTag (name) {
      this.$router.push(`/searchTag?tag=${name}`)
    }
  }
};
</script>

<style scoped>
.iklan {
  width: 100%;
  height: 195px;
  padding-top: 10px;
}
.plus-icon-wkwk {
  height: 10%;
  width: 10%;
  cursor: pointer;          
}
.my-add-tag-99 {
  border: none;
}
.tag-items-44 {
  color: black;
  cursor: pointer;
  font-family: 'Oswald', sans-serif;
  font-weight: 100px;
}
.warnanya-apa {
  border-radius: 0.9rem;
  margin-left: 10px;
  margin-right: 3px;
  margin-top: 10px;
  background-color: antiquewhite;
  width: 50px;
  height: 26px;
}
</style>