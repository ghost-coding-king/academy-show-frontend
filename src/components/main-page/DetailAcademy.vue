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
  <div v-else>
    <v-row no-gutters style="margin-top: 60px" justify="center">
      <v-avatar
        v-if="academy.profile != '' && academy.profile != undefined"
        :image="academy.profile"
        size="200"
        style="border: 1px solid black"
      ></v-avatar>
      <v-avatar
        v-else
        color="#fd9f28"
        size="200"
        style="border: 1px solid black"
      >
        <v-icon color="white" icon="fa-solid fa-user"></v-icon>
      </v-avatar>
    </v-row>
    <v-row no-gutters style="justify-content: center; margin-top: 20px">
      <h2>{{ academy.name }}</h2>
    </v-row>
    <v-row no-gutters style="justify-content: center">
      <p style="color: #9f9f9f; font-size: 0.9rem">
        {{ academy.roadAddress }} {{ academy.subAddress }}
      </p>
    </v-row>
    <v-row no-gutters style="justify-content: center; align-items: center">
      <p style="font-size: 20px; margin-right: 20px">⭐ 
        <span v-if="this.totalReviewElements > 0"> {{ this.averageRating }}</span>
        <span v-else style="color: #9f9f9f"> 리뷰 없음 </span>
      </p>
      <div id="like" @click="clickLikes">
        <span v-if="isLike">
          <v-icon color="red" icon="fa-solid fa-heart"></v-icon>
        </span>
        <span v-else>
          <v-icon color="red" icon="fa-regular fa-heart"></v-icon>
        </span>

        <span style="margin-left: 5px; font-size: 20px"> {{ this.likeCount }}</span>
      </div>
    </v-row>

    <v-row no-gutters style="width: 600px; margin: 10px auto">
      <h2>학원 소개</h2>
    </v-row>
    <v-row no-gutters style="justify-content: center">
      <div
        style="
          width: 600px;
          background-color: #f6f6f6;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
        "
      >
        {{ academy.introduce }}
      </div>
    </v-row>
    <v-row no-gutters style="width: 600px; margin: 0 auto; padding-bottom: 5px">
      <v-chip link v-if="academy.shuttle" color="green">#셔틀 있음</v-chip>
    </v-row>

    <v-card flat>
      <v-tabs v-model="tab" centered>
        <v-tab value="one" style="width: 200px; font-weight: bold">학원 정보</v-tab>
        <v-tab value="two" style="width: 200px">리뷰</v-tab>
        <v-tab value="three" style="width: 200px">소식</v-tab>
      </v-tabs>

      <v-card-text style="width: 650px; margin: 0 auto; padding: 30px">
        <v-window v-model="tab">
          <v-window-item value="one">
            <h2><i class="fa-solid fa-user"></i> 연령</h2>
            <div
              style="
                padding: 5px 20px;
                margin: 15px 0;
                background-color: #f6f6f6;
                border-radius: 10px;
              "
            >
              <h3 v-if="this.educations[0].length > 0" style="margin-top: 10px">
                유아
              </h3>
              <v-chip
                v-for="(item, i) in this.educations[0]"
                :key="i"
                color="orange"
                style="margin: 5px"
                link
                >{{ item }}</v-chip
              >
              <br v-if="this.educations[0].length > 0" />
              <h3 v-if="this.educations[1].length > 0" style="margin-top: 10px">
                초등학생
              </h3>
              <v-chip
                v-for="(item, i) in this.educations[1]"
                :key="i"
                color="green"
                style="margin: 5px"
                link
                >{{ item }}
              </v-chip>
              <br v-if="this.educations[1].length > 0" />
              <h3 v-if="this.educations[2].length > 0" style="margin-top: 10px">
                중학생
              </h3>
              <v-chip
                v-for="(item, i) in this.educations[2]"
                :key="i"
                color="#ff8e8e"
                style="margin: 5px"
                link
                >{{ item }}</v-chip
              >
              <br v-if="this.educations[2].length > 0" />
              <h3 v-if="this.educations[3].length > 0" style="margin-top: 10px">
                고등학생
              </h3>
              <v-chip
                v-for="(item, i) in this.educations[3]"
                :key="i"
                color="blue"
                style="margin: 5px"
                link
                >{{ item }}
              </v-chip>
              <br v-if="this.educations[3].length > 0" />
              <h3 v-if="this.educations[4].length > 0" style="margin-top: 10px">
                졸업생
              </h3>
              <v-chip
                v-for="(item, i) in this.educations[4]"
                :key="i"
                style="margin: 5px"
                link
                >{{ item }}</v-chip
              >
            </div>
            <br />
            <h2><i class="fa-solid fa-book"></i> 과목</h2>
            <div
              style="
                padding: 5px 20px;
                margin: 15px 0;
                background-color: #f6f6f6;
                border-radius: 10px;
              "
            >
              <v-chip
                style="margin: 5px"
                link
                v-for="(item, i) in academy.subjects"
                :key="i"
              >
                {{ item }}
              </v-chip>
            </div>
            <br />

            <h2><i class="fa-solid fa-location-dot"></i> 위치</h2>
            <br />
            <div
              id="map"
              style="width: 100%; height: 350px; margin-bottom: 60px"
            ></div>
          </v-window-item>

          <v-window-item value="two">
            <div style="display: flex; margin-bottom: 15px">
              <div
                class="text-center"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 1px solid #e9ecef;
                  border-radius: 10px;
                  margin-right: 10px;
                  height: 150px;
                  width: 35%;
                  padding: 20px;
                "
              >
                <div>
                  <span style="font-size: 30px; margin-top: 15px">{{ this.averageRating }}</span>
                  <div>
                    <v-rating
                      v-model="averageRating"
                      bg-color="orange-lighten-1"
                      color="#fd9f28"
                      size="50"
                      density="compact"
                      half-increments
                      readonly
                    ></v-rating>
                  </div>
                  <span>{{ totalReviewElements }}개의 리뷰</span>
                </div>
              </div>
              <div
                style="
                  border: 1px solid #e9ecef;
                  border-radius: 10px;
                  height: 150px;
                  width: 65%;
                  padding: 20px;
                "
              >
                <table>
                  <tr
                    v-for="(k, i) in Object.keys(this.ratingDetails)"
                    :key="i"
                  >
                    <td>{{ k }}</td>
                    <td>
                      <v-progress-linear
                        :model-value="
                          (this.ratingDetails[k] / this.totalReviewElements) * 100
                        "
                        color="#fd9f28"
                        style="width: 290px; margin-left: 10px"
                      ></v-progress-linear>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div
              v-if="this.authUtil.isAuthenticated()"
              style="
                background-color: #f6f6f6;
                padding: 20px;
                border-radius: 10px;
              "
            >
              <div class="text-center" style="color: #4c4c4c">별점 주기</div>
              <div class="text-center">
                <v-rating
                  v-model="rating"
                  bg-color="orange-lighten-1"
                  color="#fd9f28"
                  size="x-large"
                  density="compact"
                  hover
                ></v-rating>
              </div>
              <span style="color: #4c4c4c; font-size: 12px;">수강 당시 연령: </span>
              <v-select
                :items="reviewAgeList"
                v-model="reviewAge"
                density="compact"
                variant="outlined"
                style="width: 30%"
              ></v-select>
              <div style="height: 150px">
                <CommonEditor
                  :toolbarOption="'#hide-toolbar'"
                  @changeContent="changeContent"
                ></CommonEditor>
              </div>
              <div style="display: flex; justify-content: right">
                <v-btn
                  @click="saveReview"
                  color="#fd9f28"
                  style="color: white; margin-top: 10px"
                  flat
                  >리뷰작성</v-btn
                >
              </div>
            </div>

            <v-divider style="margin-top: 20px"></v-divider>

            <v-card
              class="mx-auto"
              width="600"
              style="padding: 30px; margin: 20px 0"
              v-for="(review, i) in this.reviewItems"
              :key="i"
            >
              <v-row no-gutters style="align-items: center">
                <v-avatar
                  v-if="review.profile != '' && review.profile != undefined"
                  :image="review.profile"
                  style="border: 1px solid grey"
                ></v-avatar>
                <v-avatar
                  v-else
                  color="#fd9f28"
                  style="border: 1px solid black"
                >
                  <v-icon color="white" icon="fa-solid fa-user"></v-icon>
                </v-avatar>
                <span style="margin-left: 10px">{{ review.name }}</span>
                <sub style="margin-left: 10px">{{
                  this.parseLocalDateTime(review.createdAt)
                }}</sub>
              </v-row>

              <v-row no-gutters style="align-items: center">
                수강 당시 연령:
                <v-chip v-if="review.reviewAge.includes('유아')" link color="orange" class="ml-5">{{ review.reviewAge }}</v-chip>
                <v-chip v-else-if="review.reviewAge.includes('초등학교')" link color="green" class="ml-5">{{ review.reviewAge }}</v-chip>
                <v-chip v-else-if="review.reviewAge.includes('중학교')" link color="#ff8e8e" class="ml-5">{{ review.reviewAge }}</v-chip>
                <v-chip v-else-if="review.reviewAge.includes('고등학교')" link color="blue" class="ml-5">{{ review.reviewAge }}</v-chip>
                <v-chip v-else-if="review.reviewAge.includes('성인')" link class="ml-5">{{ review.reviewAge }}</v-chip>
              </v-row>
              <v-row no-gutters>
                <v-rating
                  :model-value="review.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="text-grey ms-4">{{ review.rating }}</div>
              </v-row>

              <v-row no-gutters style="margin-top: 20px">
                <div v-html="review.comment"></div>
              </v-row>
            </v-card>
            <div class="text-center">
              <v-pagination
                v-model="reviewPage"
                :length="this.totalReviewPages"
                :total-visible="5"
                active-color="#fd9f28"
                @click="loadReview"
              ></v-pagination>
            </div>
          </v-window-item>
          
          <v-window-item value="three">
            <div style="display: flex; justify-content: right">
              <v-btn
                v-if="
                  this.authUtil.getRole() == 'ROLE_ACADEMY' &&
                  this.authUtil.getMyAcademyId() == this.$route.params.id
                "
                color="#fd9f28"
                style="color: white; margin-top: 10px"
                flat
                @click="
                  this.$router.push(
                    '/academy/' + this.$route.params.id + '/news/edit'
                  )
                "
                >글쓰기</v-btn
              >
            </div>
            <div
              id="news"
              class="mx-auto"
              style="padding: 20px; margin: 20px; width: 590px; border: 1px solid #c3c3c3; border-radius: 10px;"
              v-for="(news, i) in this.newsItems"
              :key="i"
              @click="this.$router.push(`/academy/${this.$route.params.id}/news/${news.id}`)"
            >
              <h2 style="margin-bottom: 10px">{{ news.title }}</h2>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                <v-avatar :image="news.profile" style="border: 1px solid grey"></v-avatar>
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
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ApiRequester, AuthUtil } from "@/utils";
import CommonEditor from "../common/CommonEditor.vue";
import { mapState } from "vuex";

export default {
  computed: mapState(["myAcademyId"]),
  name: "KakaoMap",
  data: () => ({
    reviewAge: '연령 선택',
    reviewAgeList: [
      '유아 5세', '유아 6세', '유아 7세', '초등학교 1학년', '초등학교 2학년', '초등학교 3학년',
      '초등학교 4학년', '초등학교 5학년', '초등학교 6학년', '중학교 1학년', '중학교 2학년', '중학교 3학년',
      '고등학교 1학년', '고등학교 2학년', '고등학교 3학년', '성인'
    ],
    tab: 'one',
    reviewPage: 1,
    totalReviewElements: 0,
    totalReviewPages: 0,
    reviewItems: Object,
    newsPage: 1,
    academy: Object,
    newsItems: Object,
    totalNewsElements: 0,
    totalNewsPages: 0,
    educations: [[], [], [], [], []],
    loading: true,
    content: "",
    rating: 0,
    averageRating: 0,
    likeCount: 0,
    ratingDetails: {
      "5점": 0,
      "4점": 0,
      "3점": 0,
      "2점": 0,
      "1점": 0,
    },
    authUtil: AuthUtil,
    isLike: false,
  }),
  methods: {
    clickLikes() {
      if (!AuthUtil.isAuthenticated()) {
        alert('로그인이 필요합니다.')
        return
      }
      ApiRequester.post('/api/up', { 'type': 'ACADEMY', 'referenceId': this.$route.params.id })
      .then(res => {
        if (res.data.code == 200) {
          ApiRequester.get('/api/up', { params: { 'type': 'ACADEMY', 'referenceId': this.$route.params.id }})
          .then(res2 => {
            this.likeCount =  res2.data.data.count
            this.isLike = res2.data.data.status == 'YES'
          })
        }
      })
    },
    parseLocalDateTime(localDateTime) {
      let date = new Date(localDateTime);
      date.setHours(date.getHours() + 9);
      return date.toISOString().replace("T", " ").substring(0, 16);
    },
    loadReviewCount() {
      ApiRequester.get(`/api/academy/${this.$route.params.id}/reviews/statistics`)
    .then((res) => {
      this.ratingDetails["1점"] = res.data.data.count[0]
      this.ratingDetails["2점"] = res.data.data.count[1]
      this.ratingDetails["3점"] = res.data.data.count[2]
      this.ratingDetails["4점"] = res.data.data.count[3]
      this.ratingDetails["5점"] = res.data.data.count[4]
      this.averageRating = Math.round(res.data.data.averageStar * 10) / 10
      // for (let i=0; i<5; i++) {
      //   this.averageRating += res.data.data.count[i] * (i+1);
      // }
      // if (this.totalReviewElements != 0) {
      //   this.averageRating = Math.round(this.averageRating / this.totalReviewElements * 10) / 10
      // }
      
    })
    },
    loadNews() {
      ApiRequester.get(`/api/academy/${this.$route.params.id}/posts`, 
      {params: {
          page: this.newsPage - 1,
          size: 5,
        }})
    .then((res) => {
      this.newsItems = res.data.data.content;
      this.totalNewsPages = res.data.data.totalPages;
      this.totalNewsElements = res.data.data.totalElements;
    })
    },
     loadReview() {
      ApiRequester.get(`/api/academy/${this.academy.id}/reviews`, {
        params: {
          page: this.reviewPage - 1,
          size: 5,
        },
      }).then((res) => {
        this.reviewItems = res.data.data.content;
        this.totalReviewPages = res.data.data.totalPages;
        this.totalReviewElements = res.data.data.totalElements;
      });
    },
    saveReview() {
      if (this.rating == 0) {
        alert("별점을 선택해주세요.");
        return;
      }
      if (this.content == "") {
        alert("리뷰 내용을 입력해주세요.");
        return;
      }
      if (this.reviewAge == '연령 선택') {
        alert('수강 당시 연령을 선택해주세요.')
        return;
      }
      ApiRequester.post(`/api/academy/${this.academy.id}/reviews`, {
        comment: this.content,
        rating: this.rating,
        reviewAge: this.reviewAge
      }).then(() => {
        this.content = "";
        this.rating = 0;
        this.reviewAge = '연령 선택'
        this.loadReview();
        this.loadReviewCount();
        alert("리뷰가 등록되었습니다.");
      });
    },
    initMap() {
      try {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };
        //지도 객체를 등록합니다.
        //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        var map = new kakao.maps.Map(container, options);
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(
          this.academy.roadAddress,
          function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
              });
              marker.setMap(map);
              // 인포윈도우로 장소에 대한 설명을 표시합니다
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
      } catch (error) {
        location.reload();
      }
    },
    changeContent(content) {
      this.content = content;
    },
  },
  created() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      window.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0202686bf75bcc93c7133b1e58c7ac49&libraries=services";
      document.head.appendChild(script);
    }
  },
  mounted() {
    ApiRequester.get("/api/academy/" + this.$route.params.id)
    .then((res) => {
      this.academy = res.data.data;
      this.isLike = res.data.data.upStatistics.status == 'YES'
      this.likeCount = res.data.data.upStatistics.count
      let arr = ["유아", "초등학교", "중학교", "고등학교", "성인"];
      let edus = res.data.data.educations;
      for (let i in edus) {
        for (let j = 0; j < arr.length; j++) {
          if (edus[i].includes(arr[j])) {
            this.educations[j].push(edus[i]);
            break;
          }
        }
      }
      this.loadReview();
      this.loadNews();
      this.loadReviewCount();
      this.loading = false;
    });

  },
  components: { CommonEditor },
};
</script>

<style scoped>
#like:hover {
  cursor: pointer;
  text-decoration: underline;
}
#news:hover {
  cursor: pointer;
  background-color: #f6f6f6;
}
</style>
