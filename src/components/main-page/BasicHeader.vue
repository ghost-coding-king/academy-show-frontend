<template>
  <v-app-bar app height="72" style="min-width: 1350px; overflow: visible;" class="my-app-bar"
    :class="{ 'my-app-bar-hide': myAppbarHide }">
    <v-col cols="2"></v-col>
    <v-col cols="2">
      <v-app-bar-title><img id="mainLogo" @click="this.$router.push('/')" :src="require('../../assets/images/logo.png')" style="width: 100px; margin-top: 10px" /></v-app-bar-title>
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

      <v-btn elevation="3" style="background-color: #fd9f28; color: white;" @click="this.$router.push('/sign-up')">
        회원가입
      </v-btn>
    </div>
    <div v-else style="height: 100%; display: flex; align-items: center;">
    <div class="dropdown" style="height: 100%; align-items: center;">
      <div id="profile" style="border: 1px solid #fd9f28; border-radius: 50%; width: 40px; height: 40px; justify-content: center; display: flex; align-items: center; background-color: #fd9f28; margin-top: 19px">
        <v-icon style="color: white; font-size: 1.4rem;" icon="fa-solid fa-user"></v-icon>
      </div>
      <div class="dropdown-content" style="background-color: #ffffff; width: 250px; box-shadow: 1px 1px 10px 1px gray; text-align: center; padding: 20px;">
        <div style="text-align: left;">
          <v-icon style="font-size: 3rem; margin-right: 20px; color: #fd9f28" icon="fa-solid fa-square-pen"></v-icon>
          <span style="font-weight: bold; font-size: 1.1rem;">{{ username }}님
          <sub v-if="role=='ROLE_MEMBER'" style="font-size: 0.7rem; color: #a0a0a0">일반</sub>
          <sub v-else-if="role=='ROLE_ACADEMY'" style="font-size: 0.7rem; color: #a0a0a0">학원 원장님</sub>
          <sub v-else-if="role=='ROLE_TUTOR'" style="font-size: 0.7rem; color: #a0a0a0">과외 선생님</sub>
          </span>
        </div>
        <v-divider style="margin: 10px 0"></v-divider>
        <div style="background-color: #f8f9fa; text-align: left; padding: 10px;">
          <ul style="list-style: none;">
            <li><v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-user" @click="this.$router.push('/my-page')" block>내 정보</v-btn></li>
            <li><v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-gift" @click="this.$router.push('/my-page/my-favorite')" block>찜 목록</v-btn></li>
            <li><v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-file-pen" @click="this.$router.push('/my-page/my-review')" block>내 리뷰보기</v-btn></li>
            <li v-if="role=='ROLE_ACADEMY'"><v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-gear" @click="this.$router.push('/my-page/my-academy')"  block>내 학원관리</v-btn></li>
            <li v-else-if="role=='ROLE_TUTOR'"><v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-gear" @click="this.$router.push('/my-page/my-tutoring')" block>내 과외관리</v-btn></li>
          </ul>
        </div>
        <div style="text-align: left; margin-top: 10px;"><v-btn block @click="logout">로그아웃</v-btn></div>
      </div>
    </div> 
    </div>


    <v-col cols="2"></v-col>
  </v-app-bar>
</template>
  
<script>
import {mapState} from 'vuex'
import {STORE_COMMENDS} from '@/store'

export default {
  computed: mapState([
    'accessToken', 'username', 'role'
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
      this.$store.commit(STORE_COMMENDS.MUTATIONS.ROLE, '')
      this.$router.push('/')
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
.dropdown{
  position : relative;
  display : inline-block;
}

.dropdown-content{
  margin-top: 10px;
  display: none;
  position : absolute;
  z-index : 1; /*다른 요소들보다 앞에 배치*/
  right: 0;
}

.dropdown-content:hover .dropdown-content {
  display : block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

#mainLogo {
  cursor: pointer;
}

#profile:hover {
  cursor: pointer;
  background-color: #ffae28 !important;
  border-color: #ffae28 !important;
}
</style>
