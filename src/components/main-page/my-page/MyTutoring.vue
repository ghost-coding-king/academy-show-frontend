<template>
  <v-row style="margin-top: 50px" no-gutters>
    <v-col cols="1"></v-col>
    <h1>내 과외 관리</h1>
  </v-row>
  <v-row>
    <v-form ref="form" v-model="form" class="pa-4 pt-6" style="width:100%; max-width:800px">
      <!-- 과외 홍보 -->
      <v-row no-gutters style="margin-bottom: 3px">
        <v-col cols="2"></v-col>
        <h3>과외 홍보 문구</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="title" :rules="[rules.requiredTitle]" variant="outlined"
          placeholder="학원명을 입력해주세요."></v-text-field>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 대학교 -->
      <v-row no-gutters style="margin-bottom: 3px">
        <v-col cols="2"></v-col>
        <h3>대학교</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="scholarship" :rules="[rules.requiredScholarship]" variant="outlined"
          placeholder="학원명을 입력해주세요."></v-text-field>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 대학교 등록증 -->
      <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
        <v-col cols="2"></v-col>
        <h3>대학교 증명 서류</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-avatar v-if="this.certificationFileUrl != ''"
          :image="this.certificationFileUrl"
          size="60"
          style="border: 1px solid grey"
        ></v-avatar>

        <v-avatar v-else
          size="60"
          color="#fd9f28"
        >
          <v-icon color="white" icon="fa-solid fa-user"></v-icon>
        </v-avatar>

        <v-file-input v-model="certificationFile" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" @change="imageUpload('registration')"
          :rules="[rules.requiredCertificationFile]" prepend-icon="mdi-camera" label="사진을 등록하세요."
          style="max-width: 378px; margin-left: 20px; margin-top: 7px"></v-file-input>
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

      <!-- 과외 소개 -->
      <v-row no-gutters style="margin-bottom: 3px">
        <v-col cols="2"></v-col>
        <h3>과외 소개</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="introduce" :rules="[rules.requiredIntroduce]" variant="outlined"
          placeholder="과외 소개 문구를 입력해주세요"></v-text-field>
        <v-col cols="2"></v-col>
      </v-row>

      <!-- 과외 연락처 -->
      <v-row no-gutters style="margin-bottom: 3px">
        <v-col cols="2"></v-col>
        <h3>과외 연락처</h3>
      </v-row>
      <v-row no-gutters>
        <v-col cols="2"></v-col>
        <v-text-field v-model="phone" :rules="[rules.requiredPhone]" variant="outlined"
          placeholder="과외 연락처를 입력해주세요"></v-text-field>
        <v-col cols="2"></v-col>
      </v-row>

      <v-row no-gutters style="display: flex; justify-content: right; margin-bottom: 200px;">
        <v-btn style="background-color: #fd9f28; color: white;" @click="editMyTutor">수정하기</v-btn>
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
    title: undefined,
    scholarship: undefined,

    certificationFile: undefined,
    certificationFileUrl: undefined,

    ageItems: Age.map(e => e.value),
    ages: [],
    subjectItems: [],
    subjects: [],

    introduce: undefined,
  
    phone: undefined,

    isLoading: false,
    
    rules: {
      requiredTitle: v => !!v || '과외 제목을 입력해주세요',
      requiredScholarship: v => !!v || '재학/졸업 중인 대학교를 입력해주세요',
      requiredCertificationFile: v => !!v[0] || '대학교 관련 증명서를 업로드 해주세요',

      requiredSubjects: v => !!v[0] || '연령을 선택해주세요.',
      requiredIntroduce: v => !!v || '학원 소개를 입력해주세요.',
      requiredPhone: v => !!v || '학원 연락처를 입력해주세요.'
    },
  }),
  mounted() {
    ApiRequester.get('/api/subjects')
      .then(res => {
        this.subjectItems = res.data.data.map(item => item.name);
      })
    
    ApiRequester.get(CONFIG.MAIN_API_ROOT + "/api/tutor/" + this.$store.state.myTutorId)
      .then(res => {
        this.title = res.data.data.title;
        this.scholarship = res.data.data.scholarship;
        this.certificationFileUrl = res.data.data.certification;

        this.introduce = res.data.data.introduce;

        this.ages = res.data.data.educations;
        this.subjects = res.data.data.subjects;

        this.phone = res.data.data.phone;
      })
  },
  methods: {
    editMyTutor () {
      const tutorId = this.$store.state.myTutorId;
      if(!tutorId) {
        alert("잘못된 접근 입니다!");
        return;
      }

      this.editMyTutorRequest(tutorId)
        .then(() => {
          alert("수정사항이 반영되었습니다!")
        });

    },
    editMyTutorRequest (tutorId) {
      return ApiRequester.put("/api/tutor/"+tutorId, this.editMyTutorRequestObject())
    },
    editMyTutorRequestObject() {
      return {
        title: this.title,
        scholarship: this.scholarship,
        certification: this.certificationFileUrl,

        introduce: this.introduce,

        subjects: this.subjects.map((subject) => {return {name: subject}}),
        educations: this.ages,

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
    imageUpload() {
      const formData = new FormData();

      formData.append("file", this.certificationFile[0]);

      ApiRequester.post('/api/files', formData)
        .then(res => {
          this.certificationFileUrl = res.data.data
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