<template>
  <div
    v-if="this.loading"
    style="
      margin: 0 auto;
      width: 700px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <v-progress-circular
      indeterminate
      color="#fd9f28"
      size="50"
    ></v-progress-circular>
  </div>
  <div v-else
   style="width: 800px; margin: 50px auto; min-height: 700px">
    <h1>{{ this.postInfo.title }}</h1>
    <div style="display: flex; justify-content: space-between; margin-top: 20px; margin-bottom: 10px; align-items: flex-end;">
      <span>
        <v-avatar :image="this.postInfo.profile" style="border: 1px solid grey"></v-avatar>
        <span id="nickname" style="margin-left: 5px;" @click="this.$router.push(`/academy/${this.$route.params.id}`)">{{ this.postInfo.nickname }}</span>
      </span>
      <span style="font-size: 15px; color: #bfc3ca">{{ this.postInfo.createdAt }}</span>
    </div>
    <v-divider></v-divider>

    <div style="width: 800px; margin: 20px auto; display: flex; justify-content: space-between;">
      <v-btn 
      @click="this.$router.go(-1)"
      flat color="#e9ecef">이전</v-btn>
      <div>
        <v-btn flat color="#ffe6b1" style="color: #fd9f28;">수정</v-btn>
        <v-btn flat color="#e9ecef" style="color: #ff3b3b; margin-left: 2px">삭제</v-btn>
      </div>
    </div>

    <div style="width: 800px; margin: 50px auto;" v-html="this.postInfo.content">

    </div>
  </div>
</template>

<script>
import { ApiRequester } from '@/utils'
export default {
  data: () => ({
    postInfo: Object,
    loading: true,
  }),
  mounted() {
    window.scrollTo(0, 0);
    ApiRequester.get(`/api/posts/${this.$route.params.newsId}`)
      .then(res => {
        this.postInfo = res.data.data
        this.postInfo.createdAt = this.parseLocalDateTime(this.postInfo.createdAt)
        this.loading = false;
      })
  },
  methods: {
    parseLocalDateTime(localDateTime) {
      let date = new Date(localDateTime);
      return date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일';
    },
  },
}
</script>

<style scoped>

  #nickname:hover {
    cursor: pointer;
    color: #fd9f28;
  }
</style>