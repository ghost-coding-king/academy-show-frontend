<template>
  <div>
    <v-app>
      <v-main>
        <div style="padding: 60px">
          <v-row justify="center" no-gutters>
            <img :src="require('../assets/images/logo.png')" style="width: 300px; margin-left: 40px;"
              @click="this.$router.push('/')" id="titleLogo" />
          </v-row>
          <v-row style="width:1000px; margin:0 auto">
            <v-row justify="center" no-gutters>
              <v-card class="mx-auto" style="max-width: 500px; margin: 50px 0;" elevation="6" width="600">
                <v-timeline direction="horizontal" line-inset="12" style="margin-top: 30px">
                  <v-timeline-item dot-color="white" size="50" icon="fa-solid fa-pen-to-square">
                    <template v-slot:opposite>
                      <h3>정보 입력</h3>
                    </template>
                  </v-timeline-item>
                </v-timeline>
                <v-form ref="form" v-model="form" class="pa-4 pt-6">
                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>아이디</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field :rules="[rules.requiredId]" variant="outlined" placeholder="ID"></v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>
                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>비밀번호</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="password" :rules="[rules.password, rules.length(6)]" counter="6"
                      placeholder="******" type="password" variant="outlined">
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
                      :rules="[(this.password === this.passwordCheck) || '비밀번호가 다릅니다.']" counter="6"
                      placeholder="******" type="password" variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>이름</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="name" filled placeholder="이름" variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row no-gutters style="margin-bottom: 3px">
                    <v-col cols="2"></v-col>
                    <h3>전화번호</h3>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="2"></v-col>
                    <v-text-field v-model="phone" filled placeholder="010-0000-0000" variant="outlined">
                    </v-text-field>
                    <v-col cols="2"></v-col>
                  </v-row>


                  <v-row no-gutters style="margin-top:10px">
                    <v-col cols="2"></v-col>
                    <v-checkbox v-model="agreement" :rules="[rules.required]" color="deep-purple">
                      <template v-slot:label>
                        입력하신 아이디와 비밀번호로 해킹하는데<br>동의합니다.
                      </template>
                    </v-checkbox>
                  </v-row>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn text @click="$refs.form.reset()">
                    초기화
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!form" :loading="isLoading" class="white--text" depressed>
                    가입 완료
                  </v-btn>
                </v-card-actions>
                <v-dialog v-model="dialog" absolute max-width="400" persistent>

                </v-dialog>
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

export default {
  components: { BasicFooter },
  data: () => ({
    agreement: false,
    dialog: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    phone: undefined,
    passwordCheck: undefined,
    rules: {
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        '대문자/특수문자 1자를 포함한 비밀번호를 입력해주세요. (6자이상)',
      required: v => !!v || '동의하셔야 합니다.',
      requiredId: v => !!v || '아이디를 입력해주세요.'
    },
  }),
  methods: {
  }
}
</script>

<style>
</style>