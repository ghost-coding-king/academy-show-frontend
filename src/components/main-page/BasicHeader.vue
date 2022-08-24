<template>
  <v-app-bar app height="72" style="min-width: 1350px; overflow: visible;" class="my-app-bar"
    :class="{ 'my-app-bar-hide': myAppbarHide }">
    <v-col cols="2"></v-col>
    <v-col cols="2">
      <v-app-bar-title><img id="mainLogo" @click="this.$router.push('/')" :src="require('../../assets/images/logo.png')"
          style="width: 100px; margin-top: 10px" /></v-app-bar-title>
    </v-col>
    <div v-if="searchPage" style="width: 4.7%"></div>
    <div v-if="searchPage" style="margin-top: 20px;">
      <SearchBox :searchType="searchType" :searchPage="searchPage"></SearchBox>
    </div>

    <v-tabs v-else style="margin-top: 20px;" next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
      <v-tab @click="this.$router.push(pageLink)" hide-slider>
        학원
      </v-tab>
      <v-tab @click="this.$router.push(pageLink)" hide-slider>
        과외
      </v-tab>
      <v-tab @click="this.$router.push(pageLink)" hide-slider>
        고객센터
      </v-tab>
      <v-tab @click="this.$router.push(pageLink)" hide-slider>
        ★우경진 암살 의뢰★
      </v-tab>
    </v-tabs>


    <v-spacer></v-spacer>

    <div v-if="accessToken == ''">
      <v-btn elevation="3" style="margin-right: 10px" @click="loginModalClicked">
        로그인
      </v-btn>

      <v-btn elevation="3" style="background-color: #fd9f28; color: white;" @click="this.$router.push('/sign-up')">
        회원가입
      </v-btn>
    </div>
    <div v-else style="height: 100%; display: flex; align-items: center;">
      <div style="align-items: center; margin-top: 6px; margin-right: 10px">
        <span style="font-weight: bold; font-size: 1.1rem;">{{ username }}
          <sub v-if="role == 'ROLE_MEMBER'" style="font-size: 0.7rem; color: #a0a0a0">일반</sub>
          <sub v-else-if="role == 'ROLE_ACADEMY'" style="font-size: 0.7rem; color: #a0a0a0">학원</sub>
          <sub v-else-if="role == 'ROLE_TUTOR'" style="font-size: 0.7rem; color: #a0a0a0">과외</sub>
        </span>
      </div>
      <div class="dropdown" style="height: 100%; align-items: center;">
        <div
          style="justify-content: center; display: flex; align-items: center; margin-top: 19px">
          <v-avatar v-if="profile != undefined && profile != ''" :image="this.profile" style="border: 1px solid grey"></v-avatar>
          <v-avatar v-else color="#fd9f28" style="background-color: #fd9f28;">
            <v-icon color="white" icon="fa-solid fa-user"></v-icon>
          </v-avatar>
        </div>
        <div class="dropdown-content"
          style="background-color: #ffffff; width: 250px; box-shadow: 1px 1px 10px 1px gray; text-align: center; padding: 20px;">
          <div style="text-align: left;">
            <v-icon style="font-size: 3rem; margin-right: 20px; color: #fd9f28" icon="fa-solid fa-square-pen"></v-icon>
            <span style="font-weight: bold; font-size: 1.1rem;">{{ username }}
              <sub v-if="role == 'ROLE_MEMBER'" style="font-size: 0.7rem; color: #a0a0a0">일반</sub>
              <sub v-else-if="role == 'ROLE_ACADEMY'" style="font-size: 0.7rem; color: #a0a0a0">학원 원장님</sub>
              <sub v-else-if="role == 'ROLE_TUTOR'" style="font-size: 0.7rem; color: #a0a0a0">과외 선생님</sub>
            </span>
          </div>
          <v-divider style="margin: 10px 0"></v-divider>
          <div style="background-color: #f8f9fa; text-align: left; padding: 10px;">
            <ul style="list-style: none;">
              <li>
                <v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-user"
                  @click="this.$router.push('/my-page')" block>내 정보</v-btn>
              </li>
              <li>
                <v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-gift"
                  @click="this.$router.push('/my-page/my-favorite')" block>찜 목록</v-btn>
              </li>
              <li>
                <v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-file-pen"
                  @click="this.$router.push('/my-page/my-review')" block>내 리뷰보기</v-btn>
              </li>
              <li v-if="role == 'ROLE_ACADEMY'">
                <v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-gear"
                  @click="this.$router.push('/my-page/my-academy')" block>내 학원관리</v-btn>
              </li>
              <li v-else-if="role == 'ROLE_TUTOR'">
                <v-btn style="display: flex; justify-content: left;" prepend-icon="fa-solid fa-gear"
                  @click="this.$router.push('/my-page/my-tutoring')" block>내 과외관리</v-btn>
              </li>
            </ul>
          </div>
          <div style="text-align: left; margin-top: 10px;">
            <v-btn block @click="logout">로그아웃</v-btn>
          </div>
        </div>
      </div>
    </div>


    <v-col cols="2"></v-col>
  </v-app-bar>
</template>
  
<script>
import { mapState } from 'vuex'
import { STORE_COMMENDS } from '@/store'
import SearchBox from './SearchBox.vue'

export default {
  computed: mapState([
    "accessToken",
    "username",
    "role",
    "profile"
  ]),
  data: () => ({
    myAppbarHide: false,
    pageList: ["/", "editor", "project"],
  }),
  props: {
    title: String,
    searchPage: Boolean,
    searchType: String,
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    logout() {
      this.$store.commit(STORE_COMMENDS.MUTATIONS.ACCESS_TOKEN, "");
      this.$store.commit(STORE_COMMENDS.MUTATIONS.USERNAME, "");
      this.$store.commit(STORE_COMMENDS.MUTATIONS.ROLE, "");
      this.$store.commit(STORE_COMMENDS.MUTATIONS.PROFILE, "");
      this.$router.push("/");
    },
    token() {
      console.log(this.accessToken);
    },
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }
      if (currentScrollPosition > 80) {
        this.myAppbarHide = true;
      }
      if (currentScrollPosition < this.lastScrollPosition) {
        this.myAppbarHide = false;
      }
      this.lastScrollPosition = currentScrollPosition;
    },
    loginModalClicked() {
      this.$emit("loginModalClicked", true);
    }
  },
  name: "BasicHeader",
  components: { SearchBox }
}
</script>

<style scoped>
.my-app-bar {
  transition: all ease 0.2s 0s;
}

.my-app-bar-hide {
  top: -100px !important;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  margin-top: 10px;
  display: none;
  position: absolute;
  z-index: 1;
  /*다른 요소들보다 앞에 배치*/
  right: 0;
}

.dropdown-content:hover .dropdown-content {
  display: block;
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
