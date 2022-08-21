import CONFIG from "@/config";

const URLS = {
  MAIN_API: {
    AUTH: {
      ROOT: CONFIG.MAIN_API_ROOT + "/auth",
      SIGNIN: CONFIG.MAIN_API_ROOT + "/auth" + "/login",
      SIGNUP: CONFIG.MAIN_API_ROOT + "/auth" + "/sign-up",
      USER: CONFIG.MAIN_API_ROOT + "/auth" + "/sign-up" + "/user",
      USERNAME_CHECK: CONFIG.MAIN_API_ROOT + "/auth" + "/sign-up" + "/username-check",
      ACADEMY: CONFIG.MAIN_API_ROOT + "/auth" + "/sign-up" + "/academy",
      TUTOR: CONFIG.MAIN_API_ROOT + "/auth" + "/sign-up" + "/tutor",
    },
    USER: {
      MY_INFO: CONFIG.MAIN_API_ROOT + "/api" + "/member",
    }
  }
}

export default URLS;
