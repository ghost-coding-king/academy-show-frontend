import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state () {
    return {
      count: 0,
      accessToken: '',
      name: '',
      role: '',
      profile: '',
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    accessToken (state, newAccessToken) {
      state.accessToken = newAccessToken;
    },
    name (state, newName) {
      state.name = newName;
    },
    role (state, newRole) {
      state.role = newRole;
    },
    profile (state, newProfile) {
      state.profile = newProfile;
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
    NAME: "name",
    ROLE: "role",
    PROFILE: "profile",
  },
  ACTIONS: {

  },
}

export { STORE_COMMENDS };
