<template>
  <div>
    <v-app>
      <v-main>
        <div style="padding: 60px">
          <v-row justify="center" no-gutters>
            <img :src="require('../assets/images/logo.png')" style="width: 300px; margin-left: 40px;"
              @click="this.$router.push('/')" id="titleLogo" />
          </v-row>

          <v-row style="width:1000px; margin:0 auto" v-if="!stepComplete">
            <v-row justify="center" no-gutters>
              <v-card class="mx-auto" style="max-width: 500px; margin: 50px 0;" elevation="6" width="600">
                <v-timeline direction="horizontal" line-inset="12">
                  <v-timeline-item dot-color="white" size="50" icon="fa-solid fa-pen-to-square">
                    <template v-slot:opposite>
                      <h3>정보 입력</h3>
                    </template>
                  </v-timeline-item>
                  <v-timeline-item dot-color="white" icon="fa-solid fa-chalkboard-user" size="50">
                    <h3>학원 정보</h3>
                  </v-timeline-item>
                </v-timeline>
                <v-form ref="form" v-model="form" class="pa-4 pt-6">
                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>아이디</h3>
                  </v-row>
                  <v-row no-gutters style="position: relative;">
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="id" @input="this.idDuplicate=false; this.idConfirm=false" :rules="[rules.requiredId, ]" variant="outlined" placeholder="ID"></v-text-field>
                    <v-btn style="margin-left: 10px; margin-top: 7px" @click="idCheck">중복확인</v-btn>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row style="position: relative; top:-7px"><v-col cols="2"></v-col><span v-if="idDuplicate" style="margin-left: 25px; font-size: 12px; color: #b20827">이미 사용중이거나 탈퇴한 아이디입니다.</span></v-row>

                  <v-row style="position: relative; top:-15px"><v-col cols="2"></v-col><span v-if="idConfirm" style="margin-left: 25px; font-size: 12px; color: #08a600">전국학원자랑에 걸맞는 아이디네요!</span></v-row>

                  <v-row style="position: relative; top:-29px"><v-col cols="2"></v-col><span v-if="idDuplicateCheck" style="margin-left: 25px; font-size: 12px; color: #b20827">아이디 중복확인 버튼을 눌러주세요.</span></v-row>

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>비밀번호</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="password" :rules="[rules.password]" placeholder="******" type="password"
                      variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>
                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>비밀번호 확인</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="passwordCheck"
                      :rules="[(this.password === this.passwordCheck) || '비밀번호가 다릅니다.']" placeholder="******"
                      type="password" variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>이름</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="name" filled :rules="[rules.requiredName]" placeholder="이름"
                      variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>전화번호</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="phone" filled :rules="[rules.requiredPhone]" placeholder="010-0000-0000"
                      variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>생년월일</h3>
                  </v-row>
                  <v-row no-gutters id="birthRow">
                    <v-col cols="2"></v-col>
                    <input type="date" id="birth" v-model="birth" :rules="[rules.requiredBirth]"
                      :class="{ 'birthCheck': !isBirthVaild }" @input="this.isBirthVaild = this.birth != ''"
                      style="border: 1px solid #ababab; border-radius: 5px; width:378px; height: 56px; padding: 15px" />
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px" v-if="!isBirthVaild">
                    <v-col cols="2"></v-col>
                    <p class="birthTag">생년월일을 입력해주세요.</p>
                  </v-row>



                  <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
                    <v-col cols="2"></v-col>
                    <h3>주소</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="postcode" filled :rules="[rules.requiredAddress]" placeholder="우편번호"
                      variant="outlined" readonly>
                    </v-text-field>
                    <v-btn style="margin-left: 5px; margin-bottom: 5px" @click="execDaumPostcode">우편번호 찾기</v-btn>
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
                    <input type="text" v-model="detailAddress"
                      style="border: 1px solid #ababab; border-radius: 5px; width:200px; height: 56px; padding: 15px; margin-top:2px"
                      placeholder="상세주소" />
                    <v-col cols="6"></v-col>
                  </v-row>



                  <v-row no-gutters style="margin-top:10px">
                    <v-col cols="2"></v-col>
                    <v-checkbox v-model="agreement" :rules="[rules.required]">
                      <template v-slot:label>
                        입력하신 아이디와 비밀번호로 해킹하는데<br>동의합니다.
                      </template>
                    </v-checkbox>
                  </v-row>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn text @click="this.$router.push('/sign-up')">
                    이전
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :loading="isLoading" class="white--text" depressed @click="validate">
                    다음
                  </v-btn>
                </v-card-actions>
                <v-dialog v-model="dialog" absolute max-width="400" persistent>

                </v-dialog>
              </v-card>
            </v-row>
          </v-row>

          <v-row style="width:1000px; margin:0 auto" v-if="stepComplete">
            <v-row justify="center" no-gutters>
              <v-card class="mx-auto" style="max-width: 500px; margin: 50px 0;" elevation="6" width="600">
                <v-timeline direction="horizontal" line-inset="12">
                  <v-timeline-item dot-color="white" size="50" icon="fa-solid fa-pen-to-square" icon-color="#66BB6A">
                    <template v-slot:opposite>
                      <h3 style="color: #66BB6A">정보 입력</h3>
                    </template>
                  </v-timeline-item>
                  <v-timeline-item dot-color="white" icon="fa-solid fa-chalkboard-user" size="50">
                    <h3>학원 정보</h3>
                  </v-timeline-item>
                </v-timeline>
                <v-form ref="formTwo" v-model="form" class="pa-4 pt-6">

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>학원명</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="academyName" :rules="[rules.requiredAcademyName]" variant="outlined"
                      placeholder="학원명을 입력해주세요."></v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
                    <v-col cols="2"></v-col>
                    <h3>연령 선택</h3>
                  </v-row>
                  <v-row no-gutters style="position: relative;">
                    <v-col cols="2"></v-col>
                    <v-select v-model="academyAges" :items="items"
                      chips multiple variant="outlined" :rules="[rules.requiredAges]" style="max-width: 378px;">
                    </v-select>
                    <v-col cols="2"></v-col>
                  </v-row>


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

                  <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
                    <v-col cols="2"></v-col>
                    <h3>셔틀 유무</h3>
                  </v-row>
                  <v-row no-gutters style="position: relative;">
                    <v-col cols="2"></v-col>
                    <v-checkbox v-model="shuttle" label="셔틀이 있으면 체크해주세요."></v-checkbox>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
                    <v-col cols="2"></v-col>
                    <h3>주소</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="academyPostcode" filled :rules="[rules.requiredAddress]" placeholder="우편번호"
                      variant="outlined" readonly>
                    </v-text-field>
                    <v-btn style="margin-left: 5px; margin-bottom: 5px" @click="execPostcode">우편번호 찾기</v-btn>
                    <v-col cols="4"></v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <input type="text" v-model="academyAddress" :rules="[rules.requiredAddress]"
                      style="border: 1px solid #ababab; border-radius: 5px; width:378px; height: 56px; padding: 15px"
                      placeholder="주소" readonly />
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <input type="text" v-model="academyDetailAddress"
                      style="border: 1px solid #ababab; border-radius: 5px; width:200px; height: 56px; padding: 15px; margin-top:2px"
                      placeholder="상세주소" />
                    <v-col cols="6"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
                    <v-col cols="2"></v-col>
                    <h3>학원 소개</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-textarea v-model="academyIntroduce" counter variant="outlined" no-resize
                      :rules="[rules.requiredIntroduce]"></v-textarea>
                    <v-col cols="2"></v-col>
                  </v-row>


                  <v-row no-gutters style="margin-bottom: 3px; margin-top: 20px">
                    <v-col cols="2"></v-col>
                    <h3>사업자등록증 인증</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-file-input v-model="file" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" @change="imageUpload"
                      :rules="[rules.requiredAcademyRegistration]" prepend-icon="mdi-camera" label="사진을 등록하세요."
                      style="max-width: 378px;"></v-file-input>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-top:10px">
                    <v-col cols="2"></v-col>
                    <v-checkbox v-model="academyAgreement" :rules="[rules.required]">
                      <template v-slot:label>
                        입력하신 정보와 학원의 정보가 일치하지<br> 않을 경우 불이익이 생길 수 있습니다.
                      </template>
                    </v-checkbox>
                  </v-row>

                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn text @click="stepComplete = false">
                    이전
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :loading="isLoading" class="white--text" depressed @click="validateTwo">
                    가입 완료
                  </v-btn>
                </v-card-actions>
                <v-dialog v-model="dialog" absolute max-width="400" persistent></v-dialog>
              </v-card>
            </v-row>
          </v-row>
        </div>
      </v-main>
      <BasicFooter></BasicFooter>
    </v-app>
  </div>
</template>

<script>
import BasicFooter from '@/components/main-page/BasicFooter.vue';
import Age from '@/consts/age.js';
import { ApiRequester } from '@/utils';
import Urls from '@/consts/urls.js';

export default {
  components: { BasicFooter },
  mounted() {
    ApiRequester.get('/api/subjects')
      .then(res => {
        this.subjectItems = res.data.data
      })
  },
  data: () => ({
    stepComplete: false,
    isBirthVaild: true,
    birth: "",
    name: undefined,
    postcode: undefined,
    address: undefined,
    detailAddress: undefined,
    agreement: false,
    dialog: false,
    id: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    phone: undefined,
    passwordCheck: undefined,
    academyName: undefined,
    academyPostcode: undefined,
    academyAddress: undefined,
    academyDetailAddress: undefined,
    academyIntroduce: undefined,
    academyAgreement: undefined,
    file: undefined,
    shuttle: undefined,
    userSignUpForm: '',
    academySignUpForm: '',
    fileUrl: '',
    idDuplicate: false,
    idConfirm: false,
    idDuplicateCheck: false,
    rules: {
      requiredId: v => !!v || '아이디를 입력해주세요.',
      Id: v => !!(v || '').match(/^[a-zA-Z0-9]+$/) || '영어와 숫자만 입력 가능합니다.',
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        '대문자/특수문자 1자를 포함한 비밀번호를 입력해주세요.',
      required: v => !!v || '동의하셔야 합니다.',
      requiredName: v => !!v || '이름을 입력해주세요.',
      requiredPhone: v => !!v || '전화번호를 입력해주세요.',
      requiredBirth: v => !!v || '생년월일을 입력해주세요.',
      requiredAddress: v => !!v || '주소를 입력해주세요.',
      requiredIntroduce: v => !!v || '학원소개를 입력해주세요.',
      requiredAges: v => !!v[0] || '연령을 선택해주세요.',
      requiredSubjects: v => !!v[0] || '연령을 선택해주세요.',
      requiredAcademyName: v => !!v || '학원명을 입력해주세요.',
      requiredAcademyRegistration: v => !!v[0] || '사업자 등록증을 등록해주세요.',

    },
    items: Age.map(e => e.value),
    academyAges: [],
    subjectItems: [],
    subjects: [],
  }),
  methods: {
    idCheck () {
      ApiRequester.post(Urls.MAIN_API.AUTH.USERNAME_CHECK, {'username': this.id})
      .then(res => {
        if(res.data.data) {
          this.idDuplicateCheck = false;
          this.idDuplicate = true;
        } else {
          this.idDuplicateCheck = false;
          this.idConfirm = true;
        }
      })
    },
    validate() {
      this.isBirthVaild = this.birth != '';
      if (!this.idDuplicate && !this.idConfirm && this.id != undefined) {
        this.idDuplicateCheck = true
      }
      this.$refs.form.validate().then(
        result => {
          if (result.valid && this.isBirthVaild && this.idConfirm) {
            this.stepComplete = true;
          }
        }
      );
    },
    validateTwo() {
      this.$refs.formTwo.validate().then(
        result => {
          if (result.valid) {
            this.userSignUpForm = {
              username: this.id,
              password: this.password,
              name: this.name,
              phone: this.phone,
              birth: this.birth,
              address: this.address + ' ' + this.detailAddress
            };
            this.academySignUpForm = {
              academyName: this.academyName,
              introduce: this.academyIntroduce,
              academyAddress: this.academyAddress + ' ' + this.academyDetailAddress,
              shuttle: this.shuttle,
              subjects: this.subjects,
              educations: this.academyAges,
              registrationFile: this.fileUrl,
            };
            ApiRequester.post(Urls.MAIN_API.AUTH.ACADEMY, { 'userInfo': this.userSignUpForm, 'academyInfo': this.academySignUpForm })
              .then(() => {
                this.$router.push({name: '/sign-up/complete', params: {username: this.name, role:'academy'}})
              });
          }
        }
      )
    },
    imageUpload() {
      const formData = new FormData();
      formData.append("file", this.file[0]);
      ApiRequester.post('/api/files', formData)
        .then(res => {
          this.fileUrl = res.data.data
          console.log(this.fileUrl);
        })
        .catch(err => {
          console.error("error: ", err)
        }
        )
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
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

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
          this.postcode = data.zonecode;
        },
      }).open();
    },
    execPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.cademyDetailAddress !== "") {
            this.cademyDetailAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.academyAddress = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.academyAddress = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.cademyDetailAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.cademyDetailAddress +=
                this.cademyDetailAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.cademyDetailAddress !== "") {
              this.cademyDetailAddress = `(${this.cademyDetailAddress})`;
            }
          } else {
            this.cademyDetailAddress = "";
          }
          // 우편번호를 입력한다.
          this.academyPostcode = data.zonecode;
        },
      }).open();
    },
  }
}
</script>

<style>
.birthTag {
  margin-left: 16px;
  color: #b20827;
  font-size: 12px;
  margin-top: 5px;
}

.birthCheck {
  border: 1px solid #b20827 !important;
}
</style>