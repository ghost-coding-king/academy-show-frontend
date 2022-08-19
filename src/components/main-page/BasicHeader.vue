<template>
  <v-app-bar app height="72" style="min-width: 1350px;" class="my-app-bar"
    :class="{ 'my-app-bar-hide': myAppbarHide }">
    <v-col cols="2"></v-col>
    <v-col cols="2">
      <v-app-bar-title><img :src="require('../../assets/images/logo.png')" style="width: 150px;" /></v-app-bar-title>
    </v-col>
    
    <v-tabs style="margin-top: 20px;" next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab @click="this.$router.push(pageLink)" hide-slider v-for="(pageLink, i) in pageList" :key="i">
        Link: {{ pageLink }}
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <div v-if="accessToken==''">
      <v-btn elevation="3" style="margin-right: 10px" 
      @click="loginModalClicked">
        로그인
      </v-btn>

      <v-btn elevation="3" style="background-color: #FF7043; color: white;" @click="this.$router.push('/sign-up')">
        회원가입
      </v-btn>
    </div>
    <div v-else>
      {{ username }}사탄님
      <v-btn elevation="3" style="margin-right: 10px">마이페이지</v-btn>
      <v-btn elevation="3" style="background-color: #FF7043; color: white;" @click="logout">로그아웃</v-btn>
    </div>


    <v-col cols="2"></v-col>
  </v-app-bar>
</template>
  
<script>
import {mapState} from 'vuex'
import {STORE_COMMENDS} from '@/store'

export default {
  computed: mapState([
    'accessToken', 'username'
  ]), 
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
    logout() {
      this.$store.commit(STORE_COMMENDS.MUTATIONS.ACCESS_TOKEN, '')
      this.$store.commit(STORE_COMMENDS.MUTATIONS.USERNAME, '')
    },
    token() {
      console.log(this.accessToken);
    },
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
    },
    loginModalClicked() {
      this.$emit('loginModalClicked', true)
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
