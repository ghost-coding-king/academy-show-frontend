<template>
  <v-row no-gutters style="margin-top: 100px">
    <v-img :src="require('../../assets/images/logo.png')" height="100"></v-img>
  </v-row>
  <v-row no-gutters style="justify-content: center; margin-top: 20px">
    <h2>암살 학원</h2>
  </v-row>
  <v-row no-gutters style="justify-content: center;">
    <p>강원도 강릉시 교동</p>
  </v-row>
  <v-row no-gutters style="justify-content: center;">
    <p>⭐4.5</p>
  </v-row>
  <v-row no-gutters style="justify-content: center; margin: 20px 0">
    <v-btn color="#fd9f28" prepend-icon="fa-solid fa-pen-to-square" style="margin-right: 5px; color: white">리뷰쓰기</v-btn>
    <v-btn color="#fd9f28" prepend-icon="fa-brands fa-gratipay" style="color: white">찜하기</v-btn>
  </v-row>
  <v-row no-gutters style="justify-content: center;">
    <div style="width: 600px; background-color: #f6f6f6; padding: 20px; margin-bottom: 20px;">
      이것은 학원인가 사탄집합소인가 자신의 자식이 쓰레기이고 사탄이라고 생각하는자 이 학원으로 보내라
    </div>
  </v-row>

  <v-card flat>
    <v-tabs v-model="tab" centered>
      <v-tab value="one" style="width: 200px">학원 정보</v-tab>
      <v-tab value="two" style="width: 200px">리뷰</v-tab>
      <v-tab value="three" style="width: 200px">소식</v-tab>
    </v-tabs>

    <v-card-text style="width: 650px; margin: 0 auto">
      <v-window v-model="tab">
        <v-window-item value="one">
          <h2>연령</h2><br>
          <v-chip>
            초5
          </v-chip>
          <v-chip>
            초6
          </v-chip>
          <v-chip>
            중1
          </v-chip><br><br>
          <h2>과목</h2><br>
          <v-chip>
            국어
          </v-chip>
          <v-chip>
            영어
          </v-chip>
          <v-chip>
            수학
          </v-chip>
          <br><br>
          <h2>셔틀</h2><br>
          <p>있음</p>
        </v-window-item>

        <v-window-item value="two">
          <v-card class="mx-auto" width="600" style="padding: 30px; margin: 20px 0"
          v-for="i in (1, 4)" :key="i">
            <v-row no-gutters style="align-items: center;">
              <v-avatar :image="require('../../assets/images/10001.png')" style="border: 1px solid grey"></v-avatar>
              <span style="margin-left: 10px">철수</span>
              <sub style="margin-left: 10px">22.08.12</sub>
            </v-row>

            <v-row no-gutters>
              수강 당시 연령:초5
            </v-row>

            <v-row no-gutters>
              <v-rating
                      :model-value="1"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>
                    <div class="text-grey ms-4">1</div>
            </v-row>
            
            <v-row no-gutters style="margin-top: 20px">
              우리 애가 나쁜 물이 들어서 공부를 안하려고 합니다
            </v-row>
      
          </v-card>
          <div class="text-center">
    <v-pagination
      v-model="reviewPage"
      :length="6"
    ></v-pagination>
  </div>
          
        </v-window-item>

        <v-window-item value="three">
          <v-card class="mx-auto" width="600" style="padding: 30px; margin: 20px"
          v-for="i in (1, 4)" :key="i">
            <h2>여름방학에 사탄들로 키워보세요!</h2>
            <p style="display: flex; justify-content: space-between;"><span>2022-08-12</span><span>조회수: 5</span></p>
          </v-card>
          <div class="text-center">
    <v-pagination
      v-model="newsPage"
      :length="6"
    ></v-pagination>
  </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
   

</template>

<script>
export default {
  data: () => ({
    tab: null,
    reviewPage: 1,
    newsPage: 1,
  })
}
</script>

<style scoped>
</style>