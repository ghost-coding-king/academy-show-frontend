<template> 
  <v-tabs
      v-model="tab"
      centered
      dark
      icons-and-text
      class="my-3"
      hide-slider
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab style="font-size: 20px" @click="this.$router.push('/magazine')">
        메인
      </v-tab>

      <v-tab style="font-size: 20px" @click="this.$router.push('/magazine/academy-news')">
        학원 소식
      </v-tab>

      <v-tab style="font-size: 20px" @click="this.$router.push('/magazine/3')">
        추천 정보
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    
    <router-view></router-view>
</template>

<script>
export default {
  data: () => ({
    tab: ''
  })
}
</script>

<style>

</style>