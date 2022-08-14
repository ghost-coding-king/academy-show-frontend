import CONFIG from "@/config";

const URLS = {
  MAIN_API: {
    AUTH: {
      ROOT: CONFIG.MAIN_API_ROOT + "/auth",
      SIGNIN: CONFIG.MAIN_API_ROOT + "/auth" + "/login",
      SIGNUP: CONFIG.MAIN_API_ROOT + "/auth" + "/sign-up"
    }
  }
}

export default URLS;
