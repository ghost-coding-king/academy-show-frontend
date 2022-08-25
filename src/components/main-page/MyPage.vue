<template>
  <v-row no-gutters>
    <v-col cols="2"></v-col>
    <v-layout>
      <v-navigation-drawer floating permanent style="padding-top: 20px" disable-route-watcher>
        <div style="text-align: left; margin-top: 30px">
          <v-icon style="font-size: 3rem; margin-right: 20px; color: #fd9f28" icon="fa-solid fa-square-pen"></v-icon>
          <span style="font-weight: bold; font-size: 1.1rem;">{{ name }}님
            <sub v-if="role == 'ROLE_MEMBER'" style="font-size: 0.7rem; color: #a0a0a0">일반</sub>
            <sub v-else-if="role == 'ROLE_ACADEMY'" style="font-size: 0.7rem; color: #a0a0a0">학원 원장님</sub>
            <sub v-else-if="role == 'ROLE_TUTOR'" style="font-size: 0.7rem; color: #a0a0a0">과외 선생님</sub>
          </span>
        </div>
        <v-divider style="margin: 20px 0"></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="fa-solid fa-user" title="내 정보" value="내 정보" @click="this.$router.push('/my-page')">
          </v-list-item>
          <v-list-item prepend-icon="fa-solid fa-gift" title="찜 목록" value="찜 목록"
            @click="this.$router.push('/my-page/my-favorite')"></v-list-item>
          <v-list-item prepend-icon="fa-solid fa-file-pen" title="내 리뷰보기" value="내 리뷰보기"
            @click="this.$router.push('/my-page/my-review')"></v-list-item>
          <v-list-item v-if="role == 'ROLE_ACADEMY'" prepend-icon="fa-solid fa-gear" title="내 학원관리" value="내 학원관리"
            @click="this.$router.push('/my-page/my-academy')"></v-list-item>
          <v-list-item v-else-if="role == 'ROLE_TUTOR'" prepend-icon="fa-solid fa-gear" title="내 과외관리" value="내 과외관리"
            @click="this.$router.push('/my-page/my-tutoring')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
    <v-col cols="2"></v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'name', 'role'
  ]),
}
</script>

<style>
.v-list-item-title {
  font-weight: bold !important;
}
</style>