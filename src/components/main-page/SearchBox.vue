<template>
  <v-row no-gutters>
    <v-col cols="4"></v-col>
    <v-row v-if="this.searchType == 'name'" no-gutters>
    <v-text-field v-model="q" variant="outlined" append-inner-icon="mdi-magnify" :class="{ 'box-size': this.searchPage }"></v-text-field>
    </v-row>
    <v-row align="center" justify="center" style="
          border: 1px solid #ababab;
          margin-bottom: 22px;
          padding: 3px;
          border-radius: 5px;
        " no-gutters v-else>
      <v-btn-toggle v-model="toggle" divided class="mx-auto">
        <v-btn value="age" prepend-icon="fa-solid fa-user" :class="{ 'select-complete': this.ages.length != 0 }">연령 선택
        </v-btn>
        <v-btn value="subject" prepend-icon="fa-solid fa-book"
          :class="{ 'select-complete': this.subjects.length != 0 }">과목 선택</v-btn>
        <v-btn value="area" prepend-icon="fa-solid fa-location-dot" :class="{ 'select-complete': this.area != '' }">지역
          선택</v-btn>
      </v-btn-toggle>

      <v-btn flat style="margin-right: 5px; background-color: #fd9f28;" @click="search('category')"><span style="color: white">검색</span></v-btn>
    </v-row>
    <v-col cols="4"></v-col>
  </v-row>

  <v-row no-gutters>
    <v-col v-if="toggle == 'age'" cols="4" class="toggle-select-box" style="height: 550px">
      <div style="display: flex; justify-content: right; padding: 15px">
        <v-btn @click="this.ages = []" class="mr-1" style="background-color: #f2f2f2;" flat>초기화</v-btn>
        <v-btn @click="this.toggle = ''" flat style="color: white; background-color: #fd9f28;">완료</v-btn>
      </div>
      <div style="overflow-y: scroll; height: 475px; padding: 0 20px">
        <v-chip-group v-model="ages" column multiple>
          <div>
            <h3 class="mb-2">유아</h3>
            <v-chip value="유아 5세" filter variant="outlined" selected-class="selected-chip">5세</v-chip>
            <v-chip value="유아 6세" filter variant="outlined" selected-class="selected-chip">6세</v-chip>
            <v-chip value="유아 7세" filter variant="outlined" selected-class="selected-chip">7세</v-chip>
          </div>
          <v-divider style="margin: 15px 0"></v-divider>
          <div>
            <h3 class="mb-2">초등학교</h3>
            <v-chip value="초등학교 1학년" filter variant="outlined" selected-class="selected-chip">1학년</v-chip>
            <v-chip value="초등학교 2학년" filter variant="outlined" selected-class="selected-chip">2학년</v-chip>
            <v-chip value="초등학교 3학년" filter variant="outlined" selected-class="selected-chip">3학년</v-chip>
            <v-chip value="초등학교 4학년" filter variant="outlined" selected-class="selected-chip">4학년</v-chip>
            <v-chip value="초등학교 5학년" filter variant="outlined" selected-class="selected-chip">5학년</v-chip>
            <v-chip value="초등학교 6학년" filter variant="outlined" selected-class="selected-chip">6학년</v-chip>
          </div>
          <v-divider style="margin: 15px 0"></v-divider>
          <div>
            <h3 class="mb-2">중학교</h3>
            <v-chip value="중학교 1학년" filter variant="outlined" selected-class="selected-chip">1학년</v-chip>
            <v-chip value="중학교 2학년" filter variant="outlined" selected-class="selected-chip">2학년</v-chip>
            <v-chip value="중학교 3학년" filter variant="outlined" selected-class="selected-chip">3학년</v-chip>
          </div>
          <v-divider style="margin: 15px 0"></v-divider>
          <div>
            <h3 class="mb-2">고등학교</h3>
            <v-chip value="고등학교 1학년" filter variant="outlined" selected-class="selected-chip">1학년</v-chip>
            <v-chip value="고등학교 2학년" filter variant="outlined" selected-class="selected-chip">2학년</v-chip>
            <v-chip value="고등학교 3학년" filter variant="outlined" selected-class="selected-chip">3학년</v-chip>
          </div>
          <v-divider style="margin: 15px 0"></v-divider>
          <div>
            <h3 class="mb-2">고등학교 졸업</h3>
            <v-chip value="성인" filter variant="outlined" selected-class="selected-chip">성인</v-chip>
          </div>
        </v-chip-group>
      </div>
    </v-col>

    <v-col v-if="toggle == 'subject'" cols="4" class="toggle-select-box" style="height: 300px">
      <div style="display: flex; justify-content: right; padding: 15px">
        <v-btn @click="this.subjects = []" class="mr-1" style="background-color: #f2f2f2;" flat>초기화</v-btn>
        <v-btn @click="this.toggle = ''" flat style="color: white; background-color: #fd9f28;">완료</v-btn>
      </div>
      <div style="overflow-y: scroll; height: 230px; padding: 0 20px">
        <v-chip-group v-model="subjects" column multiple>
          <div>
            <h3 class="mb-2">과목</h3>
            <v-chip v-for="(name, i) in this.subjectsItems" :key="i" :value="name" filter variant="outlined"
              selected-class="selected-chip">{{ name }}</v-chip>
          </div>
        </v-chip-group>
      </div>
    </v-col>
    <v-col v-if="toggle == 'area'" cols="4" class="toggle-select-box" style="height: 620px">
      <div style="display: flex; justify-content: right; padding: 15px">
        <v-btn @click="this.area = ''" class="mr-1" style="background-color: #f2f2f2;" flat>초기화</v-btn>
        <v-btn @click="this.toggle = ''" flat style="color: white; background-color: #fd9f28;">완료</v-btn>
      </div>
      <v-row no-gutters>
        <v-col cols="4" style="padding: 0 10px; height: 530px">
          <v-btn-toggle v-model="selectedArea" mandatory style="display: block; height: 520px; overflow-y: scroll;">
            <v-btn flat block style="height: 40px" :value="name" v-for="(name, i) in Object.keys(this.radioGroupItems)"
              :key="i">{{ name }}</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="8" style="padding: 0 10px; height: 530px">
          <h3 class="ml-2">행정구역</h3>
          <v-divider style="margin: 10px 0"></v-divider>
          <v-radio-group v-model="area">
            <v-radio :label="name" :value="selectedArea + ' ' + name"
              v-for="(name, i) in this.radioGroupItems[this.selectedArea]" :key="i"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <div style="overflow-y: scroll; height: 475px; padding: 0 20px"></div>
    </v-col>
  </v-row>
</template>

<script>
import { ApiRequester } from '@/utils';
export default {
  data: () => ({
    toggle: '',
    q: '',
    ages: [],
    subjects: [],
    subjectsItems: [],
    area: '',
    selectedArea: "서울",
    radioGroupItems: {
      서울: ["강남", "서초", "송파"],
      경기: ["성남", "수원", "용인"],
      강원: ["강릉", "원주", "춘천"],
      경북: ["안동", "경주", "포항"],
      경남: ["창원", "진주", "거제"],
      충북: ["청주", "충주", "제천"],
      충남: ["천안", "아산", "논산"],
      전북: ["전주", "익산", "군산"],
      전남: ["여수", "순천", "목포"],
      제주: ["서귀포", "제주"],
      인천: ["동구", "중구", "서구"],
      대구: ["동구", "중구", "서구"],
      대전: ["동구", "중구", "서구"],
      부산: ["동구", "중구", "서구"],
      울산: ["동구", "중구", "서구"],
      광주: ["동구", "중구", "서구"],
    },
  }),
  mounted() {
    if (this.$route.query.educations != undefined)
      this.ages = new Proxy(this.$route.query.educations.split(','), {})
    if (this.$route.query.subjects != undefined)
      this.subjects = new Proxy(this.$route.query.subjects.split(','), {})
    if (this.$route.query.area != undefined)
      this.area = this.$route.query.area
    ApiRequester.get("/api/subjects").then((res) => {
      this.subjectsItems = res.data.data.map((v) => v.name);
    });
  },
  props: {
    searchType: String,
    searchPage: Boolean,
  },
  methods: {
    search(searchType) {
      this.$router.push({
        name: '/search',
        query: {searchType: searchType, q: this.q, educations: this.ages.join(','), subjects: this.subjects.join(','), area: this.area}
      })
      this.toggle = ''
    },
  }
}
</script>

<style scoped>
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
.selected-chip {
  background-color: #fd9f28;
  color: white;
}

.box-size {
  width: 400px !important;
}
</style>