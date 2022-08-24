<template>
  <v-row no-gutters justify="center" style="margin-right: 370px; margin-top: 50px">
  <v-btn-toggle
        v-model="type"
        tile
        group
        mandatory
        selected-class="v-btn-selected"
      >
        <v-btn value="academy" style="background-color: #f2f2f2"> 학원 </v-btn>

        <v-btn value="tutor" style="background-color: #f2f2f2"> 과외 </v-btn>
      </v-btn-toggle>
      </v-row>
      <v-row no-gutters justify="center" style="margin-left: 270px;">
        <span style="color:#9f9f9f;">
        <a :class="{ 'selected-filter' : this.$route.query.filter=='review'}" href="#" @click="this.$router.push('/')">리뷰 많은 순</a>|
        <a :class="{ 'selected-filter' : this.$route.query.filter=='star'}" href="#">별점 높은 순</a>|
        <a :class="{ 'selected-filter' : this.$route.query.filter=='like'}" href="#">좋아요 많은 순</a></span>
      </v-row>
    
  <v-card link class="mx-auto mb-3" width="500" height="150"
  v-for="n in 5" :key="n">
  <v-row no-gutters>
    <v-col cols="3" style="display: flex; align-items: center; justify-content: center; margin-bottom: 41px;">
    <v-avatar color="#fd9f28" size="70" style="border: 1px solid black">
      <v-icon color="white" icon="fa-solid fa-user"></v-icon>
    </v-avatar>
    </v-col>
    <v-col cols="9">
    <v-card-item>
      <v-card-title>바른학원</v-card-title>

      <v-card-subtitle>
        <span class="mr-1">서울특별시 강남구</span>

        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :model-value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

        <div class="text-grey ms-4">4.5 (413)</div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-1 mt-2"></v-divider>

    <div class="px-4 mb-10 txt_line" style="padding: 15px; font-size: 0.9rem; color: #9f9f9f">
      리뷰 <span style="color: black;">5</span> 찜 <span style="color: black;">4</span> 소식 <span style="color: black;">4</span> 
    </div>
    </v-col>
    </v-row>
  </v-card>

  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="6"
      active-color="#fd9f28"
    ></v-pagination>
  </div>
  


</template>

<script>
export default {
  data: () => ({
    type: 'academy',
    page: 1,
  }),
  mounted() {
    this.$emit('onSearchPage', this.$route.query.searchType)
  },
  beforeUnmount() {
    this.$emit('outSearchPage')
  }
}
</script>

<style scoped>
 a {
   font-size: 0.8rem;
   color: #9f9f9f;
 }
 a:hover {
   color: #fd9f28;
 }
 .selected-filter {
   color: #fd9f28;
 }
 .v-btn-selected {
  color: white !important;
  background-color: #fd9f28 !important;
}
</style>