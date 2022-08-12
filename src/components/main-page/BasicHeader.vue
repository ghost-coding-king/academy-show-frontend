<template>
  <v-app-bar app height="72" color="teal-darken-3" style="min-width: 1000px;" class="my-app-bar"
    :class="{ 'my-app-bar-hide': myAppbarHide }">
    <v-col cols="2"></v-col>
    <v-col cols="1">
      <v-app-bar-title><img :src="require('../../assets/logo.png')" style="width: 55px" /></v-app-bar-title>
    </v-col>
    <v-tabs style="margin-top: 20px" background-color="teal-darken-3" next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab @click="this.$router.push(pageLink)" hide-slider v-for="(pageLink, i) in pageList" :key="i">
        Link: {{ pageLink }}
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-col cols="2"></v-col>
  </v-app-bar>
</template>
  
<script>
export default {
  data: () => ({
    myAppbarHide: false,
    pageList: ['/', 'editor', 'project'],
  }),
  props: {
    title: String
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return
      }
      if (currentScrollPosition > 80) {
        this.myAppbarHide = true;
      }
      if (currentScrollPosition < this.lastScrollPosition) {
        this.myAppbarHide = false;
      }

      this.lastScrollPosition = currentScrollPosition
    }
  },
  name: 'BasicHeader'
}
</script>

<style>
.my-app-bar {
  transition: all ease 0.2s 0s;
}

.my-app-bar-hide {
  top: -100px !important;
}
</style>
