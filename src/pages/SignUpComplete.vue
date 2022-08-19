<template>
  <div>
    <v-app>
      <v-main>
        <div style="padding: 60px">
          <v-row justify="center" no-gutters>
            <img :src="require('../assets/images/logo.png')" style="width: 300px; margin-left: 40px;"
              @click="this.$router.push('/')" id="titleLogo" />
          </v-row>
          
          <v-row style="width:1000px; margin:0 auto; text-align: center;">
            <v-row justify="center" no-gutters>
              <v-card class="mx-auto" style="max-width: 500px; margin: 50px 0; padding: 50px;" elevation="2" width="600">
                <div style="font-size: 6rem;">😀</div><br><span style="font-size: 2rem; font-weight: bold;"><span style="color: #53a275">{{ username }}</span>님,<br> 회원가입이 완료되었습니다.</span><br><br>
                전국학원자랑의 서비스를 마음껏 즐겨보세요!<br>
                <v-btn style="margin-top: 50px" @click="this.$router.push('/')">확인</v-btn>
              </v-card>
            </v-row>
          </v-row>
          <AcademyComplete v-if="role=='academy'"></AcademyComplete>
          <TutorComplete v-if="role=='tutor'"></TutorComplete>

          <v-row style="width:1000px; margin:0 auto">
          <v-row justify="center" no-gutters>
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
import AcademyComplete from '@/components/complete/AcademyComplete.vue';
import TutorComplete from '@/components/complete/TutorComplete.vue';
export default {
  components: { BasicFooter, AcademyComplete, TutorComplete },
  data: () => {

  },
  props: {
    username: String,
    role: String
  }
}
</script>

<style>
</style>