/**
 * This file contains utilities functions
 */

import axios from "axios";
import store, {STORE_COMMENDS} from "@/store"

import CONFIG from "./config";
import Urls from "./consts/urls";
import STATUS_CODES from "./consts/statusCodes";

/**
 * External API Requesters
 */
const BaseApiRequester = (() => {
  const AxiosInstance = axios.create({
    timeout: CONFIG.API_TIMEOUT,
  });

  return {
    'get': (url, config) => AxiosInstance.get(url, config),
    'post': (url, data, config) => AxiosInstance.post(url, data, config),
    'delete': (url, config) => AxiosInstance.delete(url, config),
    'patch': (url, data, config) => AxiosInstance.patch(url, data, config),
    'request': (config) => AxiosInstance.request(config)
  }
})();

const ApiRequester = (() => {
  const makeDefaultConfig = () => {
    return AuthUtil.setAccessTokenToConfig({withCredentials: true});
  }

  const reRequestAtherTokenRefresh = (res) => {
    return AuthUtil.refreshAccessToken()
      .then((refreshResult) => {
        if(!refreshResult)
          throw res;
        return BaseApiRequester.request(AuthUtil.setAccessTokenToConfig(res.config))
      });
  }

  /**
   * response checker
   * 401 인 경우 token refresh 후 재요청
   */
  const responseChecker = (responsePromise) => {
    return responsePromise

      /** 
       * 응답이 정상인 경우
       */
      .then(res => {
        /** 인증오류가 아니면 바로 반환 */
        if(res.data.code !== STATUS_CODES.NOT_AUTHENTICATED)
          return res;

        /** 
         * token refresh 시도후 다시 재요청한 Promise를 반환한다. 
         * 만약 실패시 처음 실패했던 response를 반환해준다.
         */
        return reRequestAtherTokenRefresh(res).catch(() => res);

      /** 
       * 응답이 비정상인 경우 
       */
      }).catch(err => {
        /** http 상태코드가 401이 아니면 에러를 다시 던진다. */
        if(err.response.status !== 401)
          throw err;

        /** token을 재발행하여 다시 시도한다. */
        return reRequestAtherTokenRefresh(err.response);
      })
  }

  return {
    'get': (url) => responseChecker(BaseApiRequester.get(url, makeDefaultConfig())),

    'post': (url, data) => responseChecker(BaseApiRequester.post(url, data, makeDefaultConfig())),

    'delete': (url) => responseChecker(BaseApiRequester.delete(url, makeDefaultConfig())),

    'patch': (url, data) => responseChecker(BaseApiRequester.patch(url, data, makeDefaultConfig())),
  }
})();

/**
 * jwt token handling utils
 */
const AuthUtil = {
  setAccessToken: (response) => {
    store.commit(STORE_COMMENDS.MUTATIONS.ACCESS_TOKEN, response.headers.authorization);
  },

  getAccessToken: () => {
    return store.state.accessToken;
  },

  hasAccessToken: () => {
    const token = AuthUtil.getAccessToken();
    return !(!token || /^\s*$/.test(token));
  },

  /** 
   * refresh access token 
   * if success, return true
   * else return false
   */
  refreshAccessToken: () => {
    const config = {withCredentials: true};

    return BaseApiRequester.get(Urls.MAIN_API.AUTH.REFRESH, AuthUtil.setAccessTokenToConfig(config))
      .then((response) => {
        if (response.data.code === STATUS_CODES.OK) {
          AuthUtil.setAccessToken(response);
          return true;
        }
        return false;
      }).catch(() => { 
        return false; 
      });
  },

  /**
   * set accessToken to headers of config and return
   */
  setAccessTokenToConfig: (config) => {
    if(AuthUtil.hasAccessToken()) {
      config.headers = {
        Authorization: `${CONFIG.MAIN_API_TOKEN_PREFIX} ${AuthUtil.getAccessToken()}` 
      };
    }
    return config;
  }
}

export { BaseApiRequester, ApiRequester, AuthUtil };
