<template>
    <CommonModal>
        <div style="display: flex; justify-content: center;">
            <img :src="require('../../assets/images/logo.png')" style="width: 200px; margin-bottom: 50px;" />
        </div>
        <div>
            <v-text-field v-model="username" placeholder="아이디" :rules="[rules.usernameRequired]" variant="outlined"
                style="width: 400px; margin: 0 auto;"></v-text-field>
        </div>
        <div>
            <v-text-field v-model="password" variant="outlined" :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.passwordRequired]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                placeholder="비밀번호" counter @click:append-inner="show1 = !show1" style="width: 400px; margin: 0 auto;">
            </v-text-field>
        </div>
        <p v-if="loginFailed" style="margin-left:50px; color: #b00020; font-size: 0.8rem; font-weight: bold;">아이디 혹은 비밀번호를 확인해주세요.</p>
        <div style="display: flex; justify-content: center;">
            <v-btn style="width: 400px; height: 50px; background-color: #fd9f28; color: white; margin-top: 10px;
            " @click="sendLoginRequest">로그인</v-btn>
        </div>
        <br>
        <div style="display: flex; justify-content: center;">
            <a href="">비밀번호 찾기</a>|
            <a href="">아이디 찾기</a>
        </div>
        <br>
        <div class="hr-sect">간편 로그인</div>
        <br>
        <div style="display: flex; justify-content: center;">

            <v-btn @click="oauthRedirect('kakao')" style="width: 400px; height: 50px; background-color: #fddc3f; color: #1f1f18;">
                <img :src="require('../../assets/images/kakao.png')" style="width: 40px;" /> 카카오 로그인
            </v-btn>
        </div>
        <div style="display: flex; justify-content: center;">
            <v-btn @click="oauthRedirect('naver')" style="width: 400px; height: 50px; background-color: #03C75A; color: white; margin-top: 10px;
            "> <img :src="require('../../assets/images/naver.png')" style="width: 40px;" /> 네이버 로그인</v-btn>
        </div>
    </CommonModal>
</template>

<script>
import CommonModal from "../common/CommonModal"

import Urls from "@/consts/urls"
import { ApiRequester, AuthUtil } from "@/utils"
import {STORE_COMMENDS} from '@/store'

export default {
    components: {
        CommonModal,
    },
    data: () => ({
        loginFailed: false,
        token: '',
        username: '',
        password: '',
        show1: false,
        rules: {
            passwordRequired: value => !!value || '비밀번호를 입력해주세요.',
            usernameRequired: value => !!value || '아이디를 입력해주세요.',
        }
    }),
    methods: {
        sendLoginRequest() {
            ApiRequester.post(Urls.MAIN_API.AUTH.SIGNIN, { "username": this.username, "password": this.password })
                .then(res => {
                    if (res.data.code == 200) {
                        this.$store.commit(STORE_COMMENDS.MUTATIONS.NAME, res.data.data.name)
                        this.$store.commit(STORE_COMMENDS.MUTATIONS.ROLE, res.data.data.role)
                        this.$store.commit(STORE_COMMENDS.MUTATIONS.PROFILE, res.data.data.profile)
                        if (res.data.data.role == 'ROLE_ACADEMY') {
                            this.$store.commit(STORE_COMMENDS.MUTATIONS.MYACADEMYID, res.data.data.myAcademyId)
                        }
                        if (res.data.data.role == 'ROLE_TUTOR') {
                            this.$store.commit(STORE_COMMENDS.MUTATIONS.MY_TUTOR_ID, res.data.data.myTutorId)
                        }
                        AuthUtil.setAccessToken(res);
                        this.$emit('afterLogin')
                    } else {
                        this.loginFailed=true
                    }
                    //this.token = res.headers.authorization
                })
        },
        oauthRedirect(provider) {
            let url = `http://localhost:8081/oauth2/authorization/${provider}?redirect_uri=http://localhost:8082/oauth/redirect`
            location.href = url
        }
    }
}
</script>

<style>
a {
    text-decoration: none;
    color: black;
    margin-right: 5px;
    margin-left: 5px;
}

a:hover {
    color: #ff764a;
}

.hr-sect {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 15px;
    margin: 8px 0px;
}

.hr-sect::before,
.hr-sect::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
}
</style>