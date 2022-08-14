/**
 * This file contains utilities functions
 */

import axios from "axios";
import store, {STORE_COMMENDS} from "@/store"

import CONFIG from "./config";

/**
 * External API Requesters
 */
const MainApiRequester = (() => {
  const AxiosInstance = axios.create({
    timeout: 5000,
  });

  const makeHeader = () => {
    return { 
      headers: { 
        Authorization: `${CONFIG.MAIN_API_TOKEN_PREFIX} ${store.state.accessToken}` } };
  }

  return {
    'get': (url) => AxiosInstance.get(url, makeHeader()),
    'post': (url, data) => AxiosInstance.post(url, data, makeHeader()),
    'delete': (url) => AxiosInstance.delete(url, makeHeader())
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

export { MainApiRequester, AuthUtil };
