<template>
  <v-footer class="text-white" style="min-width: 1350px; background-color: #303740;">
    <v-row no-gutters>
      <v-col cols="2"></v-col>
      <div>
        <div class="my-3" style="background-color: #eff0f3; width: 100px; height: 70px; border-radius: 10%; display: flex; align-items: center;"><img id="mainLogo" @click="this.$router.push('/')" :src="require('../../assets/images/logo.png')"
            style="width: 100px; margin: 20px 0;" /></div>
        <div style="font-size: 0.8rem; margin-bottom: 20px;">
        <p>(주)전국학원자랑 | 팀원: 김동원, 김찬진, 우경진, 이현수 | 전화번호: 02-123-4567</p>
          <p>통신판매업: 2022-전국학원-6439 | 이메일: academyshow@academyshow.com</p>
          <p>주소: 서울특별시 강남구 역삼동 전국학원자랑 타워</p><br>
          <p>©ACADEMY-SHOW. ALL RIGHTS RESERVED</p>
        </div>
      </div>
      <v-row style="align-items: center;" no-gutters>
        <v-col cols="5"></v-col>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 text-white" :icon="icon" variant="text"></v-btn>
      </v-row>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style scoped>
  @font-face {
 font-family: 'NanumBarunGothic';
 font-style: normal;
 font-weight: 700;
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
 src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype');
}
  p {
    margin-top: 2px;
    font-family: 'NanumBarunGothic';
  }
</style>