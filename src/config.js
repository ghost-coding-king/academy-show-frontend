/**
 * This file contains configurations
 */

 const CONFIG = {
  /**
   * API handling
   */
  API_TIMEOUT: 5000,
  MAIN_API_ROOT: process.env.VUE_APP_MAIN_API_ROOT,


  /**
   * Auth token prefix
   */
  MAIN_API_TOKEN_PREFIX: "Bearer"
}

export default CONFIG;
