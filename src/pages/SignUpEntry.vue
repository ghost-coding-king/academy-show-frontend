<template>
  <v-app>
    <v-main style="min-width: 1200px">
      <v-row justify="center" no-gutters style="margin-top: 50px">
        <img :src="require('../assets/images/logo.png')" style="width: 300px; margin-left: 40px;"
          @click="this.$router.push('/')" id="titleLogo" />
      </v-row>
      <v-row justify="center" no-gutters style="margin-top: 100px">
        <v-col cols="1"></v-col>
        <v-row justify="center" v-for="(info, i) in cardInfo" :key="i">
          <v-col cols="1"></v-col>
          <v-btn width="300" height="300" elevation="5" @click="this.$router.push(info.url)">
            <div>
              <i :class="info.icon" style="width: 300px; height: 100px; padding: 30px 0"></i>
              <v-divider></v-divider>
              <br>
              <h1>{{ info.title }}</h1>
              <br>
              {{ info.description }}
            </div>
          </v-btn>
        </v-row>
        <v-col cols="1"></v-col>
      </v-row>
      <v-spacer style="height: 100px"></v-spacer>
    </v-main>
    <BasicFooter></BasicFooter>
  </v-app>
</template>

<script>
import BasicFooter from '@/components/main-page/BasicFooter.vue';
export default {
  components: { BasicFooter },
  data: () => ({
    cardInfo: [
      {
        icon: 'fa-solid fa-user',
        title: '일반 회원',
        description: '일반 회원입니다.',
        url: '/sign-up/user',
      },
      {
        icon: 'fa-solid fa-chalkboard-user',
        title: '학원',
        description: '학원 원장님 가입입니다.',
        url: '/sign-up/academy',
      },
      {
        icon: 'fa-solid fa-book',
        title: '과외',
        description: '과외 등록을 위한 회원입니다.',
        url: '/sign-up/tutor',
      }
    ]
  }),
}
</script>

<style>
  #titleLogo:hover {
    cursor: pointer;
  }
</style>