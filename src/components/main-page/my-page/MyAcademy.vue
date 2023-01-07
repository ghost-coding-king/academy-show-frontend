<template>
  <v-row style="margin-top: 50px" no-gutters>
    <v-col cols="1"></v-col>
    <h1>내 학원관리</h1>
  </v-row>
  <v-row>
    <v-form ref="form" v-model="form" class="pa-4 pt-6" style="width:100%; max-width:800px">
      <!-- 학원명 -->
      <v-row no-gutters style="margin-bottom: 3px">
        <v-col cols="2"></v-col>
        <h3>학원명</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="name" :rules="[rules.requiredName]" variant="outlined"
          placeholder="학원명을 입력해주세요."></v-text-field>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 학원 연락처 -->
      <v-row no-gutters style="margin-bottom: 3px">
        <v-col cols="2"></v-col>
        <h3>학원 연락처</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="phone" :rules="[rules.requiredPhone]" variant="outlined"
          placeholder="학원 연락처를 입력해주세요"></v-text-field>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 연령 선택 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>연령 선택</h3>
      </v-row>
      <v-row no-gutters style="position: relative;">
        <v-col cols="2"></v-col>
        <v-select v-model="ages" :items="ageItems"
          chips multiple variant="outlined" :rules="[rules.requiredAges]" style="max-width: 378px;">
        </v-select>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 과목 선택 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>과목 선택</h3>
      </v-row>
      <v-row no-gutters style="position: relative;">
        <v-col cols="2"></v-col>
        <v-select v-model="subjects" :items="subjectItems" item-title="name" item-value="id" chips multiple
          variant="outlined" return-object :rules="[rules.requiredSubjects]" style="max-width: 378px;">
        </v-select>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 셔틀 유무 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>셔틀 유무</h3>
      </v-row>
      <v-row no-gutters style="position: relative;">
        <v-col cols="2"></v-col>
        <v-checkbox v-model="shuttle" label="셔틀이 있으면 체크해주세요."></v-checkbox>
      </v-row>

      <!-- 학원 주소 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>주소</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="postcode" filled :rules="[rules.requiredAddress]" placeholder="우편번호"
          variant="outlined" readonly>
        </v-text-field>
        <v-btn style="margin-left: 5px; margin-bottom: 5px" @click="execPostcode">우편번호 찾기</v-btn>
        <v-col cols="4"></v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <input type="text" v-model="address" :rules="[rules.requiredAddress]"
          style="border: 1px solid #ababab; border-radius: 5px; width:378px; height: 56px; padding: 15px"
          placeholder="주소" readonly />
        <v-col cols="2"></v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <input type="text" v-model="subAddress"
          style="border: 1px solid #ababab; border-radius: 5px; width:200px; height: 56px; padding: 15px; margin-top:2px"
          placeholder="상세주소" />
        <v-col cols="6"></v-col>
      </v-row>

      <!-- 프로필사진 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>프로필 사진</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-avatar v-if="this.profileFileUrl != ''"
          :image="this.profileFileUrl"
          size="60"
          style="border: 1px solid grey"
        ></v-avatar>

        <v-avatar v-else
          size="60"
          color="#fd9f28"
        >
          <v-icon color="white" icon="fa-solid fa-user"></v-icon>
        </v-avatar>

        <v-col>
        <v-file-input v-model="profileFile" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" @change="imageUpload('profile')"
          prepend-icon="mdi-camera" label="사진을 등록하세요."
          style="max-width: 378px; margin-left: 20px; margin-top: 7px"></v-file-input>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 사업자등록증 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>사업자등록증 인증</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-avatar v-if="this.academyRegistrationFileUrl != ''"
          :image="this.academyRegistrationFileUrl"
          size="60"
          style="border: 1px solid grey"
        ></v-avatar>

        <v-avatar v-else
          size="60"
          color="#fd9f28"
        >
          <v-icon color="white" icon="fa-solid fa-user"></v-icon>
        </v-avatar>

        <v-file-input v-model="academyRegistrationFile" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" @change="imageUpload('registration')"
          :rules="[rules.requiredAcademyRegistration]" prepend-icon="mdi-camera" label="사진을 등록하세요."
          style="max-width: 378px; margin-left: 20px; margin-top: 7px"></v-file-input>
        <v-col cols="2"></v-col>
      </v-row>

      <v-row no-gutters style="display: flex; justify-content: right; margin-bottom: 200px;">
        <v-btn style="background-color: #fd9f28; color: white;" @click="editMyAcademy">수정하기</v-btn>
        <v-col cols="1"></v-col>
      </v-row>
    </v-form>
  </v-row>
</template>

<script>
import Age from '@/consts/age.js';
import CONFIG from "@/config";
import { ApiRequester } from '@/utils';

export default {
  data: () => ({
    phone: undefined,
    introduce: undefined,
    name: undefined,
    postcode: undefined,
    address: undefined,
    shuttle: undefined,

    roadAddress: undefined,
    jibunAddress: undefined,
    isRoadAddress: false,
    subAddress: undefined,
    
    profileFile: undefined,
    profileFileUrl: '',
    academyRegistrationFile: undefined,
    academyRegistrationFileUrl: '',
    
    isLoading: false,
    rules: {
      requiredSubjects: v => !!v[0] || '연령을 선택해주세요.',
      requiredName: v => !!v || '학원명을 입력해주세요.',
      requiredAcademyRegistration: v => !!v[0] || '사업자 등록증을 등록해주세요.',
      requiredPhone: v => !!v || '학원 연락처를 입력해주세요.'
    },

    ageItems: Age.map(e => e.value),
    ages: [],
    subjectItems: [],
    subjects: [],
  }),
  mounted() {
    ApiRequester.get('/api/subjects')
      .then(res => {
        this.subjectItems = res.data.data.map(item => item.name);
      })
    
    ApiRequester.get(CONFIG.MAIN_API_ROOT + "/api/academy/" + this.$store.state.myAcademyId)
      .then(res => {
        this.name = res.data.data.name;
        this.phone = res.data.data.phone;
        this.ages = res.data.data.educations;
        this.subjects = res.data.data.subjects;
        this.shuttle = res.data.data.shuttle;
        this.profileFileUrl = res.data.data.profile;
        this.academyRegistrationFileUrl = res.data.data.businessRegistration;
        this.postcode = res.data.data.postcode
        this.jibunAddress = res.data.data.jibunAddress;
        this.roadAddress = res.data.data.roadAddress;
        this.subAddress = res.data.data.subAddress;

        this.address = (this.roadAddress) ? this.roadAddress:""
        this.address += (this.jibunAddress) ? ` (${this.jibunAddress})`:""
      })
  },
  methods: {
    editMyAcademy () {
      const academyId = this.$store.state.myAcademyId;
      if(!this.$store.state.myAcademyId) {
        alert("잘못된 접근 입니다!");
        return;
      }

      this.editMyAcademyRequest(academyId)
        .then(() => {
          alert("수정사항이 반영되었습니다!")
        });

    },
    editMyAcademyRequest (academyId) {
      return ApiRequester.put("/api/academy/"+academyId, this.editMyAcademyRequestObject())
    },
    editMyAcademyRequestObject() {
      return {
        academyName: this.name,
        introduce: this.introduce,
        academyPostcode: this.postcode,
        academyRoadAddress: this.roadAddress,
        academyJibunAddress: this.jibunAddress,
        academySelectRoadAddress: this.isRoadAddress,
        academySubAddress: this.subAddress,
        shuttle: this.shuttle,
        subjects: this.subjects.map((subject) => {return {name: subject}}),
        educations: this.ages,
        registrationFile: this.academyRegistrationFileUrl,
        profile: this.profileFileUrl,
        phone: this.phone
      };
    },

    execPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.address !== "") {
            this.address = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
            this.isRoadAddress = true;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
            this.isRoadAddress = false;
          }
          this.roadAddress = data.roadAddress;
          this.jibunAddress = data.jibunAddress;

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.address += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.address +=
                this.address !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.address !== "") {
              this.address = `(${this.address})`;
            }
          } 
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
    imageUpload(uploadType) {
      const formData = new FormData();
      if (uploadType == 'profile') {
        formData.append("file", this.profileFile[0]);
      } else {
        formData.append("file", this.academyRegistrationFile[0]);
      }
      ApiRequester.post('/api/files', formData)
        .then(res => {
          if (uploadType == 'profile') {
            this.profileFileUrl = res.data.data
          } else {
            this.academyRegistrationFileUrl = res.data.data
          }
        })
        .catch(err => {
          console.error("error: ", err)
        })
    },
  }
}
</script>

<style>

</style>