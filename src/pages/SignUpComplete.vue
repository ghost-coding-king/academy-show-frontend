<template>
  <div>
    <v-app>
      <v-main>
        <div style="padding: 60px">
          <v-row justify="center" no-gutters>
            <img :src="require('../assets/images/logo.png')" style="width: 300px; margin-left: 40px;"
              @click="this.$router.push('/')" id="titleLogo" />
          </v-row>
          <v-row style="width:1000px; margin:0 auto">
            <v-row justify="center" no-gutters>
              <v-card class="mx-auto" style="max-width: 500px; margin: 50px 0; padding: 50px;" elevation="6" width="600">
                회원가입이 완료되었습니다.<br>
                전국학원자랑의 서비스를 마음껏 즐겨보세요!
              </v-card>
            </v-row>
          </v-row>

          <v-row style="width:1000px; margin:0 auto">
          <v-row justify="center" no-gutters>
            <v-btn @click="this.$router.push('/')">홈으로</v-btn>
          </v-row>
          </v-row>
        </div>
      </v-main>
      <BasicFooter />
    </v-app>
  </div>
</template>

<script>
import BasicFooter from '@/components/main-page/BasicFooter.vue';
export default {
  components: { BasicFooter }
}
</script>

<style>
</style>