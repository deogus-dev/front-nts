import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
});
