import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    logged: false,
    user: {},
    toUserEmail: "",
  },
  mutations: {
    changeTheLogged(state, newLogged) {
      state.logged = newLogged;
    },
    updateUser(state, currentUser) {
      state.user = currentUser;
    },
    updateToUserEmail(state, newToUserEmail){
      state.toUserEmail = newToUserEmail;
    }
  },
  actions: {
    changeLogged({ commit }, newLogged) {
      commit("changeTheLogged", newLogged);
    },
  },
});
