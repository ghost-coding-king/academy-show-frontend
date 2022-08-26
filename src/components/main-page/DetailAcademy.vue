<template>
  <div v-if="this.loading"
    style="margin: 0 auto; width:700px; height: 500px; display: flex; justify-content: center; align-items: center;">
    <v-progress-circular indeterminate color="#fd9f28" size="50"></v-progress-circular>
  </div>
  <div v-else>
    <v-row no-gutters style="margin-top: 60px;" justify="center">
      <v-avatar v-if="academy.profile != '' && academy.profile != undefined" :image="academy.profile" size="200"
        style="border: 1px solid black"></v-avatar>
      <v-avatar v-else color="#fd9f28" size="200" style="border: 1px solid black">
        <v-icon color="white" icon="fa-solid fa-user"></v-icon>
      </v-avatar>
    </v-row>
    <v-row no-gutters style="justify-content: center; margin-top: 20px">
      <h2>{{ academy.name }}</h2>
    </v-row>
    <v-row no-gutters style="justify-content: center;">
      <p style="color: #9f9f9f; font-size: 0.9rem">{{ academy.roadAddress }} {{ academy.subAddress }}</p>
    </v-row>
    <v-row no-gutters style="justify-content: center;">
      <p>⭐4.5</p>
    </v-row>
    <v-row no-gutters style="justify-content: center; margin: 20px 0">
      <v-btn color="#fd9f28" prepend-icon="fa-solid fa-pen-to-square" style="margin-right: 5px; color: white">리뷰쓰기
      </v-btn>
      <v-btn color="#fd9f28" prepend-icon="fa-brands fa-gratipay" style="color: white">찜하기</v-btn>
    </v-row>
    <v-row no-gutters style="width: 600px; margin: 10px auto">
      <h2>학원 소개</h2>
    </v-row>
    <v-row no-gutters style="justify-content: center;">
      <div style="width: 600px; background-color: #f6f6f6; padding: 20px; margin-bottom: 20px; border-radius: 10px;">
        {{ academy.introduce }}
      </div>
    </v-row>
    <v-row no-gutters style="width:600px; margin:0 auto;">
      <v-chip link v-if="academy.shuttle" color="green">#셔틀 있음</v-chip>
    </v-row>

    <v-card flat>
      <v-tabs v-model="tab" centered>
        <v-tab value="one" style="width: 200px">학원 정보</v-tab>
        <v-tab value="two" style="width: 200px">리뷰</v-tab>
        <v-tab value="three" style="width: 200px">소식</v-tab>
      </v-tabs>

      <v-card-text style="width: 650px; margin: 0 auto; padding: 30px">
        <v-window v-model="tab">
          <v-window-item value="one">
            <h2><i class="fa-solid fa-user"></i> 연령</h2>
            <div style="padding: 5px 20px; margin: 15px 0; background-color: #f6f6f6; border-radius: 10px;">
              <h3 v-if="this.educations[0].length > 0" style="margin-top: 10px;">유아</h3>
              <v-chip v-for="(item, i) in this.educations[0]" :key="i" color="orange" style="margin: 5px" link>{{ item
              }}</v-chip>
              <br v-if="this.educations[0].length > 0">
              <h3 v-if="this.educations[1].length > 0" style="margin-top: 10px;">초등학생</h3>
              <v-chip v-for="(item, i) in this.educations[1]" :key="i" color="green" style="margin: 5px" link>{{ item }}
              </v-chip>
              <br v-if="this.educations[1].length > 0">
              <h3 v-if="this.educations[2].length > 0" style="margin-top: 10px;">중학생</h3>
              <v-chip v-for="(item, i) in this.educations[2]" :key="i" color="#ff8e8e" style="margin: 5px" link>{{ item
              }}</v-chip>
              <br v-if="this.educations[2].length > 0">
              <h3 v-if="this.educations[3].length > 0" style="margin-top: 10px;">고등학생</h3>
              <v-chip v-for="(item, i) in this.educations[3]" :key="i" color="blue" style="margin: 5px" link>{{ item }}
              </v-chip>
              <br v-if="this.educations[3].length > 0">
              <h3 v-if="this.educations[4].length > 0" style="margin-top: 10px;">졸업생</h3>
              <v-chip v-for="(item, i) in this.educations[4]" :key="i" style="margin: 5px" link>{{ item }}</v-chip>
            </div>
            <br>
            <h2><i class="fa-solid fa-book"></i> 과목</h2>
            <div style="padding: 5px 20px; margin: 15px 0; background-color: #f6f6f6; border-radius: 10px;">
              <v-chip style="margin: 5px" link v-for="(item, i) in academy.subjects" :key="i">
                {{ item }}
              </v-chip>
            </div>
            <br>
            
            <h2><i class="fa-solid fa-location-dot"></i> 위치</h2><br>
            <div id="map" style="width:100%;height:350px; margin-bottom: 60px"></div>

          </v-window-item>

          <v-window-item value="two">
            <v-card class="mx-auto" width="600" style="padding: 30px; margin: 20px 0" v-for="i in (1, 4)" :key="i">
              <v-row no-gutters style="align-items: center;">
                <v-avatar :image="require('../../assets/images/10001.png')" style="border: 1px solid grey"></v-avatar>
                <span style="margin-left: 10px">철수</span>
                <sub style="margin-left: 10px">22.08.12</sub>
              </v-row>

              <v-row no-gutters>
                수강 당시 연령:초5
              </v-row>

              <v-row no-gutters>
                <v-rating :model-value="1" color="amber" dense half-increments readonly size="14"></v-rating>
                <div class="text-grey ms-4">1</div>
              </v-row>

              <v-row no-gutters style="margin-top: 20px">
                우리 애가 나쁜 물이 들어서 공부를 안하려고 합니다
              </v-row>

            </v-card>
            <div class="text-center">
              <v-pagination v-model="reviewPage" :length="6"></v-pagination>
            </div>

          </v-window-item>

          <v-window-item value="three">
            <v-card class="mx-auto" width="600" style="padding: 30px; margin: 20px" v-for="i in (1, 4)" :key="i">
              <h2>여름방학에 사탄들로 키워보세요1!</h2>
              <p style="display: flex; justify-content: space-between;"><span>2022-08-12</span><span>조회수: 5</span></p>
            </v-card>
            <div class="text-center">
              <v-pagination v-model="newsPage" :length="6"></v-pagination>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
import { ApiRequester } from '@/utils'

export default {
  name: "KakaoMap",
  data: () => ({
    tab: null,
    reviewPage: 1,
    newsPage: 1,
    academy: Object,
    educations: [[], [], [], [], []],
    loading: true,
  }),
  methods: {
    initMap() {
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
      geocoder.addressSearch(this.academy.roadAddress, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });
          marker.setMap(map);

          // 인포윈도우로 장소에 대한 설명을 표시합니다

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);

        }
      });
    },
  },
  created() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0202686bf75bcc93c7133b1e58c7ac49&libraries=services";
      document.head.appendChild(script);
    }
  },
  mounted() {

    ApiRequester.get('/api/academy/' + this.$route.params.id)
      .then(res => {
        this.academy = res.data.data
        let arr = ['유아', '초등학교', '중학교', '고등학교', '성인']
        let edus = res.data.data.educations
        for (let i in edus) {
          for (let j = 0; j < arr.length; j++) {
            if (edus[i].includes(arr[j])) {
              this.educations[j].push(edus[i])
              break;
            }
          }
        }
        this.loading = false;
      })
  }
}
</script>

<style scoped>
</style>