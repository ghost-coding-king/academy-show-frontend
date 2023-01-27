<template>
  <v-row no-gutters justify="center" style="margin: 50px 370px 10px 0;">
    <v-btn-toggle v-model="type" tile group mandatory selected-class="v-btn-selected" @update:modelValue="search">
      <v-btn value="academy" style="background-color: #f2f2f2"> 학원 </v-btn>
      <v-btn value="tutor" style="background-color: #f2f2f2"> 과외 </v-btn>
    </v-btn-toggle>
  </v-row>
  <v-row no-gutters justify="space-between" style="width: 500px; margin: 0 auto;">
    <!-- 정렬기능 나중에 구현 
    <span style="color: #9f9f9f; font-size: 0.8rem; display: flex; align-items: center; margin-left: 1px">검색결과:
      {{ this.totalElements }}개</span>
    <span style="color:#9f9f9f;">
      <a :class="{ 'selected-filter': this.$route.query.filter == 'review' }" href="#" @click="this.$router.push('/')">리뷰
        많은 순</a>|
      <a :class="{ 'selected-filter': this.$route.query.filter == 'star' }" href="#">별점 높은 순</a>|
      <a :class="{ 'selected-filter': this.$route.query.filter == 'like' }" href="#">좋아요 많은 순</a>
    </span> -->
  </v-row>

  <v-card @click="detailPage(item.id)" link class="mx-auto mb-3" width="500" height="210" v-for="(item, i) in searchResultList" :key="i">
    <v-row no-gutters>
      <v-col cols="3" style="display: flex; align-items: center; margin-top: 10px; flex-flow: column; margin-bottom: 100px;">
        <v-avatar v-if="item.profile != '' && item.profile != undefined" :image="item.profile" size="100"
          style="border: 1px solid black"></v-avatar>
        <v-avatar v-else color="#fd9f28" size="100" style="border: 1px solid black">
          <v-icon color="white" icon="fa-solid fa-user"></v-icon>
        </v-avatar>
        <span v-if="this.type === 'tutor'" style="margin-top: 3px; color: #9f9f9f"> {{ item.name }} 선생님</span>
      </v-col>
      <v-col cols="9">
        <v-card-item>
          <v-card-title v-if="this.type === 'academy'" style="font-weight: bold">{{ item.name }}</v-card-title>
          <v-card-title v-else style="font-weight: bold">{{ item.title }}</v-card-title>
          <v-card-subtitle>
            <span style="width: 100%; height: 100%">{{ item.introduce }}</span>
            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating :model-value="item.reviewStatistics.averageStar" color="amber" dense half-increments readonly size="14"></v-rating>
            <div class="text-grey ms-1">
              {{ item.reviewStatistics.averageStar }}
              ({{ item.reviewStatistics.totalReviews }})
            </div>
          </v-row>
          <v-row no-gutters style="margin-top: 15px">
            <span v-if="this.type === 'academy'" class="mr-1" style="color: #c5c5c5">{{ item.roadAddress }} {{ item.subAddress }}</span>
            <span v-else class="mr-1" style="color: #c5c5c5">{{ item.area }}</span>
          </v-row>
          <v-row no-gutters style="margin-top: 5px">
            <span class="mr-1" style="color: #c5c5c5"><i class="fas fa-phone"></i> {{ item.phone }}</span>
          </v-row>
        </v-card-text>

        <v-divider class="mx-1"></v-divider>

        <div class="px-4 mb-10" style="padding: 10px; font-size: 0.9rem; color: #9f9f9f; display: flex; justify-items: center; font-size: 13px">
          <div v-if="item.upStatistics.status == 'YES'"
          style="width: 40px; height: 20px; background-color: #fce6de; border-radius: 15%;
          display: flex; align-items: center; justify-content: center; color: red; font-size: 13px;"
          >
            <v-icon icon="fa-solid fa-heart" size="15"></v-icon>
            <span style="color: red; margin-left: 3px; margin-bottom: 1px;">{{ item.upStatistics.count }}</span>
          </div>
          <div v-else
          style="width: 40px; height: 20px; background-color: #fce6de; border-radius: 15%;
          display: flex; align-items: center; justify-content: center; color: red; font-size: 13px;"
          >
            <v-icon icon="fa-regular fa-heart" size="15"></v-icon>
            <span style="color: red; margin-left: 3px; margin-bottom: 1px;">{{ item.upStatistics.count }}</span>
          </div>
          <div style="margin-left: 5px">
          리뷰 <span style="color: black;">{{ item.reviewStatistics.totalReviews }}</span> 소식 <span
            style="color: black;">0</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>

  <div class="text-center">
    <v-pagination v-model="page" :length="this.totalPages" :total-visible="5" active-color="#fd9f28" @click="search">
    </v-pagination>
  </div>
</template>

<script>
import { ApiRequester } from '@/utils';

export default {
  data: () => ({
    type: 'academy',
    page: 1,
    searchResultList: [],
    totalPages: 0,
    size: 10,
    totalElements: 0,
  }),
  watch: {
    '$route'() {
      this.academySearch()
    }
  },
  created() {
    this.$emit('onSearchPage', this.$route.query.searchType)
    this.academySearch()
  },
  beforeUnmount() {
    this.$emit('outSearchPage')
  },
  methods: {
    academySearch() {
      ApiRequester.get('/api/academies', {
        params: {
          searchType: this.$route.query.searchType,
          q: this.$route.query.q,
          educations: this.$route.query.educations,
          subjects: this.$route.query.subjects,
          area: this.$route.query.area,
          page: this.page - 1,
          size: this.size
        }
      })
        .then(res => {
          this.type = 'academy'
          this.searchResultList = res.data.data.content
          this.totalPages = res.data.data.totalPages
          this.totalElements = res.data.data.totalElements   
        })
    },
    tutorSearch() {
      ApiRequester.get('/api/tutors', {
        params: {
          searchType: this.$route.query.searchType,
          q: this.$route.query.q,
          educations: this.$route.query.educations,
          subjects: this.$route.query.subjects,
          area: this.$route.query.area,
          page: this.page - 1,
          size: this.size
        }
      })
        .then(res => {
          console.log(res.data);
          this.type = 'tutor'
          this.searchResultList = res.data.data.content
          this.totalPages = res.data.data.totalPages
          this.totalElements = res.data.data.totalElements  
        })
    },
    search() {
      this.page = 1;
      
      if(this.type === "academy")
        this.academySearch();
      else
        this.tutorSearch();
    },
    detailPage(id) {
      if (this.type === 'academy')
        window.open('/academy/' + id);
      else
        window.open('/tutor/' + id);
    }
  }
}
</script>

<style scoped>
a {
  font-size: 0.8rem;
  color: #9f9f9f;
}

a:hover {
  color: #fd9f28;
}

.selected-filter {
  color: #fd9f28;
}

.v-btn-selected {
  color: white !important;
  background-color: #fd9f28 !important;
}
</style>