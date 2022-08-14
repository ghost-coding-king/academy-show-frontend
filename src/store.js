import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      count: 0,
      accessToken: ''
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    accessToken (state, newAccessToken) {
      state.accessToken = newAccessToken;
    }
  },
  actions: {
    fetchToken (context) {
      fetch("https://tenders.guru/api/hu/tenders/36077")
        .then((response) => console.log("response:", response))
        .catch(() => context.commit('token', 'abcd2fghijk'))
      // context.commit('increment')
    }
  }
});

const STORE_COMMENDS = {
  MUTATIONS: {
    INCLEMENT: "increment",
    ACCESS_TOKEN: "accessToken"
  },
  ACTIONS: {

  },
}

export { STORE_COMMENDS };
