import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state () {
    return {
      count: 0,
      accessToken: '',
      username: '',
      role: '',
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    accessToken (state, newAccessToken) {
      state.accessToken = newAccessToken;
    },
    username (state, newUsername) {
      state.username = newUsername;
    },
    role (state, newRole) {
      state.role = newRole;
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
    ACCESS_TOKEN: "accessToken",
    USERNAME: "username",
    ROLE: "role",
  },
  ACTIONS: {

  },
}

export { STORE_COMMENDS };
