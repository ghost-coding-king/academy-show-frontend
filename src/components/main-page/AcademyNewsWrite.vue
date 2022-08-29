<template>
  <div style="width: 800px; margin: 20px auto;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <v-btn flat color="#e9ecef" @click="this.$router.go(-1)">이전</v-btn> <h1>내 학원 소식 쓰기</h1>
      <v-btn color="#ffe6b1" style="color: #fd9f28;" flat @click="addPosts">등록</v-btn>
    </div>
    <v-divider style="margin-top: 10px"></v-divider>
  </div>
  <div style="width: 800px; margin: 0 auto;">
    <v-text-field v-model="title" variant="outlined" placeholder="제목을 입력해 주세요."></v-text-field>
  </div>
  <div style="width: 800px; height: 600px; margin: 0 auto">
    <CommonEditor :toolbarOption="'full'" @changeContent="changeContent"></CommonEditor>
  </div>
  <div style="height: 100px"></div>
</template>

<script>
import { ApiRequester, AuthUtil } from '@/utils'
import CommonEditor from '../common/CommonEditor.vue';
import Urls from '@/consts/urls.js';

export default {
  data: () => ({
    postForm: '', 
    content: '',
    title: '',
  }),
  created() {
    if (AuthUtil.getRole() != "ROLE_ACADEMY" || this.$route.params.id != AuthUtil.getMyAcademyId()) {
      alert("권한이 없습니다.");
      this.$router.go(-1);
    }
  },
  methods: {
    changeContent(content) {
      this.content = content
    },
    addPosts() {
      if (this.title != '' && this.content != '') {
        this.postForm = {
          'title': this.title,
          'content': this.content,
          'category': 'ACADEMY_NEWS',
          'academyId': AuthUtil.getMyAcademyId(),
        }
        ApiRequester.post(Urls.MAIN_API.ACADEMY.POSTS, this.postForm)
        .then(() => {
          alert('글 등록에 성공하셨습니다.')
          
        })
      } else {
        alert('제목과 내용을 입력해주세요.')
      }
    },
  },
  components: { CommonEditor }
}
</script>

<style>
</style>