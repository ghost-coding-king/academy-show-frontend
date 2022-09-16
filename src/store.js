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
      myAcademyId: '',
      myTutorId: '',
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
    },
    myAcademyId (state, newmyAcademyId) {
      state.myAcademyId = newmyAcademyId
    },
    myTutorId (state, newMyTutorId) {
      state.myTutorId = newMyTutorId
    },
  },
  actions: {
  }
});

const STORE_COMMENDS = {
  MUTATIONS: {
    INCLEMENT: "increment",
    ACCESS_TOKEN: "accessToken",
    NAME: "name",
    ROLE: "role",
    PROFILE: "profile",
    MYACADEMYID: "myAcademyId",
    MY_TUTOR_ID: "myTutorId"
  },
  ACTIONS: {

  },
}

export { STORE_COMMENDS };
