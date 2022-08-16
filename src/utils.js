/**
 * This file contains utilities functions
 */

import axios from "axios";
import store, {STORE_COMMENDS} from "@/store"

import CONFIG from "./config";

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
    'delete': (url, config) => AxiosInstance.delete(url, config)
  }
})();
 
const ApiRequester = (() => {
  const makeConfig = () => {
    const config = {};

    if(AuthUtil.hasAccessToken()) {
      config.headers = {
        Authorization: `${CONFIG.MAIN_API_TOKEN_PREFIX} ${store.state.accessToken}` 
      };
    }

    return config;
  }

  return {
    'get': (url) => BaseApiRequester.get(url, makeConfig()),
    'post': (url, data) => BaseApiRequester.post(url, data, makeConfig()),
    'delete': (url) => BaseApiRequester.delete(url, makeConfig())
  }
})();

/**
 * Extract access token from login response
 */
const AuthUtil = {
  setAccessToken: (response) => {
    store.commit(STORE_COMMENDS.MUTATIONS.ACCESS_TOKEN, response.headers.authorization);
  }
}

export { BaseApiRequester, ApiRequester, AuthUtil };
