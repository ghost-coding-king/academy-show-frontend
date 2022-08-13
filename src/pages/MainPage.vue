<template>
<v-app>
  <BasicHeader :title="'전국학원자랑'" @loginModalClicked="loginModalClicked"></BasicHeader>
    <v-main style="min-width: 1000px">
      <LoginModal v-if="isLoginModalView" @closeModal="this.isLoginModalView=false"></LoginModal>
      <router-view></router-view>
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
  }),
  methods: {
    loginModalClicked() {
      this.isLoginModalView=true
    },
  }

};
</script>
<style>
</style>