<template>
  <v-row style="margin-top: 50px" no-gutters>
    <v-col cols="1"></v-col>
    <h1>내 정보</h1>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1"></v-col>
    <v-col cols="10">
    <v-table style="width: 100%;">
    <thead>
      <tr>
        <th class="text-left" style="width: 200px">
        </th>
        <th class="text-left">
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>아이디</td>
        <td>
          {{ myInfo.username }}
        </td>
      </tr>
      <tr>
        <td>이름</td>
        <td>
          {{ myInfo.name }}
        </td>
      </tr>
      <tr>
        <td>생일</td>
        <td>
          {{ myInfo.birth }}
        </td>
      </tr>
      <tr>
        <td>주소</td>
        <td>
          <v-row no-gutters style="margin-top: 10px;">
                  <v-text-field v-model="myInfo.postcode" filled placeholder="우편번호" variant="outlined" readonly>
                    </v-text-field>
                  <v-btn style="margin-left: 5px; margin-bottom: 5px" @click="execDaumPostcode">우편번호 찾기</v-btn>
                  <v-col cols="6"></v-col>
          </v-row>
          <v-row no-gutters>
                  <input type="text" v-model="address"
                      style="border: 1px solid #ababab; border-radius: 5px; width:378px; height: 56px; padding: 15px" placeholder="주소"
                      readonly/>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 10px">
                  <input type="text" v-model="myInfo.subAddress"
                      style="border: 1px solid #ababab; border-radius: 5px; width:200px; height: 56px; padding: 15px; margin-top:2px" placeholder="상세주소"/>

                  <v-col cols="6"></v-col>
                  </v-row>
        </td>
      </tr>
      
      <tr>
        <td>전화번호</td>
        <td>
          <v-text-field v-model="myInfo.phone" variant="outlined" style="margin-top: 20px; width: 378px"></v-text-field>
        </td>
      </tr>
    </tbody>
  </v-table>
  </v-col>
  <v-col cols="1"></v-col>
    </v-row>
  <v-row no-gutters style="display: flex; justify-content: right; margin-bottom: 200px;">
    <v-btn style="background-color: #fd9f28; color: white;" @click="sendUpdateMyInfo">수정하기</v-btn>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
import { ApiRequester } from '@/utils';
import Urls from '@/consts/urls';

export default {
  data: () => ({
    myInfo: Object,
    address: undefined,
    myInfoUpdateForm: '',
  }),
  mounted() {
    ApiRequester.get(Urls.MAIN_API.USER.MY_INFO)
    .then(res => {
      this.myInfo = res.data.data
      this.address = this.myInfo.selectRoadAddress ? this.myInfo.roadAddress : this.myInfo.jibunAddress
    })
  },
  methods: {
    sendUpdateMyInfo() {
        ApiRequester.patch(Urls.MAIN_API.USER.UPDATE_MY_INFO, this.myInfo)
        .then(() => {
          alert('수정이 완료되었습니다')
        })
    },  
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
            this.myInfo.selectRoadAddress = true;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
            this.myInfo.selectRoadAddress = false;
          }
          this.myInfo.roadAddress = data.roadAddress;
          this.myInfo.jibunAddress = data.jibunAddress;

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.myInfo.postcode = data.zonecode;
        },
      }).open();
    },
  }
}
</script>

<style>

</style>