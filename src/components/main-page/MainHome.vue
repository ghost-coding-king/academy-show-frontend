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
      <p style="color: #7b7b7b">오늘의 ★읽을 거리를 둘러보세요.</p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card
                link
                style="height: 250px; margin-right: 30px !important"
                class="mx-auto my-12"
                max-width="300"
                min-width="250"
              >
                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
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
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px">
                  내용
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
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
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card
                link
                style="height: 250px; margin-right: 30px !important"
                class="mx-auto my-12"
                max-width="300"
                min-width="250"
              >
                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
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
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px">
                  내용
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <h1>📝 과외 알아보기</h1>
      &nbsp;
      <h2 style="display: flex; align-items: center">
        <i class="fa-solid fa-chevron-right"></i>
      </h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
      <p style="color: #7b7b7b">잘 가르치는 과외 선생님을 만나보세요</p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card
                link
                style="height: 250px; margin-right: 30px !important"
                class="mx-auto my-12"
                max-width="300"
                min-width="250"
              >
                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
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
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px">
                  내용
                </div>
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
        매월 추첨을 통해 정성스럽게 리뷰를 써주신 분들께 ★을 드립니다.
      </p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card
                link
                style="height: 250px; margin-right: 30px !important"
                class="mx-auto my-12"
                max-width="300"
                min-width="250"
              >
                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
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
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px">
                  내용
                </div>
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
        subjects: [],
        subjectsItems: [],
    }),
    mounted() {
        ApiRequester.get("/api/subjects").then((res) => {
            this.subjectsItems = res.data.data.map((v) => v.name);
        });
    },
    props: {
      searchPage: Boolean,
    },
    components: { SearchBox }
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
