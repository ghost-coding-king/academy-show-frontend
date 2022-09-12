<template> 
  <v-tabs
      v-model="tab"
      centered
      dark
      icons-and-text
      class="my-3"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab value="one" style="font-size: 20px" @click="this.$router.push('/magazine')">
        홈
      </v-tab>

      <v-tab value="two" style="font-size: 20px" @click="this.$router.push('/magazine/academy-news')">
        학원 소식
      </v-tab>

      <v-tab value="three" style="font-size: 20px" @click="this.$router.push('/magazine/3')">
        추천 정보
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    
    <router-view></router-view>
</template>

<script>

export default {
  data: () => ({
    tab: 'one'
  }),
  watch: {
    '$route'() {
      this.selectTab()
    }
  },
  mounted() {
    this.selectTab()
  },
  methods: {
    selectTab() {
      if (this.$route.name === 'magazine-main')
        this.tab = 'one'
      if (this.$route.name === 'magazine-academy-news')
        this.tab = 'two'
      else if (this.$route.name === 'magazine-three')
        this.tab = 'three'
    }
  }
}
</script>

<style>

</style>