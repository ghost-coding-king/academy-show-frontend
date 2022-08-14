<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="signin"
    >
      로그인
    </v-btn>
  </v-form>
</template>

<script>
import { MainApiRequester, AuthUtil } from '@/utils'
import URLS from '@/consts/urls'

export default {
  name: 'SigninPageForm',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
        v => !!v || '이메일을 입력해주세요',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.',
    ],
    password: '',
    passwordRules: [
        v => !!v || '패스워드를 입력해주세요'
    ]
  }),

  methods: {
    async signin () {
      const res = await MainApiRequester.post(URLS.MAIN_API.AUTH.SIGNIN, this.signinRequestData());
      AuthUtil.setAccessToken(res);
    },
    signinRequestData() {
      return {username: this.email, password: this.password}; 
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
};
</script>
