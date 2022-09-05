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

  <div v-else style="padding-top: 100px; padding-bottom: 60px; background-color: #f4f5f8; height:100%; min-height: 800px;">
    <div style="width: 1280px; margin:0 auto">
    총 {{ this.totalNewsElements }}개
  </div>
    <div style="width: 1300px; margin: 0 auto; display: flex; flex-flow: row wrap;">
    <v-card class="card-up" width="300" height="300" v-for="(news, i) in this.newsItems" style="margin: 10px"
    elevation="3"
    :key="i"
    @click="
      this.$router.push(`/academy/${this.$route.params.id}/news/${news.id}`)
    "
    >
      <v-card-item>
        <v-card-title>{{ news.title }}</v-card-title>

        <v-card-subtitle>
          
          {{ this.parseLocalDateTime(news.createdAt) }}

        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="txt_line hide-image" v-html="news.content" style="height: 170px;">
        
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        
        <v-avatar
                  v-if="news.profile != '' && news.profile != undefined"
                  :image="news.profile"
                  size="25"
                  style="border: 1px solid grey"
                ></v-avatar>
                <v-avatar
                  v-else
                  color="#fd9f28"
                  style="border: 1px solid grey"
                >
                  <v-icon color="white" icon="fa-solid fa-user"></v-icon>
                </v-avatar>
                {{ news.nickname }}
      </v-card-text>
    </v-card>
  </div>
  
  <div class="text-center mt-10">
    <v-pagination
      v-model="newsPage"
      :length="this.totalNewsPages"
      :total-visible="5"
      active-color="#fd9f28"
      @click="loadNews"
    ></v-pagination>
  </div>
</div>
</template>

<script>
import { ApiRequester } from '@/utils';
export default {
  data: () => ({
    newsItems: Array,
    newsPage: 1,
    totalNewsPage: 0,
    totalNewsElements: 0,
    loading: true,
  }),
  mounted() {
    this.loadNews()
  },
  methods: {
    parseLocalDateTime(localDateTime) {
      let date = new Date(localDateTime);
      return date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일';
    },
    loadNews() {
      ApiRequester.get('/api/posts', {
      params: {
        page: this.newsPage - 1,
        size: 10,
        category: 'ACADEMY_NEWS'
      }
    })
    .then(res => {
      this.newsItems = res.data.data.content;
      this.totalNewsPages = res.data.data.totalPages;
      this.totalNewsElements = res.data.data.totalElements;
      this.loading = false;
    })
    }
  }
};
</script>

<style>
.card-up:hover {
  animation-duration: 0.5s !important;
  animation-name: up !important;
  bottom: 8px;
}

@keyframes up {
  from {
    bottom: 0
  }

  to {
    bottom: 8px
  }
}

.txt_line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 5.6rem;
  /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
}

.hide-image img {
  display: none;
}
</style>
