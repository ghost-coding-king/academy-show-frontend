<template>
  <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows="hover" progress="black" height="315"
    style="min-width: 1000px">
    <v-carousel-item v-for="i in (1, 3)" :key="i">
      <v-img cover :src="require('../../assets/images/banner' + i + '.png')" />
    </v-carousel-item>
  </v-carousel>
  <v-container fluid>
    <v-row no-gutters justify="center" class="pa-8 mt-8">
      <h1>전국학원자랑에서 학원을 뽐내세요</h1>
    </v-row>
    <v-row no-gutters justify="center" class="mb-8">
      <v-btn-toggle
        v-model="text"
        tile
        color="#fd9f28"
        group
        mandatory
        selected-class="v-btn-selected"
      >
        <v-btn value="left">
          카테고리
        </v-btn>

        <v-btn value="center">
          학원명
        </v-btn>

      </v-btn-toggle>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4"></v-col>
      <v-text-field v-if="this.text=='center'" variant="outlined" append-inner-icon="mdi-magnify"></v-text-field>

      <v-row align="center" justify="center" style="border: 1px solid #ababab; margin-bottom: 22px; padding: 3px; border-radius: 5px;" no-gutters v-else>
        <v-btn-toggle
      v-model="toggle"
      divided
      class="mx-auto"
    >
      <v-btn>연령 선택</v-btn>
      <v-btn>과목 선택</v-btn>
      <v-btn>지역 선택</v-btn>
    </v-btn-toggle>

      <v-btn color="#fd9f28" flat style="margin-right: 5px;"><span style="color: white;">검색</span></v-btn>

      </v-row>

      <v-col cols="4"></v-col>
    </v-row>


    <v-row no-gutters style="justify-content: space-between;">
      <v-col cols="4"></v-col>
      <v-chip elevation="3" link size="large">#국어/영어/수학</v-chip>
      <v-chip elevation="3" link size="large">#코딩교육</v-chip>
      <v-chip elevation="3" link size="large">#수학</v-chip>
      <v-chip elevation="3" link size="large">#태권도</v-chip>
      <v-col cols="4"></v-col>
    </v-row>
    <v-row no-gutters style="margin-top: 100px">
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <h1>읽을 거리📚</h1>&nbsp;<h2 style="display: flex; align-items: center;"><i class="fa-solid fa-chevron-right"></i></h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <p style="color: #7b7b7b">오늘의 암살 의뢰★ 읽을 거리를 둘러보세요.</p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card link="true" style="height: 250px; margin-right: 60px !important;" class="mx-auto my-12" max-width="350"
                min-width="300">

                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating :model-value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                    <div class="text-grey ms-4">
                      4.5 (413)
                    </div>
                  </v-row>
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px;">
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>

        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <h1>🔍학원 살펴보기</h1>&nbsp;<h2 style="display: flex; align-items: center;"><i class="fa-solid fa-chevron-right"></i></h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <p style="color: #7b7b7b">요즘 잘나가는 학원을 살펴보세요.</p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card link="true" style="height: 250px; margin-right: 60px !important;" class="mx-auto my-12" max-width="350"
                min-width="300">

                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating :model-value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                    <div class="text-grey ms-4">
                      4.5 (413)
                    </div>
                  </v-row>
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px;">
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>

        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <h1>📝과외 알아보기</h1>&nbsp;<h2 style="display: flex; align-items: center;"><i class="fa-solid fa-chevron-right"></i></h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <p style="color: #7b7b7b">잘생기고 예쁜 과외 선생님을 만나보세요.</p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card link="true" style="height: 250px; margin-right: 60px !important;" class="mx-auto my-12" max-width="350"
                min-width="300">

                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating :model-value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                    <div class="text-grey ms-4">
                      4.5 (413)
                    </div>
                  </v-row>
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px;">
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                </div>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>

        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <h1>⭐최근 리뷰</h1>&nbsp;<h2 style="display: flex; align-items: center;"><i class="fa-solid fa-chevron-right"></i></h2>
    </v-row>
    <v-row no-gutters>
      <div style="flex: 0 0 12.6%; max-width: 12.6%;"></div>
      <p style="color: #7b7b7b">매월 추첨을 통해 정성스럽게 리뷰를 써주신 분들께 30경★을 드립니다.</p>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="n in 15" :key="n">
              <v-card link="true" style="height: 250px; margin-right: 60px !important;" class="mx-auto my-12" max-width="350"
                min-width="300">

                <v-card-item>
                  <v-card-title>학원 이름</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">학원 주소</span>

                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating :model-value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                    <div class="text-grey ms-4">
                      4.5 (413)
                    </div>
                  </v-row>
                </v-card-text>

                <v-divider class="mx-4 mb-5 my-5"></v-divider>

                <div class="px-4 mb-10 txt_line" style="padding: 15px;">
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
                  우리는 사탄들만 모집한다.
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
export default {
  data: () => ({
    text: 'left',
  })
}
</script>

<style scoped>
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
}
</style>