<template>
  <v-carousel
    cycle
    hide-delimiter-background
    hide-delimiters
    show-arrows="hover"
    progress="black"
    style="min-width: 1000px; height: auto"
  >
    <v-carousel-item v-for="i in (1, 3)" :key="i">
      <v-img cover :src="require('../../assets/images/banner' + i + '.png')" />
    </v-carousel-item>
  </v-carousel>
  <v-container fluid>
    <v-row no-gutters justify="center" class="pa-8 mt-8">
      <h1>전국학원자랑에서 학원을 뽐내보세요</h1>
    </v-row>
    <v-row no-gutters justify="center" class="mb-8">
      <v-btn-toggle
        v-model="searchType"
        tile
        group
        mandatory
        selected-class="v-btn-selected"
        style="box-shadow: 1px 1px 5px 1px grey"
      >
        <v-btn value="FILTER" style="background-color: #f2f2f2"> 카테고리 </v-btn>
        <v-btn value="NAME" style="background-color: #f2f2f2"> 학원명 </v-btn>
      </v-btn-toggle>
    </v-row>

    
    <SearchBox :searchType="searchType" :searchPage="searchPage"></SearchBox>
    

    <v-row no-gutters style="justify-content: space-between">
      <v-col cols="4"></v-col>
      <v-chip elevation="3" link size="large">#국어/영어/수학</v-chip>
      <v-chip elevation="3" link size="large">#코딩교육</v-chip>
      <v-chip elevation="3" link size="large">#수학</v-chip>
      <v-chip elevation="3" link size="large">#태권도</v-chip>
      <v-col cols="4"></v-col>
    </v-row>
    <v-row no-gutters style="margin-top: 100px">
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <h1>📚 읽을 거리</h1>
      &nbsp;
      <h2 style="display: flex; align-items: center">
        <i class="fa-solid fa-chevron-right"></i>
      </h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <p style="color: #7b7b7b">최근 읽을 거리를 둘러보세요.</p>
    </v-row>
    
    <v-row no-gutters class="mb-12">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 1280px">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="(post, i) in this.posts" :key="i">
              <v-card
                link
                style="height: 165px; margin-right: 30px !important"
                class="mx-auto ma-4"
                max-width="300"
                min-width="250"
                @click="this.$router.push(`/post/${post.id}`)"
              >
              <div
                style="
                  width: 40px;
                  height: 20px;
                  background-color: #fce6de;
                  margin-top: 12px;
                  margin-left: 15px;
                  border-radius: 15%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: red;
                  font-size: 13px;
                "
              >
                <v-icon icon="fa-solid fa-heart" size="15"></v-icon>
                <span style="color: red; margin-left: 3px; margin-top: 1px">{{post.likes.count}}</span>
              </div>
                <v-card-item>
                  <v-card-title>{{post.title}}</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">{{post.nickname}}</span>

                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <!-- <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :model-value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="text-grey ms-4">4.5 (413)</div>
                  </v-row>
                </v-card-text> -->

                <v-divider></v-divider>
                  <v-card-text style="font-size: 15px; font-weight: bold; padding: 8px">
                    <v-avatar
                      v-if="post.profile != '' && post.profile != undefined"
                      :image="post.profile"
                      size="40"
                      style="border: 1px solid grey; margin: 0 3px"
                    ></v-avatar>
                    <v-avatar
                      v-else
                      color="#fd9f28"
                      size="40"
                      style="border: 1px solid grey"
                    >
                      <v-icon color="white" icon="fa-solid fa-user"></v-icon>
                    </v-avatar>
                    {{ post.nickname }}
                  </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <!-- 학원 -->
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <h1>🔍 학원 살펴보기</h1>
      &nbsp;
      <h2 style="display: flex; align-items: center">
        <i class="fa-solid fa-chevron-right"></i>
      </h2>
    </v-row>

    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <p style="color: #7b7b7b">요즘 잘나가는 학원을 살펴보세요.</p>
    </v-row>

    <v-row class="mb-12">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 1200px">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="(item, i) in this.academies" :key="i">
              <v-card class="mx-auto mb-3" width="500" height="210" style="margin-right: 30px !important" @click="this.$router.push(`/academy/${item.id}`)">
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
                      <v-card-title style="font-weight: bold">{{ item.name }}</v-card-title>
                      <v-card-subtitle>
                        <span style="width: 100%; height: 100%">{{ item.introduce }}</span>
                        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                      </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                      <!-- <v-row align="center" class="mx-0">
                        <v-rating :model-value="item.reviewStatistics.averageStar" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="text-grey ms-1">
                          {{ item.reviewStatistics.averageStar }}
                          ({{ item.reviewStatistics.totalReviews }})
                        </div>
                      </v-row> -->
                      <v-row no-gutters>
                        <span class="mr-1" style="color: #c5c5c5">{{ item.roadAddress }} {{ item.subAddress }}</span>
                      </v-row>
                      <v-row no-gutters style="margin-top: 15px">
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
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    
    <!-- 과외 -->
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <h1>🔍 과외 살펴보기</h1>
      &nbsp;
      <h2 style="display: flex; align-items: center">
        <i class="fa-solid fa-chevron-right"></i>
      </h2>
    </v-row>

    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <p style="color: #7b7b7b">요즘 잘나가는 과외 선생님들을 살펴보세요.</p>
    </v-row>

    <v-row class="mb-12">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 1200px">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="(item, i) in this.tutors" :key="i">
              <v-card class="mx-auto mb-3" width="500" height="210" style="margin-right: 30px !important" @click="this.$router.push(`/tutor/${item.id}`)">
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
                      <v-card-title style="font-weight: bold">{{ item.title }}</v-card-title>
                      <v-card-subtitle>
                        <span style="width: 100%; height: 100%">{{ item.introduce }}</span>
                        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                      </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                      <!-- <v-row align="center" class="mx-0">
                        <v-rating :model-value="item.reviewStatistics.averageStar" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="text-grey ms-1">
                          {{ item.reviewStatistics.averageStar }}
                          ({{ item.reviewStatistics.totalReviews }})
                        </div>
                      </v-row> -->
                      <v-row no-gutters>
                        <span class="mr-1" style="color: #c5c5c5">{{ item.area }}</span>
                      </v-row>
                      <v-row no-gutters style="margin-top: 15px">
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
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <h1>⭐ 최근 리뷰</h1>
      &nbsp;
      <h2 style="display: flex; align-items: center">
        <i class="fa-solid fa-chevron-right"></i>
      </h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <p style="color: #7b7b7b">
        최근 리뷰가 달린 학원, 과외를 찾아보세요!
      </p>
    </v-row>
    
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 1200px">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="(item, i) in this.reviews" :key="i">
              <v-card class="mx-auto mb-3" width="500" height="150" style="margin-right: 30px !important" @click="this.reviewRouting(item.type, item.reviewedId)">
                <v-row no-gutters>
                  <v-col cols="3" style="display: flex; align-items: center; margin-top: 10px; flex-flow: column; margin-bottom: 100px;">
                    <v-avatar v-if="item.profile != '' && item.profile != undefined" :image="item.profile" size="100"
                      style="border: 1px solid black"></v-avatar>
                    <v-avatar v-else color="#fd9f28" size="100" style="border: 1px solid black">
                      <v-icon color="white" icon="fa-solid fa-user"></v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col cols="9">
                    <v-card-item>
                      <v-card-title style="font-weight: bold">{{ item.comment }}</v-card-title>
                      <v-card-subtitle>
                        <span style="width: 100%; height: 100%">{{ item.name }}</span>
                        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                      </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                      <v-row align="center" class="mx-0">
                        <v-rating :model-value="item.rating" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="text-grey ms-1">
                          {{ item.rating }}
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ApiRequester } from "@/utils";
import SearchBox from "./SearchBox.vue";

export default {
    data: () => ({
        searchType: "FILTER",
        toggle: "",
        posts: Array,
        academies: Array,
        tutors: Array,
        subjects: [],
        subjectsItems: [],
        reviews: Array
    }),
    mounted() {
        ApiRequester.get("/api/subjects").then((res) => {
            this.subjectsItems = res.data.data.map((v) => v.name);
        });

        ApiRequester.get("/api/posts?sort=createdAt,desc")
          .then((res) => {
            this.posts = res.data.data.content;
          });
        
        ApiRequester.get('/api/academies?searchType=NAME&q&sort=batchLikes.count,desc')
          .then(res => {
            this.academies = res.data.data.content
          })
        
        ApiRequester.get('/api/tutors?searchType=NAME&q&sort=batchLikes.count,desc')
          .then(res => {
            this.tutors = res.data.data.content
          })
        
        ApiRequester.get('/api/reviews')
          .then(res => {
            this.reviews = res.data.data.content
          })
    },
    props: {
      searchPage: Boolean,
    },
    components: { SearchBox },
    methods: {
      reviewRouting(type, id) {
        if (type === "ACADEMY")
          this.$router.push(`/academy/${id}`);
        else
          this.$router.push(`/tutor/${id}`);
      }
    }
};
</script>

<style scoped>
.selected-chip {
  background-color: #fd9f28;
  color: white;
}
.txt_line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 5.6rem;
  /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
}

.v-btn-selected {
  color: white !important;
  background-color: #fd9f28 !important;
}

.toggle-select-box {
  background-color: white;
  left: 33.2%;
  position: absolute;
  z-index: 10;
  border: 1px solid #ababab;
  border-radius: 10px;
  /* overflow-y: scroll;  */
  box-shadow: 2px 2px 12px 1px grey;
}

.select-complete {
  color: #66BB6A !important;
}
</style>
