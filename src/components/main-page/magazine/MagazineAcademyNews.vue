<template>
  <div
    id="news"
    class="mx-auto"
    style="
      padding: 20px;
      margin: 20px;
      width: 590px;
      border: 1px solid #c3c3c3;
      border-radius: 10px;
    "
    v-for="(news, i) in this.newsItems"
    :key="i"
    @click="
      this.$router.push(`/academy/${this.$route.params.id}/news/${news.id}`)
    "
  >
    <h2 style="margin-bottom: 10px">{{ news.title }}</h2>
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div>
        <v-avatar
          :image="news.profile"
          style="border: 1px solid grey"
        ></v-avatar>
        <span style="margin-left: 10px">{{ news.nickname }}</span>
      </div>
      <span>{{ this.parseLocalDateTime(news.createdAt) }}</span>
    </div>
  </div>
  <div class="text-center">
    <v-pagination
      v-model="newsPage"
      :length="this.totalNewsPages"
      :total-visible="5"
      active-color="#fd9f28"
      @click="loadNews"
    ></v-pagination>
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
  }),
  mounted() {
    this.loadNews()
  },
  methods: {
    parseLocalDateTime(localDateTime) {
      let date = new Date(localDateTime);
      date.setHours(date.getHours() + 9);
      return date.toISOString().replace("T", " ").substring(0, 16);
    },
    loadNews() {
      ApiRequester.get('/api/posts', {
      params: {
        page: this.newsPage - 1,
        size: 5,
        category: 'ACADEMY_NEWS'
      }
    })
    .then(res => {
      this.newsItems = res.data.data.content;
      this.totalNewsPages = res.data.data.totalPages;
      this.totalNewsElements = res.data.data.totalElements;
      console.log(this.newsItems);
    })
    }
  }
};
</script>

<style>
#news:hover {
  cursor: pointer;
  background-color: #f6f6f6;
}
</style>
