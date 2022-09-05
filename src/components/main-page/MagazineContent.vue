<template> 
  <v-tabs
      v-model="tab"
      centered
      dark
      icons-and-text
      class="mt-3"
      hide-slider
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab @click="this.$router.push('/magazine')">
        메인
      </v-tab>

      <v-tab @click="this.$router.push('/magazine/academy-news')">
        학원 소식
      </v-tab>

      <v-tab @click="this.$router.push('/magazine/3')">
        추천 정보
      </v-tab>
    </v-tabs>

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