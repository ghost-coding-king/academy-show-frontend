<template>
<v-app>
  <BasicHeader :searchType="searchType" :searchPage="searchPage" :title="'전국학원자랑'" @loginModalClicked="loginModalClicked"></BasicHeader>
    <v-main style="min-width: 1350px">
      <LoginModal v-if="isLoginModalView" @afterLogin="this.isLoginModalView=false" @closeModal="this.isLoginModalView=false"></LoginModal>
      <router-view :searchType="searchType" :searchPage="searchPage" @outSearchPage="outSearchPage" @onSearchPage="onSearchPage"></router-view>
    </v-main>
  <BasicFooter></BasicFooter>
</v-app>
</template>

<script>
import BasicHeader from '@/components/main-page/BasicHeader.vue'
import BasicFooter from '@/components/main-page/BasicFooter.vue'
import LoginModal from '@/components/main-page/LoginModal.vue';

export default {
  name: 'MainPage',
  components: {
    BasicHeader,
    BasicFooter,
    LoginModal
},
  data: () => ({
    isLoginModalView: false,
    searchPage: false,
    searchType: '',
  }),
  methods: {
    loginModalClicked() {
      this.isLoginModalView=true
    },
    onSearchPage(searchType) {
      this.searchPage = true
      this.searchType = searchType
    },
    outSearchPage() {
      this.searchPage = false
      this.searchType = ''
    },
  }

};
</script>
<style>
</style>