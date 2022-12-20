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
       * 응답이 비정상인 경우 
       */
      .catch(err => {
        /** http 상태코드가 401이 아니면 에러를 다시 던진다. */
        if(err.response.status !== STATUS_CODES.NOT_AUTHENTICATED)
          throw CommonErrorHandler.process(err);

        /** token을 재발행하여 다시 시도한다. */
        return reRequestAtherTokenRefresh(err.response)
          .catch(err => { throw CommonErrorHandler.process(err); });
      });
  }

  return {
    'get': (url, config) => responseChecker(BaseApiRequester.get(url, AuthUtil.setAccessTokenToConfig(config))),

    'post': (url, data) => responseChecker(BaseApiRequester.post(url, data, makeDefaultConfig())),

    'delete': (url) => responseChecker(BaseApiRequester.delete(url, makeDefaultConfig())),

    'patch': (url, data) => responseChecker(BaseApiRequester.patch(url, data, makeDefaultConfig())),
  }
})();

/**
 * 공통 에러를 핸들링하는 유틸
 */
const CommonErrorHandler = (() => {
  /**
   * error 응답객체로부터 에러코드를 추출한다.
   */
  const extractErrorCode = (errorResponse) => { return errorResponse.status; };

  /**
   * 세션 만료시 다시 로그인을 시도한다.
   */
  const notAuthenticatedProcess = () => { 
    alert("로그인이 필요합니다!");
    document.location.href = "/?showLoginModal=true";
  };

  return {
    'process': (errorResponse) => {
      const errorCode = extractErrorCode(errorResponse);

      // 각 에러에 맞는 핸들러를 실행한다.
      if(errorCode === STATUS_CODES.NOT_AUTHENTICATED)
        notAuthenticatedProcess();

      // 공통에러를 처리한후 다시 error 응답을 다시 throw 하여 컴포넌트에서 나머지 에러를 처리한다.
      throw errorResponse;
    },
  }
})();

/**
 * jwt token handling utils
 */
const AuthUtil = {
  getRole: () => {
    return store.state.role 
  },
  getMyAcademyId: () => {
    return store.state.myAcademyId
  },
  getMyTutorId: () => {
    return store.state.myTutorId
  },
  isAuthenticated: () => {
    return store.state.accessToken != ''
  },

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
    if (!config) config = {}
    if(AuthUtil.hasAccessToken()) {
      config.headers = {
        Authorization: `${CONFIG.MAIN_API_TOKEN_PREFIX} ${AuthUtil.getAccessToken()}` 
      };
    }
    return config;
  }
}

export { BaseApiRequester, ApiRequester, CommonErrorHandler, AuthUtil };
